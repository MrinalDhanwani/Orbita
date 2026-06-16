require('dotenv').config();
const mongoose = require('mongoose');

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
    res.json({ success: true, projectDNA });

  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Orbita backend running on port ${PORT} 🪐`);
});