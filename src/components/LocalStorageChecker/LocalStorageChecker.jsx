import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LocalStorageChecker = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLocalStorageAndRedirect = () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          return true;
        } else {
          return false; 
        }
      } catch (e) {
        return false;
      }
    };

    const redirectToLogin = () => {
      navigate('/login');
    };

    if (!checkLocalStorageAndRedirect()) {
      redirectToLogin();
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  return isLoggedIn ? <>{children}</> : null;
};

export default LocalStorageChecker;
