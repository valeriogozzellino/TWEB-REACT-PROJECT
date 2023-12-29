import React from "react";
import AppBarUser from "../components/atoms/AppBarUser";
import axios from "axios";
export default function Players() {
  const getPlayers = () => {
    console.log("getPlayers i'm inside")
    const apiUrl = "http://localhost:3001/player/get-player-by-id";
    axios.get(apiUrl)
        .then(response => {
            response.data.forEach(player => {
              console.log(player);
            });
        })
        .catch(response => {
            alert(JSON.stringify(response));
        });
  }
  return (
      <div>
      <AppBarUser />
      <button onClick={getPlayers}>getPlayersfrom db</button>
      <h1>Players</h1>
    </div>
  );
}