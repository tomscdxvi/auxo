import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import Login from './pages/Login';
import TrackPage from './pages/User/Track';
import AuthenticatedHomePage from './pages/User/AuthenticatedHome';
import AuthenticatedCoach from './pages/Coach/AuthenticatedCoach';
import CalculatePage from './pages/User/Calculate';
import WorkoutDetails from './pages/User/WorkoutDetails';
import ProgramsPage from './pages/User/Programs';
import Profile from './pages/User/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<AuthenticatedHomePage />} />
        <Route exact path='/coach' element={<AuthenticatedCoach />} />
        <Route exact path="/calculate" element={<CalculatePage />} />
        <Route exact path="/track" element={<TrackPage />} />
        <Route exact path="/programs" element={<ProgramsPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/details/{id}" element={<WorkoutDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
