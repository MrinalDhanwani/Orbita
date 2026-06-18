const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  projectName: String,
  projectSummary: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  checkIns: [{
    userId: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    update: String
  }],
  status: {
    type: String,
    default: 'active'
  }
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;