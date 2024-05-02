import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = () => {

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <header>
      <h1 onClick={handleNavigateHome}>EntrevistaLab</h1>
    </header>
  );
};

export default Header;