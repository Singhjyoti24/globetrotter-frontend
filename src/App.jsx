import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import ChallengeFriend from './pages/ChallengeFriend';
import InvitePage from './pages/InvitePage';
import './App.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenge" element={<ChallengeFriend />} />
            <Route path="/invite" element={<InvitePage />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}
export default App;