import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import StartBuilding from './pages/StartBuilding';
import Login from './pages/Login';
import VibeCheck from './pages/VibeCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartBuilding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vibe-check" element={<VibeCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;