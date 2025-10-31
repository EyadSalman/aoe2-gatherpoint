// models/Tournament.js
import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tournament name is required'],
    trim: true,
    maxlength: [100, 'Tournament name cannot exceed 100 characters']
  },
  organizer: {
    type: String,
    required: [true, 'Organizer is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Tournament date is required']
  },
  prizePool: {
    amount: {
      type: Number,
      required: [true, 'Prize pool amount is required'],
      min: [0, 'Prize pool cannot be negative'],
      default: 0
    },
  },
  participants: {
    max: {
      type: Number,
      required: [true, 'Maximum participants required'],
      min: [2, 'Minimum 2 participants required'],
      default: 16
    },
    registered: {
      type: Number,
      default: 0,
      min: [0, 'Registered participants cannot be negative']
    },
    players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }]
  },
  status: {
    type: String,
    enum: ['announced', 'registration', 'ongoing', 'completed', 'cancelled'],
    default: 'announced'
  },
  type: {
    type: String,
    enum: ['Professional', 'Community'],
    required: [true, 'Tournament type is required']
  },
  format: {
    type: String,
    enum: ['Single Elimination', 'Double Elimination', 'Round Robin', 'Swiss'],
    default: 'Single Elimination'
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  results: [{
    round: String,
    matches: [{
      player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
      },
      player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
      },
      winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
      },
      score: String,
      map: String,
      replay: String
    }]
  }],
  registrationDeadline: {
    type: Date
  },
  registrationLink: {
    type: String
  },
  streamLink: {
    type: String
  },
  discordServer: {
    type: String
  },
  rules: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
tournamentSchema.index({ date: -1 });
tournamentSchema.index({ status: 1 });
tournamentSchema.index({ type: 1 });
tournamentSchema.index({ featured: -1 });
tournamentSchema.index({ isActive: 1 });

// Virtual for formatted prize pool
tournamentSchema.virtual('formattedPrizePool').get(function() {
  return `$${this.prizePool.amount.toLocaleString()}`;
});

// Virtual for days until tournament
tournamentSchema.virtual('daysUntil').get(function() {
  const now = new Date();
  const diffTime = this.date - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

export default mongoose.models.Tournament ||
  mongoose.model("Tournament", tournamentSchema);
