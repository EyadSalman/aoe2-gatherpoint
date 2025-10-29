// models/DiscordServer.
import mongoose from "mongoose";

const discordServerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Server name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Server description is required'],
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  inviteUrl: {
    type: String,
    required: [true, 'Invite URL is required'],
    validate: {
      validator: function(v) {
        return /^https:\/\/discord\.gg\//.test(v);
      },
      message: 'Invalid Discord invite URL'
    }
  },
  memberCount: {
    type: Number,
    min: [0, 'Member count cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['Tournament', 'Community', 'Practice', 'Streaming'],
    default: 'Community'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
discordServerSchema.index({ featured: -1 });
discordServerSchema.index({ category: 1 });

export default mongoose.models.DiscordServer ||
mongoose.model("DiscordServer", discordServerSchema);
