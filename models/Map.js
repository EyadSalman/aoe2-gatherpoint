// models/Map.js
import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Map name is required'],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Open', 'Closed', 'Water', 'Hybrid', 'Nomad'],
    required: [true, 'Map type is required']
  },
  image: {
    type: String,
    required: [true, 'Map image is required']
  },
  description: {
    type: String,
    required: [true, 'Map description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  bestCivilizations: [{
    name: String,
    reasoning: String
  }],
  strategies: [String],
  tournaments: [String],
  features: [String],
  statistics: {
    timesPlayed: {
      type: Number,
      default: 0
    },
    winRates: [{
      civilization: String,
      rate: Number
    }]
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
mapSchema.index({ type: 1 });
mapSchema.index({ name: 'text', description: 'text' });

// ✅ Prevent crash when mongoose.models is undefined
const Map = mongoose.models?.Map || mongoose.model("Map", mapSchema);
export default Map;