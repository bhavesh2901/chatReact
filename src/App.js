import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import ChatApp from './page/ChatApp/ChatApp';
import Header from './page/Header/Header';
import Landingpage from './page/Landingpage/Landingpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/loginsignup" element={<Login />} />
        <Route path="/chatapp" element={<ChatApp />} />
        {/* Optionally, you can add a catch-all route for 404s */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
