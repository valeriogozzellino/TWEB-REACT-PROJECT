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
  //const [competitionId, setCompetitionId] = useState(null);
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
  
  const handleFilterCompetitions = (event) => {
    setCompetitionId(event.target.value);
  }
  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  }
  //get all the countries of the teams
  const [filterCountry, setFilterCountry] = useState([]); 
  useEffect(() => {
    const getAllCountry = () => {
      const apiUrl = `http://localhost:3001/teams/get-teams-country`;
      axios
      .get(apiUrl)
      .then((response) => {
        setFilterCountry(response.data);
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
      };
      getAllCountry();
    }, []); 
    
  const [filterCompetition, setCompetitionId] = useState([]); // Stato dei club filtrati
  useEffect(() => {
    const getAllCompetitions = () => {
      const apiUrl = `http://localhost:3001/teams/get-competitions-id`;
      axios
        .get(apiUrl)
        .then((response) => {
          setCompetitionId(response.data);
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    };
      getAllCompetitions();
  }, []); 

//get all teams and filter by country
  const getTeamsByCompetition = (filterCompetition) => {
    const apiUrl = `http://localhost:3001/teams/get-teams-by-competition?filterCompetition=${filterCompetition}`;
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
      getTeamsByCompetition(filterCompetition);
    }, [filterCompetition]);
        
  
  
  const location = useLocation();

  useEffect(() => {
    // Estrai il competitionId dai parametri dell'URL
    // const params = new URLSearchParams(location.search);
    // const competitionIdFromURL = params.get('props');
    // setCompetitionId(competitionIdFromURL);
    getTeamsByCompetition(filterCompetition);
  }, [filterCompetition, location.search]);
  
  return (
    <div>
      <AppBarUser />
      <div>
        <h1>Teams</h1>
      </div> 
      <div id="blockid">
           <Select
            sx={{ width: 100, height: 50 }}
            value={filterCompetition}
            label="BY Competition"
            onChange={handleFilterCompetitions}
          >
            {filterCompetition.map((competition) => (
              <MenuItem key={competition} value={competition}>
                {competition}
              </MenuItem>
            ))}
          </Select>
          <Select
            sx={{ width: 100, height: 50 }}
            value={filterCountry}
            label="Country"
            onChange={handleFilterCountry}
          >
            {filterCountry.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>
      <div id="containerData">
        <DataGridElement gridData={gridData} followClick={followClick} />  
      </div>
    
    </div>
  );
}

export default Teams;
