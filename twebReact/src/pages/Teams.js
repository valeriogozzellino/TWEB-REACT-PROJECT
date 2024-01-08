import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import { useNavigate } from 'react-router-dom';
import "../style/Teams.css";
function Teams() {
  const [clubs, setClubs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
  const [filterCountry, setFilterCountry] = useState("All"); // return all country and set them for the filter
  const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
  const [arraySeason, setArraySeason] = useState([]); // return all country and set them for the filter
  const [clickedTeam, setClickedTeam] = useState(); //set on click of the row in dataGrid
  const navigate = useNavigate();
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

  
  const handleFilterSeason = (event) => {
    setSeason(event.target.value);
  }
  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  }
  
  useEffect(() => {
  const getAllCountry = () => {
    const apiUrl = `http://localhost:3001/teams/get-teams-country`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setArrayCountry(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  const getAllSeason = () => {
    const apiUrl = `http://localhost:3001/teams/get-club-season`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setArraySeason(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  getAllCountry();
  getAllSeason();
  
}, []);
  
/** filter Teams by Competitions, return data  */
  const getTeamsByCountry = (filterCountry, filterSeason) => {
    console.log("filterCountry and filterSeason");
    console.log(filterSeason, filterCountry);
    const apiUrl = `http://localhost:3001/teams/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`;
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
    getTeamsByCountry(filterCountry, filterSeason);
  }, [filterCountry, filterSeason]);
  
  const handleRowClick = (rowId, newState) => {
    const club = clubs.find((club) => club.clubId === rowId);
    setClickedTeam(club);
    navigate(`/single-team/${club.clubId}`);
  }
  

    return (
      <div>
        <AppBarUser />
        <div>
          <h1>Teams</h1>
        </div>
        <div id="blockid">
          <Select
            sx={{ width: 100, height: 50 }}
            value={filterSeason}
            label="BY Competition"
            onChange={handleFilterSeason}
          >
            {arraySeason.map((season) => (
              <MenuItem key={season} value={season}>
                {season}
              </MenuItem>
            ))}
          </Select>
          <Select
            sx={{ width: 100, height: 50 }}
            value={filterCountry}
            label="Country"
            onChange={handleFilterCountry}
          >
            {arrayCountry.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
          
        </div>
        <div id="containerData">
          <DataGridElement gridData={gridData} onRowClick= {handleRowClick} />
        </div>
    
      </div>
    );


}


export default Teams;
