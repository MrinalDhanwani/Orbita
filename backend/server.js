require('dotenv').config();

const ProjectDNA = require('./models/ProjectDNA');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const Sprint = require('./models/Sprint');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully 🪐'))
  .catch((err) => console.log('MongoDB connection error:', err));

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Orbita backend is alive 🪐' });
});

app.post('/api/project-dna', async (req, res) => {
  const { projectIdea } = req.body;

  if (!projectIdea) {
    return res.status(400).json({ error: 'Project idea is required' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are Orbita's AI engine. When a user describes their project idea, you analyze it and return a Project DNA in this exact JSON format:
          {
            "projectName": "a cool short name for the project",
            "projectType": "what kind of project this is in 4 words max",
            "summary": "one sentence explaining the project simply",
            "skillsNeeded": ["skill1", "skill2", "skill3", "skill4"],
            "idealCollaborator": "describe the perfect collaborator for this project in one sentence",
            "vibeScore": "a percentage from 60 to 99 showing how buildable this idea is",
            "timeline": "realistic timeline to build an MVP",
            "excitement": "one punchy sentence about why this idea is exciting"
          }
          Return ONLY the JSON. No extra text. No markdown. Just pure JSON.`
        },
        {
          role: 'user',
          content: projectIdea
        }
      ]
    });

    const rawResponse = completion.choices[0].message.content;
    const projectDNA = JSON.parse(rawResponse);

    const savedProjectDNA = await ProjectDNA.create({
      originalIdea: projectIdea,
      ...projectDNA
    });

    res.json({ success: true, projectDNA: savedProjectDNA });

  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/vibe-check', async (req, res) => {
  const { userId, pace, schedule, experience, communication, priority } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { vibeCheck: { pace, schedule, experience, communication, priority } },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });

  } catch (error) {
    console.error('Vibe check error:', error);
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/find-match/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentUserDNA = await ProjectDNA.findOne({ originalIdea: { $exists: true } }).sort({ createdAt: -1 });

    const otherUsers = await User.find({ _id: { $ne: userId } });

    if (otherUsers.length === 0) {
      return res.json({ success: true, match: null, message: 'No other builders yet. Be the first to invite a friend!' });
    }

    const potentialMatches = otherUsers.map((user) => {
      let compatibilityScore = 50;

      if (currentUser.vibeCheck && user.vibeCheck) {
        if (currentUser.vibeCheck.pace === user.vibeCheck.pace) compatibilityScore += 10;
        if (currentUser.vibeCheck.communication === user.vibeCheck.communication) compatibilityScore += 10;
        if (currentUser.vibeCheck.priority === user.vibeCheck.priority) compatibilityScore += 10;
        if (currentUser.vibeCheck.experience !== user.vibeCheck.experience) compatibilityScore += 20;
      }

      return { user, compatibilityScore };
    });

    potentialMatches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    const bestMatch = potentialMatches[0];

    res.json({
      success: true,
      match: {
        name: bestMatch.user.name,
        email: bestMatch.user.email,
        vibeCheck: bestMatch.user.vibeCheck,
        compatibilityScore: bestMatch.compatibilityScore
      }
    });

  } catch (error) {
    console.error('Match error:', error);
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/create-sprint', async (req, res) => {
  const { userId, matchEmail, projectName, projectSummary } = req.body;

  try {
    const matchUser = await User.findOne({ email: matchEmail });

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const newSprint = await Sprint.create({
      participants: [userId, matchUser._id],
      projectName,
      projectSummary,
      endDate
    });

    res.json({ success: true, sprint: newSprint });

  } catch (error) {
    console.error('Sprint creation error:', error);
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/sprint/:sprintId', async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.sprintId);
    res.json({ success: true, sprint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sprint/:sprintId/checkin', async (req, res) => {
  const { userId, update } = req.body;

  try {
    const sprint = await Sprint.findByIdAndUpdate(
      req.params.sprintId,
      { $push: { checkIns: { userId, update } } },
      { new: true }
    );

    res.json({ success: true, sprint });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Orbita backend running on port ${PORT} 🪐`);
});