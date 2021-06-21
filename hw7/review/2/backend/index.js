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

const messageSchema = new Schema({
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String },
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

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

// 找chatbox
const validateChatBox = async (name) => {
  let box = await ChatBoxModel.findOne({ name })
    .populate('messages')
  if (!box) {
    console.log(name+"not found!!")
    box = await new ChatBoxModel({ name }).save();
  }
  return box
};

const chatBoxes = {}; // keep track of all open AND active chat boxes

wss.on('connection', function connection(client) {
  console.log("wss connected")
  client.box = ''; // keep track of client's CURRENT chat box

  client.sendEvent = (e) => client.send(JSON.stringify(e));

  client.on('message', async function incoming(message) {
    message = JSON.parse(message);
    console.log(message)
    const [type, data] = message;
    console.log("type", type)
    console.log(data)
    switch (type) {
      // on open chat box
      case 'CHAT': {
        const { name, to } = data;
        const chatBoxName = makeName(name, to);
        const sender = await name;
        const receiver = await to;

        const chatBox = await validateChatBox(chatBoxName);

        // if client was in a chat box, remove that.
        if (chatBoxes[client.box])
          // user was in another chat box
          chatBoxes[client.box].delete(client);

        // use set to avoid duplicates
        client.box = chatBoxName;
        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
        chatBoxes[chatBoxName].add(client); // add this open connection into chat box

        let foundMessages=[]
        chatBox.messages.map((mes)=>{
          foundMessages.push(mes)
        })
        // console.log(foundMessages)
        client.sendEvent([
          'CHAT',
          {
            name: chatBoxName,
            messages: foundMessages
          },
        ]);

        break;
      }

      case 'MESSAGE': {
        const { key, sender, body } = data;
        
        const names = key.split("_")
        const reciever = (sender===names[0])? names[1]:names[0]
        const chatBoxName = key
        const chatBox = await validateChatBox(chatBoxName);

        const newMessage = new MessageModel({ sender, reciever, body });
        await newMessage.save();

        chatBox.messages.push(newMessage);
        await chatBox.save();
        
        chatBoxes[chatBoxName].forEach((client) => {
          client.sendEvent([
            'MESSAGE',
            {
                sender,
                reciever,
                body,
            },
          ]);
        });
      }
    }

    // // disconnected
    // client.once('close', () => {
    //   chatBoxes[client.box].delete(client);
    // });
  });
});

mongo.connect();

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
