import { Router } from "express";
import ScoreCard from "../../models/ScoreCard";

const router = Router();

router.post("/create-card", async function (req, res) {
  try {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    await ScoreCard.findOne({ name, subject }).exec(async (err, card) => {
      if (err) throw err;
      else if (card) {
        await ScoreCard.updateOne({ name, subject }, { score }, (err, card) => {
          if (err) throw err;
          else {
            const message = `Updating (${name}, ${subject}, ${score})`;
            res.json({ card, message });
          }
        });
      } else {
        await ScoreCard.create({ name, subject, score }, (err, card) => {
          if (err) throw err;
          else {
            const message = `Adding (${name}, ${subject}, ${score})`;
            res.json({ card, message });
          }
        });
      }
    });
  } catch (e) {
    res.json({ message: "Something went wrong..." });
  }
});

router.delete("/delete-cards", async (req, res) => {
  try {
    await ScoreCard.deleteMany({}, () => {
      res.json({ message: "Database cleared" });
    });
  } catch (e) {
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/get-cards", async (req, res) => {
  try {
    const type = req.body.queryType;
    const value = req.body.queryString;
    const query = {};
    query[type] = value;
    await ScoreCard.find(query).exec((err, cards) => {
      if (err) throw err;
      else {
        if (cards.length > 0) {
          const messages = cards.map((card) =>
            JSON.stringify({
              name: card.name,
              subject: card.subject,
              score: card.score,
            })
          );
          res.json({ messages });
        } else {
          const message = `${type} (${value}) not found!`;
          res.json({ message });
        }
      }
    });
  } catch (e) {
    res.json({ message: "Something went wrong..." });
  }
});

export default router;
