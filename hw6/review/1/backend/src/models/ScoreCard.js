import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scoreCardSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject field is required."],
  },
  score: {
    type: Number,
    required: [true, "Score field is required."],
  },
});
export default mongoose.model("ScoreCard", scoreCardSchema);
