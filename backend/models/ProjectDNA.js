const mongoose = require('mongoose');

const projectDNASchema = new mongoose.Schema({
  originalIdea: {
    type: String,
    required: true
  },
  projectName: String,
  projectType: String,
  summary: String,
  skillsNeeded: [String],
  idealCollaborator: String,
  vibeScore: String,
  timeline: String,
  excitement: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProjectDNA = mongoose.model('ProjectDNA', projectDNASchema);

module.exports = ProjectDNA;