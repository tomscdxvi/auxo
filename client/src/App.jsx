import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Track from './pages/Track';
import AuthenticatedHome from './pages/AuthenticatedHome';
import AuthenticatedCoach from './pages/AuthenticatedCoach';
import Calculate from './pages/Calculate';
import WorkoutDetails from './pages/WorkoutDetails';
import Plan from './pages/Plan';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<AuthenticatedHome />} />
        <Route exact path='/coach' element={<AuthenticatedCoach />} />
        <Route exact path="/calculate" element={<Calculate />} />
        <Route exact path="/track" element={<Track />} />
        <Route exact path="/plan" element={<Plan />} />
        <Route exact path="/details/{id}" element={<WorkoutDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
