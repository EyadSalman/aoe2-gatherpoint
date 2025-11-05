// models/Leaderboard.js
import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  division: String,
  player: String,
  rating: Number,
});

const runnerupSchema = new mongoose.Schema({
  division: String,
  player: String,
  rating: Number,
});

const leaderboardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    organizer: { type: String, required: true },
    date: { type: String, required: true },
    winners: [winnerSchema],
    runnerUps: [runnerupSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Leaderboard ||
  mongoose.model("Leaderboard", leaderboardSchema);
