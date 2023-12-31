import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridTeams from "../components/atoms/DataGrid";
import "../style/Teams.css";
function Teams() {
  const [filteredClubs, setFilteredClubs] = useState([]); // Stato dei club filtrati
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
        getAllTeams("Italy");
    }, [filteredClubs]);
        
  return (
    <div>
      <AppBarUser />
      <div>
        <h1>Teams</h1>
      </div> 
      <div id="containerData">
        <DataGridTeams gridData={gridData} />  
      </div>
    
    </div>
  );
}

export default Teams;
