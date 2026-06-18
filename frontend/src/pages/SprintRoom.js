import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SprintRoom() {
  const { sprintId } = useParams();
  const [sprint, setSprint] = useState(null);
  const [checkInText, setCheckInText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/sprint/${sprintId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSprint(data.sprint);
        }
        setLoading(false);
      });
  }, [sprintId]);

  const handleCheckIn = async () => {
    if (!checkInText.trim()) return;

    setSubmitting(true);
    const user = JSON.parse(localStorage.getItem('orbitaUser'));

    try {
      const response = await fetch(`http://localhost:5000/api/sprint/${sprintId}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, update: checkInText })
      });

      const data = await response.json();

      if (data.success) {
        setSprint(data.sprint);
        setCheckInText('');
      }
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading sprint room...</div>;
  }

  if (!sprint) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Sprint not found</div>;
  }

  const daysLeft = Math.max(0, Math.ceil((new Date(sprint.endDate) - new Date()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-16">

      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            🚀 Sprint Room
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {sprint.projectName}
          </h1>
          <p className="text-gray-400">
            {sprint.projectSummary}
          </p>
          <div className="text-purple-600 font-semibold mt-3">
            {daysLeft} days left
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Today's check-in
          </label>
          <textarea
            value={checkInText}
            onChange={(e) => setCheckInText(e.target.value)}
            placeholder="What did you work on today?"
            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-purple-400 resize-none"
            rows="3"
          />
          <button
            onClick={handleCheckIn}
            disabled={submitting}
            className="w-full mt-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 transition text-white py-3 rounded-full font-semibold"
          >
            {submitting ? 'Saving...' : 'Check In →'}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm font-semibold text-gray-500 mb-4">
            Sprint activity ({sprint.checkIns.length} check-ins)
          </div>
          <div className="space-y-3">
            {sprint.checkIns.slice().reverse().map((checkIn, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 text-sm">{checkIn.update}</p>
                <p className="text-gray-300 text-xs mt-1">
                  {new Date(checkIn.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default SprintRoom;