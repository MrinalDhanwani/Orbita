import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FindMatch() {
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

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
            <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-full font-semibold">
              Start 30-Day Sprint →
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