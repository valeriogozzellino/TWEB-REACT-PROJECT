import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import AppBarUser from "../components/atoms/AppBarUser";
import { useAuth } from '../components/atoms/AuthContext';
import TopAppBar from "../components/atoms/TopAppBar";
import '../style/Player.css';



export default function Player() {
  const { player_Id } = useParams();
  const [player, setPlayer] = useState(null);
  const links = [true, false, false, false, false, false, true, true];
  const pages = ['News', 'Ranking', 'Teams', 'Player', 'Games', 'Competitions'];
  const { checkCredentials } = useAuth();
  

    const getPlayer = (filter) => {
    console.log("1111111 " + filter);
    const apiUrl = `http://localhost:3001/player/get-player-by-playerId?filter=${filter}`;
    axios.get(apiUrl)
      .then(response => {
      console.log("response.data: ", response.data);
      setPlayer(response.data);
    })
    .catch(response => {
      alert(JSON.stringify(response));
    });
    }
  
    useEffect(() => {
     getPlayer(player_Id);
    }, [player_Id]);

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
      <div className="player-header">
        <h1>{player.firstName} {player.lastName}</h1>
        <div className="player-stats">
          <span>Player position: {player.position}</span>
          <span>countryOfBirth: {player.countryOfBirth}</span>
          <span>Heigth: {player.heightInCm}</span>
          <span>dateOfBirth: {player.dateOfBirth}</span>
        </div>
      </div>
      <div className="player-image">
        <img src={player.imageUrl} alt={`${player.firstName} ${player.lastName}`} />
      </div>
      <div className="player-info">
        <h2>Position: {player.position}</h2>
        <h3>{player.currentClubName}</h3>
      </div>
    </div>
  );
}
