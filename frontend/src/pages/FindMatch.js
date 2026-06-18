import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FindMatch() {
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('orbitaUser'));

    if (!user) {
      navigate('/signup');
      return;
    }

    fetch(`http://localhost:5000/api/find-match/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.match) {
            setMatch(data.match);
          } else {
            setMessage(data.message);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleStartSprint = async () => {
    setCreating(true);
    const user = JSON.parse(localStorage.getItem('orbitaUser'));
    const latestDNA = JSON.parse(localStorage.getItem('latestProjectDNA') || '{}');

    try {
      const response = await fetch('http://localhost:5000/api/create-sprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          matchEmail: match.email,
          projectName: latestDNA.projectName || 'Untitled Project',
          projectSummary: latestDNA.summary || ''
        })
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/sprint/${data.sprint._id}`);
      }
    } catch (err) {
      console.error(err);
    }

    setCreating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">🪐 Finding your perfect collaborator...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

        {match ? (
          <>
            <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              {match.compatibilityScore}% Compatible
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {match.name}
            </h1>
            <p className="text-gray-400 mb-6">
              {match.email}
            </p>
            <div className="bg-purple-50 rounded-xl p-5 text-left mb-6">
              <div className="text-sm font-semibold text-purple-600 mb-2">
                Their working style
              </div>
              <p className="text-gray-700 text-sm">
                {match.vibeCheck?.pace} • {match.vibeCheck?.communication} • {match.vibeCheck?.experience}
              </p>
            </div>
            <button
              onClick={handleStartSprint}
              disabled={creating}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 transition text-white py-3 rounded-full font-semibold"
            >
              {creating ? 'Creating sprint room...' : 'Start 30-Day Sprint →'}
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">🪐</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No matches yet
            </h1>
            <p className="text-gray-400">
              {message}
            </p>
          </>
        )}

      </div>

    </div>
  );
}

export default FindMatch;