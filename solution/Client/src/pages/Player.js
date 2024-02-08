import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import '../style/Player.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as playerService from '../services/playerService';
import LoadingComponent from '../components/Loading';
import CardAppearance from '../components/atoms/card/CardApperence';
import Button from '@mui/material/Button';
/**
 * Player Component:
 *
 * Displays detailed information about a specific player, including personal information,
 * market value, and a list of appearances in different matches.
 *
 * Behavior:
 * - On load, fetches detailed information about the player and their appearances using the `playerService`.
 * - Presents the player's information in different tabs, allowing the user to switch between
 *   personal details and match appearances.
 * - Provides a 'Show More/Less' functionality for the list of appearances.
 *
 * @returns {JSX.Element} The JSX for the Player page.
 */

export default function Player() {
  const { player_Id } = useParams();
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const links = [true, true, true];
  const [view, setView] = useState(0);
  const [playerAppearances, setPlayerAppearances] = useState([]);
  const [showAppearances, setShowAppearances] = useState(6);

  const handleNumberAppearence = (param) => {
    if (param === 1) {
      if (playerAppearances.length <= showAppearances) return;
      setShowAppearances(showAppearances + 4);
    } else {
      if (showAppearances <= 4) return;
      setShowAppearances(showAppearances - 4);
    }
  };

  useEffect(() => {
    let promises = [];
    promises.push(
      playerService
        .getPlayerByPlayerId(player_Id)
        .then((response) => {
          setPlayer(response.data);
        })
        .catch((error) => {
          console.error(error);
        }),

      playerService
        .getAppearancesByPlayerId(player_Id)
        .then((response) => {
          const appearancesData = response.data.map((appearance, index) => ({
            id: index,
            date: new Date(appearance.date).toDateString(),
            competition_id: appearance.competition_id,
            yellow_cards: appearance.yellow_cards,
            red_cards: appearance.red_cards,
            goals: appearance.goals,
            assists: appearance.assists,
            minutes_played: appearance.minutes_played,
            game_id: appearance.game_id,
          }));
          setPlayerAppearances(appearancesData);
        })
        .catch((error) => {
          console.error(error);
        })
    );
    Promise.all(promises).then((value) => {
      setIsLoading(false);
    });
  }, [player_Id]);

  const handleChangeTab = (event, newValue) => {
    setView(newValue);
  };

  if (isLoading) {
    return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'} />;
  }

  return (
    <div className="player-container">
      <TopAppBar links={links} />
      <div>
        <div className="header-info-container">
          <img
            src={player.imageUrl}
            alt={`${player.firstName} ${player.lastName}`}
          />
          <h1 className="print-color" style={{ margin: '20px' }}>
            {player.firstName} {player.lastName}
          </h1>
        </div>

        <div className="container-background-color middle-container">
          <div className="tabs">
            <Box
              sx={{
                borderBottom: 2,
                borderColor: 'divider',
              }}
            >
              <Tabs
                value={view}
                aria-label="basic tabs example"
                onChange={handleChangeTab}
              >
                <Tab label="Information" value={0} />
                <Tab label="Appearences" value={1} />
              </Tabs>
            </Box>
          </div>
          {view === 0 ? (
            <div className="overall-info-container">
              <div className="single-player-card personal-info">
                <h1 className="print-color"> Informazioni personali </h1>
                <span>Paese di nascita: {player.countryOfBirth}</span>
                <span>Data di nascita: {player.dateOfBirth}</span>
                <span>Città di nascita: {player.cityOfBirth}</span>
                <span>Cittadinanza: {player.countryOfCitizenship}</span>
                <span>Altezza (cm): {player.heightInCm}</span>
              </div>

              <div className="single-player-card about-player">
                <h1 className="print-color"> Specifiche </h1>
                <span>Posizione: {player.position}</span>
                <span>Posizione specifica: {player.subPosition}</span>
                <span>Club: {player.currentClubName}</span>
                <span>Piede: {player.foot}</span>
              </div>

              <div className="single-player-card other-info">
                <h1 className="print-color"> Mercato </h1>
                <span>Valore di mercato (Eur): {player.marketValueInEur}</span>
                <span>
                  Valore di mercato piuù alto (Eur):{' '}
                  {player.highestMarketValueInEur}
                </span>
                <span>Fine Contratto: {player.contractExpirationDate}</span>
                <a
                  style={{ color: 'red' }}
                  href={player.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Altre Info
                </a>
              </div>
            </div>
          ) : view === 1 ? (
            <div className="grid-container">
              <CardAppearance
                playerAppearances={playerAppearances.reverse()}
                showAppearances={showAppearances}
              />
              <div id="buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginRight: '21px' }}
                  onClick={() => handleNumberAppearence(0)}
                >
                  Show Less
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleNumberAppearence(1)}
                >
                  Show More
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ height: '300px' }}></div>
          )}
        </div>
      </div>
      <ArrowBack />
      <ChatIcon />
      <Footer />
    </div>
  );
}
