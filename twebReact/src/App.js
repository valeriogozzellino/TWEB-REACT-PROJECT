import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Ranking from "./pages/Ranking";
import Teams from "./pages/Teams";
import Players from './pages/Players';
import SignUp from './pages/SignUp';
import News from './pages/News';
import Games from "./pages/Games";
import Competitions from "./pages/Competitions";
function App() {
    
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/logIn" element={<LogIn />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/news" element={<News />} /> 
                    <Route path="/competitions" element={<Competitions />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
