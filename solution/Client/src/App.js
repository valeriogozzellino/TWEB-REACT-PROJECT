import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Teams from './pages/Teams';
import Player from './pages/Player';
import SignUp from './pages/SignUp';
import Games from './pages/Games';
import Competitions from './pages/Competitions';
import SingleGame from './pages/SingleGame';
import SingleTeam from './pages/SingleTeam';
import ChatWindow from './pages/ChatWindow';
import SingleCompetitions from './pages/SingleCompetitions';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/player/:player_Id" element={<Player />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/chat/:chatRoom" element={<ChatWindow />} />
          <Route path="/games" element={<Games />} />
          <Route path="/single-game/:gameId" element={<SingleGame />} />
          <Route path="/single-team/:clubId" element={<SingleTeam />} />
          <Route
            path="/single-competition/:competitionId"
            element={<SingleCompetitions />}
          />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
