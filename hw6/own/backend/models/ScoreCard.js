import mongoose from 'mongoose';

const ScoreCardSchema = new mongoose.Schema({
    name: String,
    subject: String,
    score: Number
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);

export default ScoreCard;
