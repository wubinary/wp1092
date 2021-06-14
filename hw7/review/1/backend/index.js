const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

const mongo = require('./mongo');

const app = express();

/* -------------------------------------------------------------------------- */
/*                               MONGOOSE MODELS                              */
/* -------------------------------------------------------------------------- */
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
  chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */
const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

/* -------------------------------------------------------------------------- */
/*                            SERVER INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
});

app.use(express.static(path.join(__dirname, 'public')));

const validateUser = async (name) => {
  const existing = await UserModel.findOne({ name });
  if (existing) return existing;
  return new UserModel({ name }).save();
};

const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
  return box
    .populate('users')
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};

// (async () => {
//   const a = await validateUser('a');
//   const b = await validateUser('b');

//   console.log(a);

//   const cbName = makeName('a', 'b');

//   const chatBox = await validateChatBox(cbName, [a, b]);

//   console.log(chatBox);
// })();

const chatBoxes = {}; // keep track of all open AND active chat boxes

wss.on('connection', function connection(client) {
  client.id = uuid.v4();
  client.box = ''; // keep track of client's CURRENT chat box

  client.sendEvent = (e) => client.send(JSON.stringify(e));

  client.on('message', async function incoming(message) {
    message = JSON.parse(message);
    
    const { type } = message;
    
    switch (type) {
      // on open chat box
      case 'CHAT': {
        const {
          data: { name, to },
        } = message;

        const chatBoxName = makeName(name, to);

        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

        // if client was in a chat box, remove that.
        if (chatBoxes[client.box])
          // user was in another chat box
          chatBoxes[client.box].delete(client);

        // use set to avoid duplicates
        client.box = chatBoxName;
        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
        chatBoxes[chatBoxName].add(client); // add this open connection into chat box

        client.sendEvent({
          type: 'CHAT',
          data: {
            messages: chatBox.messages.map(({ sender: { name }, body }) => ({
              name,
              body,
            })),
          },
        });

        break;
      }

      case 'MESSAGE': {
        const {
          data: { name, to, body },
        } = message;

        const chatBoxName = makeName(name, to);

        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
        
        const newMessage = new MessageModel({ sender, body });
        await newMessage.save();

        chatBox.messages.push(newMessage);
        await chatBox.save();

        chatBoxes[chatBoxName].forEach((client) => {
          client.sendEvent({
            type: 'MESSAGE',
            data: {
              message: {
                name,
                body,
              },
            },
          });
        });
      }
    }

    // disconnected
    client.once('close', () => {
      chatBoxes[client.box].delete(client);
    });
  });
});

mongo.connect();

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
