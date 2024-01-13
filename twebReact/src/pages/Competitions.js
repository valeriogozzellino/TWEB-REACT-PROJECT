import TopAppBar from "../components/atoms/TopAppBar";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import "../style/Competitions.css";
import { useAuth } from '../components/atoms/AuthContext';
import AppBarUser from "../components/atoms/AppBarUser";
import Footer from "../components/atoms/Footer";


const Competitions = () => {
  const links = [false, false, false, false, false, true, true];
  const pages = ['Home', 'News', 'Ranking', 'Teams', 'Players'];
  const [country, setCountry] = useState([]); 
  const [competitions, setCompetitions] = useState([]);
  const [filter, setFilter] = useState('All');  // Imposta il valore di default a "All"
  const [detailsCompetitions, setDetailsCompetitions] = useState(false); //set on click of the row in dataGrid
  const [clickedCompetition, setClickedCompetition] = useState(); //set on click of the row in dataGrid
  const { checkCredentials } = useAuth();  
  const navigate = useNavigate(); //to one team
  const [gridData, setGridData] = useState({
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 200 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'subType', headerName: 'subType', width: 200 },
      { field: 'confederation', headerName: 'conferderations', width: 200 },
    ],
    });
  
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  }

    const handleRowClick = (rowId, newState) => {
      console.log("Riga selezionata:", rowId);  
      const competitionId = rowId;
      navigate(`/single-competition/${competitionId}`);
    }
  
  
  useEffect(() => {
    const getAllCountry = () => {
      const apiUrl = `http://localhost:3001/competitions/get-competitions-country`;
      axios
        .get(apiUrl)
        .then((response) => {
          setCountry(response.data);
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    };
      getAllCountry();
  }, []); 

const getAllCompetitions = (filter) => {
    const apiUrl = `http://localhost:3001/competitions/all-competitions?filter=${filter}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const newRows = response.data.map((competitions) => ({
          id: competitions.competitionId,
          name: competitions.name,
          subType: competitions.subType,
          confederation: competitions.confederation,
        }));
        setGridData((prevGridData) => ({
          ...prevGridData,
          rows: newRows,
        }));
        setCompetitions(response.data);
      })
      .catch((error) => {
      alert(JSON.stringify(error));
      });
  };

    useEffect(() => {
      getAllCompetitions(filter);
    }, [filter]);
  
  
  
  
return (
  <div id="container">
    <div id="topBox">
      {checkCredentials ? (
                    <AppBarUser pages={pages}/>
                ) : (     
                    <TopAppBar links={links} pages={pages} />
        )}
    </div>
    <div id="container-middle">
        <div id="title">
          <h1>Competitions</h1>
        </div>
      <div id="middleBox">
      <div id="blockid">
        <Select
          sx={{ width: 100, height: 50 }}
          value={filter}
          label="Country"
          onChange={handleChangeFilter}
        >
          {country.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </div>
          <div id="containerData">
              <DataGridElement gridData={gridData} onRowClick={handleRowClick}/>
          </div>
      </div>
    </div>
      <Footer/>
  </div>   
)}
export default Competitions;