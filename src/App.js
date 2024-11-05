import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './page/Login/Login';
import ChatApp from './page/ChatApp/ChatApp';
import Header from './page/Header/Header';
import Landingpage from './page/Landingpage/Landingpage';
import LoginSignup from './page/Login/Login';
import Pagenotfound from './page/Pagenotfound/Pagenotfound';
import { UserProvider , useUser } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
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
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchUserData();
  }, [setUser]);
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Routes>
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/chatapp" element={<ChatApp />} />
        <Route path="/" element={<Landingpage />} />
     
        {/* Optionally, you can add a catch-all route for 404s */}
        <Route path="*" element={<Pagenotfound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
