import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('orbitaUser', JSON.stringify(data.user));
        navigate('/start');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full">

        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            🪐 Orbita
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back
          </h1>
          <p className="text-gray-400 mt-2">
            Log in to continue building
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-purple-400"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mt-4 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 transition text-white py-3 rounded-full font-semibold mt-6"
        >
          {loading ? 'Logging in...' : 'Log In →'}
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="text-purple-600 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;