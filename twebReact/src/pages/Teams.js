import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import { useLocation } from 'react-router-dom'; // Importa useLocation da react-router-dom
import "../style/Teams.css";
function Teams() {
  const followClick = "/players"; // Imposta il valore di default a "/players"  
  const [competitionId, setCompetitionId] = useState(null);
  const [filter, setFilter] = useState("All"); // Stato dei club filtrati
  const [clubs, setClubs] = useState([]);
  const [gridData, setGridData] = useState({
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 200 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'squadSize', headerName: 'Squad Size', width: 200 },
      { field: 'stadiumName', headerName: 'Stadium Name', width: 200 },
      { field: 'stadiumSeats', headerName: 'Stadium Seats', width: 200 },
    ],
  });

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  }

  const getAllTeams = (filter) => {
    const apiUrl = `http://localhost:3001/teams/all-teams?filter=${filter}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const newRows = response.data.map((clubs) => ({
          id: clubs.clubId,
          name: clubs.name,
          squadSize: clubs.squadSize,
          stadiumName: clubs.stadiumName,
          stadiumSeats: clubs.stadiumSeats,
        }));

        setGridData((prevGridData) => ({
          ...prevGridData,
          rows: newRows,
        }));
        setClubs(response.data);
      })
      .catch((error) => {
      alert(JSON.stringify(error));
      });
  };

    useEffect(() => {
        getAllTeams(filter);
    }, [filter]);
        
  
  
  const location = useLocation();

  useEffect(() => {
    // Estrai il competitionId dai parametri dell'URL
    const params = new URLSearchParams(location.search);
    const competitionIdFromURL = params.get('competitionId');
    setCompetitionId(competitionIdFromURL);
    getAllTeams(filter);
  }, [filter, location.search]);
  
  return (
    <div>
      <AppBarUser />
      <div>
        <h1>Teams</h1>
      </div> 
      <div id="blockid">
          <Select
            sx={{ width: 100, height: 50 }}
            value={filter}
            label="Country"
            onChange={handleChangeFilter}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Italy"}>Italy</MenuItem>
            <MenuItem value={"Russia"}>Russia</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
            <MenuItem value={"France"}>France</MenuItem>
            <MenuItem value={"Spain"}>Spain</MenuItem>
          </Select>
        </div>
      <div id="containerData">
        <DataGridElement gridData={gridData} followClick={followClick} />  
      </div>
    
    </div>
  );
}

export default Teams;
