import { useState } from 'react';

function ProjectDNA() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (idea.trim().length < 20) {
      setError('Please describe your idea in a bit more detail!');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/project-dna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectIdea: idea })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.projectDNA);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-16">

      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            🧠 Step 1 — Brain Scan
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Tell us about your idea
          </h1>
          <p className="text-gray-400 text-lg">
            Describe your project in plain language. Our AI will analyze it and generate your complete Project DNA.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            What are you trying to build?
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-purple-400 resize-none text-base leading-relaxed"
            rows="6"
            placeholder="Example: I want to build an app that helps college students find affordable food near campus..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-300 text-sm">
              {idea.length} characters
            </span>
            <span className="text-gray-300 text-sm">
              The more detail the better
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 px-6 py-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 transition text-white py-4 rounded-full text-lg font-semibold mb-12"
        >
          {loading ? '🧠 Analyzing your idea...' : 'Generate Project DNA →'}
        </button>

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">
                ✅ Project DNA Generated
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {result.projectName}
              </h2>
              <div className="text-purple-500 font-medium mt-1">
                {result.projectType}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 mb-6">
              <div className="text-sm font-semibold text-purple-600 mb-2">
                Summary
              </div>
              <p className="text-gray-700 leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-500 mb-3">
                Skills needed
              </div>
              <div className="flex flex-wrap gap-2">
                {result.skillsNeeded.map((skill) => (
                  <span key={skill} className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-400 mb-1">
                  Vibe Score
                </div>
                <div className="text-3xl font-extrabold text-purple-600">
                  {result.vibeScore}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-400 mb-1">
                  Timeline
                </div>
                <div className="text-xl font-bold text-gray-700">
                  {result.timeline}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 mb-6">
              <div className="text-sm font-semibold text-amber-600 mb-2">
                Ideal collaborator
              </div>
              <p className="text-gray-700 leading-relaxed">
                {result.idealCollaborator}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <div className="text-sm font-semibold text-green-600 mb-2">
                Why this is exciting
              </div>
              <p className="text-gray-700 leading-relaxed">
                {result.excitement}
              </p>
            </div>

            <button className="w-full mt-8 bg-purple-600 hover:bg-purple-700 transition text-white py-4 rounded-full text-lg font-semibold">
              Find My Collaborator →
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default ProjectDNA;