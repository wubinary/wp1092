import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed == number) {
      res.status(200).send({msg: 'Equal'});
    } else if (guessed > number) {
      res.status(200).send({msg: 'Smaller'});
    } else if (guessed < number) {
      res.status(200).send({msg: 'Bigger'});
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (req, res) => {
    const number = getNumber(true);
    res.status(200).send({msg: 'ok~ please restart'});

})

export default router
