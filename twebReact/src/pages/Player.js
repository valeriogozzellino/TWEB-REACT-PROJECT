import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import AppBarUser from "../components/atoms/AppBarUser";
export default function Player() {
  //const [filteredPlayers, setFilteredPlayers] = React.useState([]); // Stato dei giocatori filtrati
  const { player_Id } = useParams();
  const [player, setPlayer] = useState(null);
  console.log("playerId: ", player_Id);

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
    // Se player è ancora null, mostra un caricamento o un messaggio
    return (
      <div>
      <AppBarUser />
      Loading...
    </div>
    );
  }

  return (
      <div>
      <AppBarUser />
      <div>
        <h1>{player.firstName} {player.lastName}</h1>
      </div>
        <div>
        <img src={player.imageUrl} alt="player" />
      </div>
      <div>
        <h2>{player.position}</h2>
        <h3>{player.countryOfBirth}</h3>
        <h3>{player.dateOfBirth}</h3>
      </div>
      {/* <button onClick={getPlayers}>getPlayersfrom db</button> */}
    </div>
  );
}