import { Router } from "express";
import ScoreCard from "../../models/ScoreCard";

const router = Router();

router.post("/create-card", async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    console.log("req.body", req.body);
    const { name, subject, score } = req.body;
    const exist = await ScoreCard.findOne({ name, subject });
    if (exist) {
      await ScoreCard.updateMany({ name, subject }, { score });
      res.json({
        message: `Updating (${name}, ${subject}, ${score})`,
        card: { name, subject, score },
      });
    } else {
      const newScoreCard = new ScoreCard({ name, subject, score });
      console.log(`"newScoreCard: ${newScoreCard}`);
      newScoreCard.save();
      res.json({
        message: `Adding (${name}, ${subject}, ${score})`,
        card: { name, subject, score },
      });
    }
  } catch (e) {
    res.json({ message: "Something went wrong..." });
  }
});

// TODO: delete the collection of the DB
router.delete("/delete-card", async function (_, res) {
  try {
    await ScoreCard.deleteMany({});
    res.json({
      message: "Database cleared",
    });
  } catch (e) {
    throw new Error("Database clear failed");
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get("/query-card", async function (req, res) {
  console.log(req.query);
  const { queryType, queryString } = req.query;

  const query = {};
  query[queryType] = queryString;
  console.log("query: ", query);

  const queryCard = await ScoreCard.find(query);
  console.log("queryCard: ", queryCard.length);

  if (queryCard.length === 0) {
    console.log(
      `Did not find any ${queryType.charAt(0).toUpperCase() + queryType.slice(1)} correspond to ${queryString}`
    );

    res.json({
      message: `${queryType} (${queryString}) not found!`,
    });
  } else {
    res.json({
      messages: queryCard.map(
        (card) =>
          `Search ${queryType.charAt(0).toUpperCase() + queryType.slice(1)}: [${card.name}, ${card.subject}, ${
            card.score
          }]`
      ),
    });
  }
});

export default router;
