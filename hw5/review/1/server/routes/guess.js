import express from 'express'
import { guess } from '../../src/axios'
import getNumber from '../core/getNumber'
import * as fs from 'fs';

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

function getTimeString(date) {
    return `${date.getFullYear()}-${('0' + String(date.getMonth() + 1)).slice(-2)}-${('0' + String(date.getDate())).slice(-2)}-${('0' + String(date.getHours())).slice(-2)}-${('0' + String(date.getMinutes())).slice(-2)}-${('0' + String(date.getSeconds())).slice(-2)}`;
}
var date = new Date();
var stream;

var log_path = './server/log/';
if(!fs.existsSync(log_path)) {
    fs.mkdir(log_path, () => {
        var path = `./server/log/${date.getFullYear()}-${('0' + String(date.getMonth() + 1)).slice(-2)}-${('0' + String(date.getDate())).slice(-2)}-${('0' + String(date.getHours())).slice(-2)}-${('0' + String(date.getMinutes())).slice(-2)}.log`;
        fs.openSync(path, 'w');
        stream = fs.createWriteStream(path, {flags: 'a'});
    });
}
else {
    var path = `./server/log/${date.getFullYear()}-${('0' + String(date.getMonth() + 1)).slice(-2)}-${('0' + String(date.getDate())).slice(-2)}-${('0' + String(date.getHours())).slice(-2)}-${('0' + String(date.getMinutes())).slice(-2)}.log`;
    fs.openSync(path, 'w');
    stream = fs.createWriteStream(path, {flags: 'a'});
}



// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
    var num = getNumber(true);
    var date = new Date();
    stream.write(`start number=${num} ${getTimeString(date)}\r\n`);
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    const number = getNumber()
    const guessed = roughScale(req.query.number, 10)
    var date = new Date();

    // check if NOT a num or not in range [1,100]
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(400).send({ msg: 'Not a legal number.' })
    }
    else {
        // TODO: check if number and guessed are the same,
        // and response with some hint "Equal", "Bigger", "Smaller"
        stream.write(`guess ${guessed} ${getTimeString(date)}\r\n`);
        let message = guessed === number ? 'Equal' : guessed < number ? 'Bigger' : 'Smaller';
        if(message === 'Equal') {
            stream.write(`end-game\r\n`);
        }
        res.status(200).send({msg: message});
    }
})

// TODO: add router.post('/restart',...)

router.post('/restart', (req, res) => {
    var num = getNumber(true);
    var date = new Date();
    stream.write(`restart number=${num} ${getTimeString(date)}\r\n`);
    res.json({msg: 'The game has restarted.'});
})

export default router
