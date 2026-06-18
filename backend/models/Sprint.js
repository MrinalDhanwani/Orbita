const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  initiator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projectName: String,
  projectSummary: String,
  status: { type: String, default: 'pending' },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  checkIns: [{
    userId: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    update: String
  }]
});

module.exports = mongoose.model('Sprint', sprintSchema);