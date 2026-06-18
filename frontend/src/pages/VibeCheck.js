import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    key: 'pace',
    question: 'How do you like to work?',
    options: ['Fast and scrappy', 'Slow and careful']
  },
  {
    key: 'schedule',
    question: 'When are you most productive?',
    options: ['Morning person', 'Night owl']
  },
  {
    key: 'experience',
    question: 'How would you describe your experience?',
    options: ['Beginner, learning as I go', 'Experienced, comfortable leading']
  },
  {
    key: 'communication',
    question: 'How do you prefer to communicate?',
    options: ['Async messages, my own time', 'Live calls, real time sync']
  },
  {
    key: 'priority',
    question: 'What matters most to you?',
    options: ['Shipping fast, even if messy', 'Clean code, even if slower']
  }
];

function VibeCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (value) => {
    const updatedAnswers = { ...answers, [questions[step].key]: value };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      submitVibeCheck(updatedAnswers);
    }
  };

  const submitVibeCheck = async (finalAnswers) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('orbitaUser'));

    try {
      await fetch('http://localhost:5000/api/vibe-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, ...finalAnswers })
      });

      navigate('/start');
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const current = questions[step];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-lg w-full">

        <div className="text-center mb-8">
          <div className="text-sm font-semibold text-purple-600 mb-2">
            Question {step + 1} of {questions.length}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {current.question}
          </h1>
        </div>

        <div className="space-y-3">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={loading}
              className="w-full text-left border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition rounded-xl p-4 font-medium text-gray-700"
            >
              {option}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}

export default VibeCheck;