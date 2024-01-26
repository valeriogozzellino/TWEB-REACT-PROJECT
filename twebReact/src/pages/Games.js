import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Footer from '../components/Footer';
import CalendarElement from '../components/CalendarElement';
import GameCard from '../components/atoms/card/GameCard';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';

export default function Games() {
  const [error, setError] = useState(null);
  const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
  const [filterCountry, setFilterCountry] = useState('All'); // return all country and set them for the filter
  const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
  const [games, setGames] = useState([]); // return all country and set them for the filter
  const [allGames, setAllGames] = useState([]); // return all country and set them for the filter
  const [gameDates, setGameDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateClicked, setDateClicked] = useState(false);
  const links = [true, true, true];
  const navigate = useNavigate();

  const handleGetAllGames = () => {
    axios
      .get('http://localhost:3001/games/get-games')
      .then((response) => {
        const sortedGames = response.data
          .filter(
            (game) =>
              game.date &&
              game.home_club_name &&
              game.away_club_name &&
              game.aggregate != null &&
              game.game_id
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        const newRows = sortedGames.map((game, index) => ({
          id: index,
          gameDate: new Date(game.date).toDateString(),
          homeTeam: game.home_club_name,
          aggregate: game.aggregate,
          awayTeam: game.away_club_name,
          game_id: game.game_id,
        }));
        const gameDates = sortedGames.map((game) =>
          new Date(game.date).toDateString()
        );
        setGameDates(gameDates);
        setAllGames(sortedGames);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  };

  function handleGameClick(game) {
    navigate(`/single-game/${game.game_id}`);
  }

  function scrollToBottom() {
    window.scrollTo({
      top: 800,
      behavior: 'smooth', // Utilizza lo scorrimento animato se il browser lo supporta
    });
  }

  const handleDateClick = (date) => {
    const formattedDate = new Date(date).toDateString(); // Formatta la data in modo da confrontarla correttamente
    const gamesOnDate = allGames.filter(
      (game) => new Date(game.date).toDateString() === formattedDate
    );
    setGames(gamesOnDate);
    setSelectedDate(formattedDate);
    setDateClicked(true);
    scrollToBottom();
  };

  const handleFilterSeason = (event) => {
    setSeason(event.target.value);
  };
  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  };

  useEffect(() => {
    handleGetAllGames();
  }, []);

  return (
    <div className="teams-container">
      <div className="header-container">
        <TopAppBar links={links} />
      </div>
      <div className="container-background-color">
        <div id="container-title">
          <h1 className="titleHome">Games</h1>
        </div>
        <div className="data-grid-container">
          <h3 className="page-subtitle">Select a date to see more details</h3>
          <CalendarElement
            gameDates={gameDates}
            onDateClick={handleDateClick}
          />
        </div>
        <div id="container-game-date">
          {dateClicked &&
            games.length > 0 &&
            games.map((game, index) => (
              <div
                onClick={() => handleGameClick(game)}
                key={index}
                style={{ margin: '10px' }}
              >
                <GameCard
                  game={game}
                  imageurl1={
                    'https://tmssl.akamaized.net/images/wappen/head/' +
                    game.home_club_id +
                    '.png?'
                  }
                  imageurl2={
                    'https://tmssl.akamaized.net/images/wappen/head/' +
                    game.away_club_id +
                    '.png?'
                  }
                />
              </div>
            ))}
        </div>
      </div>
      <ArrowBack />
      <ChatIcon />
      <Footer />
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
