import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectDNA from '../ProjectDNA';

function StartBuilding() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('orbitaUser');
    if (!user) {
      navigate('/signup');
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <ProjectDNA />
    </div>
  );
}

export default StartBuilding;