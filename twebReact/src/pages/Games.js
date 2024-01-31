import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import Footer from '../components/Footer';
import CalendarElement from '../components/CalendarElement';
import GameCard from '../components/atoms/card/GameCard';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as gameService from '../services/gameService';
import LoadingComponent from '../components/Loading';
/**
 *
 * @returns
 */
export default function Games() {
  const [games, setGames] = useState([]); // return all country and set them for the filter
  const [allGames, setAllGames] = useState([]); // return all country and set them for the filter
  const [gameDates, setGameDates] = useState([]);
  // const [selectedDate, setSelectedDate] = useState('');
  const [dateClicked, setDateClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const links = [true, true, true];
  const navigate = useNavigate();

  function handleGameClick(game) {
    navigate(`/single-game/${game.game_id}`);
  }

  function scrollToBottom() {
    window.scrollTo({
      top: 900,
      behavior: 'smooth',
    });
  }

  const handleDateClick = (date) => {
    const formattedDate = new Date(date).toDateString();
    const gamesOnDate = allGames.filter(
      (game) => new Date(game.date).toDateString() === formattedDate
    );
    setGames(gamesOnDate);
    // setSelectedDate(formattedDate);
    setDateClicked(true);
    scrollToBottom();
  };

  useEffect(() => {
    let promises = [];
    promises.push(
      gameService
        .getAllGames()
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

          const gameDates = sortedGames.map((game) =>
            new Date(game.date).toDateString()
          );
          setGameDates(gameDates);
          setAllGames(sortedGames);
        })
        .catch((err) => {
          console.error(err);
        })
    );

    Promise.all(promises).then((value) => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'} />;
  }

  return (
    <div className="teams-container">
      <div className="header-container">
        <TopAppBar links={links} />
      </div>
      <div className="container-background-color">
        <div id="container-title">
          <h1 className="titleHome">
            <b>Games</b>
          </h1>
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
    </div>
  );
}
