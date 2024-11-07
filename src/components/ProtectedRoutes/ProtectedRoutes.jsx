// ProtectedRoutes.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserProvider ,useUser } from '../../UserContext';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('chatToken');
        if (!token) {
          console.log('No token found');
          return; 
        }

        const response = await axios.get('http://localhost:3000/api/protected-route', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
        if(response.data.user)
        {
            navigate('/chatapp');
        }
        document.body.style.background = response.data.user.mscolor;
      } catch (err) {
        console.error('Fetch error:', err);
        navigate('/loginsignup');
      }
    };
    fetchUserData();
  }, [setUser]);

  return children;
};

export default ProtectedRoutes;
