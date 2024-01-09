import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Ranking from "./pages/Ranking";
import Teams from "./pages/Teams";
import Player from './pages/Player';
import SignUp from './pages/SignUp';
import News from './pages/News';
import Games from "./pages/Games";
import Competitions from "./pages/Competitions";
import SingleGame from "./pages/SingleGame";
import SingleTeam from './pages/SingleTeam';
import { AuthProvider } from './components/atoms/AuthContext';


function App() {
    return (

        <AuthProvider>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home  />} />
                        <Route path="/ranking" element={<Ranking />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/player/:player_Id" element={<Player />} />
                        <Route path="/news" element={<News />} /> 
                        <Route path="/competitions" element={<Competitions />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/single-game/:gameId" element={<SingleGame />} />
                        <Route path="/single-team/:clubId" element={<SingleTeam />} />        
                        <Route path="/logIn" element={<LogIn  />} />
                        <Route path="/signup" element={<SignUp/>} />
                        <Route path="*" element={<h1>Page not found</h1>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
