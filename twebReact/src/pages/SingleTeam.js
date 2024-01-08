import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import { useNavigate } from 'react-router-dom';
import "../style/Teams.css";
import { useParams } from 'react-router-dom';
//todo: fare una query che mi ritorna le specifiche del team , da qui chiamo i player
export default function SingleTeam() {
    const navigate = useNavigate();
    const { clubId } = useParams();
    console.log("clubId: ", clubId);
    const [players, setPlayers] = useState(null);

    const [gridDataPlayers, setGridDataPlayers] = useState({
        rows: [],
        columns: [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'imageUrl', headerName: 'Image', width: 200 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 },
        { field: 'countryOfBirth', headerName: 'Coutry of birth', width: 200 },
        { field: 'dateOfBirth', headerName: 'DOB', width: 200 },
        { field: 'position', headerName: 'Stadium Name', width: 200 },
        ],
    });
        
    const handleRowClickPlayers = (rowId, newState) => {
      const player = players.find((player) => player.playerId === rowId);
      console.log(player.playerId);
       navigate(`/player/${player.playerId}`);
    }
    
    const getPlayers = (filter) => {
    console.log("getPlayers i'm inside: filter:: "+filter);
    const apiUrl = `http://localhost:3001/player/get-player-by-team?filter=${filter}`;
    axios.get(apiUrl)
    .then(response => {
      const newRows = response.data.map((players) => ({
          id: players.playerId,
          imageUrl: players.imageUrl,
          firstName: players.firstName,
          lastName: players.stadiumName,
          countryOfBirth: players.countryOfBirth,
          dateOfBirth: players.dateOfBirth,
          position: players.position,
        }));
        setGridDataPlayers((prevGridData) => ({
          ...prevGridData,
          rows: newRows,
        }));
      setPlayers(response.data);
      })
      .catch(response => {
        alert(JSON.stringify(response));
      });
    }
      useEffect(() => {
        getPlayers(clubId);
      }, [clubId]);
    
    
    if (!players) {
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
                <h1>Team Name.....</h1>
            </div>
            <div id="blockDetails">
                <div id="containerGridPlayer">
                    <DataGridElement gridData={gridDataPlayers} onRowClick={handleRowClickPlayers} />
                </div>           
            </div>

        </div>
    );
}