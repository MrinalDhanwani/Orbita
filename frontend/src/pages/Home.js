import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyOrbita from '../components/WhyOrbita';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar onStartClick={() => navigate('/start')} />
      <Hero onStartClick={() => navigate('/start')} />
      <HowItWorks />
      <WhyOrbita />
      <Footer />
    </div>
  );
}

export default Home;