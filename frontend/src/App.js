import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StartBuilding from './pages/StartBuilding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartBuilding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;