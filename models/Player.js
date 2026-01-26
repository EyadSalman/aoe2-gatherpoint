// models/Player.js
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Player name cannot exceed 50 characters']
  },

  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },

  // ⭐ CURRENT RATING (Live Rating)
  currentRating: {
    type: Number,
    default: 1000,
    min: [0, 'Current rating cannot be negative'],
    max: [5000, 'Current rating cannot exceed 5000']
  },

  // ⭐ PEAK RATING (All-time high)
  peakRating: {
    type: Number,
    default: 1000,
    min: [0, 'Peak rating cannot be negative'],
    max: [5000, 'Peak rating cannot exceed 5000']
  },

  // (Optional) Keep original rating field if used in UI
  rating: {
    type: Number,
    default: 1000,
    min: [0, 'Rating cannot be negative'],
    max: [5000, 'Rating cannot exceed 5000']
  },

  rank: {
    type: Number,
    min: [1, 'Rank must be at least 1']
  },

  avatar: {
    type: String,
    default: ''
  },

  statistics: {
    tournaments: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    totalEarnings: {
      type: Number,
      default: 0,
      min: [0, 'Earnings cannot be negative']
    }
  },

  winRate: {
  type: String,
  default: "0%"
},

  recentForm: [{
    type: Number,
    enum: [0, 1] // 0 = loss, 1 = win
  }],

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
    trim: true,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: "Invalid profile URL format",
    },
  },
  recentTournamentsPlayed: {
  type: [String],
  default: []
},

  isActive: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ⭐ Indexes
playerSchema.index({ currentRating: -1 });
playerSchema.index({ peakRating: -1 });
playerSchema.index({ rating: -1 });
playerSchema.index({ rank: 1 });
playerSchema.index({ country: 1 });
playerSchema.index({ name: 'text' });

// ⭐ Virtual earnings formatter
playerSchema.virtual('formattedEarnings').get(function () {
  return `$${this.statistics.totalEarnings.toLocaleString()}`;
});

// ⭐ Auto-calc win rate
playerSchema.pre('save', function (next) {
  const totalGames = this.statistics.wins + this.statistics.losses;
  if (totalGames > 0) {
    this.statistics.winRate = Math.round((this.statistics.wins / totalGames) * 100);
  }
  next();
});

// ⭐ Safe model export
const Player = mongoose.models?.Player || mongoose.model("Player", playerSchema);
export default Player;
