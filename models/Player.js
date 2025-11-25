import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    // Unique identifier from AoE2Insights URL (/user/12345)
    aoe2InsightsId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    country: {
      type: String,
      required: true,
      trim: true
    },

    // ⭐ Live rating
    currentRating: {
      type: Number,
      default: null,
      min: 0,
      max: 5000
    },

    // ⭐ All-time high rating
    peakRating: {
      type: Number,
      default: null,
      min: 0,
      max: 5000
    },

    // Legacy compatibility (your UI uses this)
    rating: {
      type: Number,
      default: null,
      min: 0,
      max: 5000
    },

    // ⭐ % win rate (0–100)
    winRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    rank: {
      type: Number,
      min: 1
    },

    avatar: {
      type: String,
      default: ""
    },

    statistics: {
      tournaments: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0, min: 0 }
    },

    recentForm: [
      {
        type: Number,
        enum: [0, 1] // loss = 0, win = 1
      }
    ],

    achievements: [String],
    favoriteMap: String,
    mainCivilizations: [String],

    socialLinks: {
      twitch: String,
      youtube: String,
      twitter: String,
      steam: String
    },

    profileUrl: {
      type: String,
      required: true,
      trim: true
    },

    // ⭐ Required for your API .find({ isActive: true })
    isActive: {
      type: Boolean,
      default: true
    },

    // ⭐ Auto-tracking of when scraper updated this record
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// -----------------------------------------------------
// ⭐ Indexes for fast leaderboard sorting/filtering
// -----------------------------------------------------
playerSchema.index({ currentRating: -1 });
playerSchema.index({ peakRating: -1 });
playerSchema.index({ rating: -1 });
playerSchema.index({ rank: 1 });
playerSchema.index({ country: 1 });
playerSchema.index({ name: "text" });
playerSchema.index({ aoe2InsightsId: 1 });

// -----------------------------------------------------
// ⭐ Virtual: formatted earnings
// -----------------------------------------------------
playerSchema.virtual("formattedEarnings").get(function () {
  return `$${this.statistics.totalEarnings.toLocaleString()}`;
});

// -----------------------------------------------------
// ⭐ Auto-calc win rate (if wins/losses exist)
// -----------------------------------------------------
playerSchema.pre("save", function (next) {
  const totalGames = this.statistics.wins + this.statistics.losses;
  if (totalGames > 0) {
    this.winRate = Math.round((this.statistics.wins / totalGames) * 100);
  }
  next();
});

// For Next.js hot reload issue
const Player =
  mongoose.models?.Player || mongoose.model("Player", playerSchema);

export default Player;
