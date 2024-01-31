import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/Teams.css';
import TopAppBar from '../components/TopAppBar';
import '../style/Single-Team.css';
import Footer from '../components/Footer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GameCard from '../components/atoms/card/GameCard';
import Button from '@mui/material/Button';
import ChatIcon from '../components/atoms/ChatIcon';
import CardPlayers from '../components/atoms/card/CardPlayer';
import Tooltip from '@mui/material/Tooltip';
import ArrowBack from '../components/atoms/ArrowBack';
import LoadingComponent from '../components/Loading';
import * as gameService from '../services/gameService';
import * as singleTeamService from '../services/singleTeamService';
import * as playerService from '../services/playerService';
/**
 * SingleTeam Component:
 *
 * Displays details about a single team, including players, recent games, and basic team information.
 * Users can view more players or games by interacting with the 'Show More/Less' buttons.
 *
 * Behavior:
 * - On load, fetches the team details, players, and recent games using the `singleTeamService` and `gameService`.
 * - Displays team information, a list of players, and recent games.
 * - Users can click on a player or a game to navigate to their respective detailed view.
 *
 * @returns {JSX.Element} The JSX for the SingleTeam page.
 */

export default function SingleTeam() {
  const links = [true, true, true];
  const navigate = useNavigate();
  const { clubId } = useParams();
  const logo =
    'https://tmssl.akamaized.net/images/wappen/head/' + clubId + '.png?';
  const [view, setView] = useState(0);
  const [players, setPlayers] = useState(null);
  const [clubGames, setClubGames] = useState(null);
  const [team, setTeam] = useState(null);
  const [showGames, setShowGames] = useState(6);
  const [showPlayer, setShowPlayer] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  const handleNumberPlayer = (param) => {
    if (param === 1) {
      if (players.length <= showPlayer) return;
      setShowPlayer(showPlayer + 6);
    } else {
      if (showPlayer <= 6) return;
      setShowPlayer(showPlayer - 6);
    }
  };

  useEffect(() => {
    let promises: Promise[] = [];
    promises.push(
      singleTeamService
        .getTeamById(clubId)
        .then((response) => {
          setTeam(response.data);
        })
        .catch((error) => {
          console.error(error);
        }),

      gameService
        .getClubGamesById(clubId)
        .then((response) => {
          setClubGames(response.data);
        })
        .catch((error) => {
          console.error(error);
        }),

      playerService
        .getPlayerByTeamId(clubId)
        .then((response) => {
          setPlayers(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
    );
    Promise.all(promises).then((value) => {
      setIsLoading(false);
    });
  }, [clubId, showPlayer]);

  const handleNumberGame = (number) => {
    if (number === 1) {
      if (showGames === 6) return;
      setShowGames(showGames - 6);
    } else {
      setShowGames(showGames + 6);
    }
  };

  if (!players) {
    return (
      <div>
        <TopAppBar links={links} />
        Loading...
      </div>
    );
  }

  const handleChangeTab = (event, newValue) => {
    setView(newValue);
  };

  function handleGameClick(game) {
    navigate(`/single-game/${game.game_id}`);
  }

  function handlePlayerClick(player) {
    navigate(`/player/${player.playerId}`);
  }

  if (isLoading) {
    return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'} />;
  }

  return (
    <div>
      <div id="container-single-team" className="container-background-color">
        <TopAppBar links={links} />
        <div>
          <div id="title-box">
            <img
              src={logo}
              alt="Team"
              style={{ width: '110px', height: '150px', margin: '20px' }}
            />
            <h1>{team ? team.name : 'Loading...'}</h1>
          </div>
          <div className="team-infos" style={{ color: 'white' }}>
            <p>
              <strong>Stadium:</strong> {team ? team.stadiumName : 'Loading...'}
            </p>
            <p>
              <strong>Stadium Seats:</strong>{' '}
              {team ? team.stadiumSeats : 'Loading...'}
            </p>
            <p>
              <strong>Transfer Record:</strong>{' '}
              {team ? team.netTransferRecord : 'Loading...'}
            </p>
          </div>
        </div>
        <div id="middle-container-team">
          <Box
            sx={{
              borderBottom: 2,
              borderColor: 'divider',
              marginBottom: '5px',
            }}
          >
            <Tabs
              value={view}
              aria-label="basic tabs example"
              onChange={handleChangeTab}
            >
              <Tab label="Players" value={0} />
              <Tab label="Games" value={1} />
            </Tabs>
          </Box>

          {view === 0 ? (
            <div className="container-data-team">
              <div id="players-card">
                {players.slice(0, showPlayer).map((player) => (
                  <Tooltip title={player.position} key={player.playerId}>
                    <div onClick={() => handlePlayerClick(player)}>
                      <CardPlayers
                        Id={player.playerId}
                        image={player.imageUrl}
                        firstName={player.firstName}
                        lastName={player.lastName}
                        position={player.subPosition}
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>
              <div id="buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginRight: '21px' }}
                  onClick={() => handleNumberPlayer(0)}
                >
                  Show Less
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleNumberPlayer(1)}
                >
                  Show More
                </Button>
              </div>
            </div>
          ) : view === 1 ? (
            <div className="container-data-team">
              <div id="games-card">
                {clubGames.slice(0, showGames).map((game) => (
                  <div onClick={() => handleGameClick(game)} key={game.game_id}>
                    <GameCard
                      game={game}
                      imageurl1={
                        'https://tmssl.akamaized.net/images/wappen/head/' +
                        clubId +
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

              <div id="buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleNumberGame(1)}
                  sx={{ marginRight: '21px' }}
                >
                  Show Less
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleNumberGame(0)}
                >
                  Show More
                </Button>
              </div>
            </div>
          ) : (
            <div className="football-field">{/* Remove this  */}</div>
          )}
        </div>
        <ArrowBack />
        <ChatIcon />
      </div>
      <Footer />
    </div>
  );
}
