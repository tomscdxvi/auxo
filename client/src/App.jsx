import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Track from './pages/Track';
import AuthenticatedHome from './pages/AuthenticatedHome';
import Calculate from './pages/Calculate';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<AuthenticatedHome />} />
        <Route exact path="/calculate" element={<Calculate />} />
        <Route exact path="/track" element={<Track />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
