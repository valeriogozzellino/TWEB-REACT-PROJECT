import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import DataGridElement from "../components/atoms/DataGrid";
import AppBarUser from "../components/atoms/AppBarUser";
import TopAppBar from "../components/atoms/TopAppBar";
import { useAuth } from '../components/atoms/AuthContext';
import '../style/Player.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Footer from "../components/atoms/Footer";

export default function Player() {
  const { player_Id } = useParams();
  const [player, setPlayer] = useState(null);
  const [playerAppearances, setPlayerAppearances] = useState([]);
  const links = [true, false, false, false, false, false, true, true];
  const pages = ['News', 'Ranking', 'Teams', 'Player', 'Games', 'Competitions'];
  const { checkCredentials } = useAuth();
  const [view, setView] = useState(0);


  const columns = [
    { field: 'date', headerName: 'Date', width: 20 },
    { field: 'competition_id', headerName: 'Competition', width: 20 },
    { field: 'yellow_cards', headerName: 'Yellow Cards', width: 130 },
    { field: 'red_cards', headerName: 'Red Cards', width: 130 },
    { field: 'goals', headerName: 'Goals', width: 130 },
    { field: 'assists', headerName: 'Assists', width: 130 },
    { field: 'minutes_played', headerName: 'Minutes Played', width: 130 },
  ];

  useEffect(() => {
    const getPlayer = (filter) => {
      const apiUrl = `http://localhost:3001/player/get-player-by-playerId?filter=${filter}`;
      axios.get(apiUrl)
          .then(response => {
            setPlayer(response.data);
          })
          .catch(response => {
            alert(JSON.stringify(response));
          });
    }

    const getPlayerAppearances = (player_Id) => {
      const apiUrl = `http://localhost:3001/player/get-player-appearances-by-player-id/${player_Id}`;
      axios.get(apiUrl)
          .then(response => {
            const appearancesData = response.data.map((appearance, index) => ({
              id: index,
              date: new Date(appearance.date).toDateString(),
              competition_id: appearance.competition_id,
              yellow_cards: appearance.yellow_cards,
              red_cards: appearance.red_cards,
              goals: appearance.goals,
              assists: appearance.assists,
              minutes_played: appearance.minutes_played,

            }));
            setPlayerAppearances(appearancesData);
          })
          .catch(response => {
            alert(JSON.stringify(response));
          });
    }

    getPlayer(player_Id);
    getPlayerAppearances(player_Id);
  }, [player_Id]);



  const handleChangeTab = (e) => {
    const id = e.target.id;
    switch (id) {
      case 'tabOne':
        setView(0);
        break;
      case 'tabTwo':
        setView(1);
        break;
      case 'tabThree':
        setView(2);
        break;
      default:
        break;
    }
  }



  if (!player) {
    return (
        <div className="player-loading">
          {checkCredentials ? <AppBarUser pages={pages} /> : <TopAppBar links={links} pages={pages} />}
          Loading...
        </div>
    );
  }


    return (
    <div className="player-container">
        {checkCredentials ? <AppBarUser pages={pages} /> : <TopAppBar links={links} pages={pages} />}
      <div id="middle-box">

      <div className="player-header">
        <h1>{player.firstName} {player.lastName}</h1>
      </div>
      <div className="player-image">
        <img src={player.imageUrl} alt={`${player.firstName} ${player.lastName}`} />
      </div>
      <div id="containerData">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs  aria-label="basic tabs example">
            <Tab label="Item One" id="tabOne" onClick={handleChangeTab}  />
            <Tab label="Item Two" id="tabTwo" onClick={handleChangeTab} />
            <Tab label="Item Three" id="tabThree" onClick={handleChangeTab} />
         </Tabs>
          </Box>
          {view === 0 ? (
            <div className="player-stats">
              <span>Player position: {player.position}</span>
              <span>countryOfBirth: {player.countryOfBirth}</span>
              <span>Heigth: {player.heightInCm}</span>
              <span>dateOfBirth: {player.dateOfBirth}</span>
            </div>

          ) : view === 1 ? (
              
            <div className="player-info">
              <h2>Position: {player.position}</h2>
              <h3>{player.currentClubName}</h3>
            </div>
          ) : (
            <div id="playerAppearancesGrid" style={{ height: '300px' }}>
              <DataGridElement gridData={{ rows: playerAppearances, columns: columns }} />
            </div>
          )}
        </div>
        </div>
        <Footer/>
    </div>
  );
}
