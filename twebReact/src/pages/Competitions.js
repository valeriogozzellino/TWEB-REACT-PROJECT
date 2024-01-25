import TopAppBar from '../components/atoms/TopAppBar';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from '../components/atoms/DataGrid';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import '../style/Competitions.css';
import { useAuth } from '../components/atoms/AuthContext';
import Footer from '../components/atoms/Footer';
import CardElement from '../components/atoms/CardElement';
import '../style/global.css';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from "../components/atoms/ArrowBack";

const Competitions = () => {
  const links = [false, true, false, true, true, false, false, false];
  const [country, setCountry] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [filter, setFilter] = useState('All'); // Imposta il valore di default a "All"
  const [detailsCompetitions, setDetailsCompetitions] = useState(false); //set on click of the row in dataGrid
  const [clickedCompetition, setClickedCompetition] = useState(); //set on click of the row in dataGrid
  const { checkCredentials } = useAuth();
  const navigate = useNavigate(); //to one team

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleRowClick = (rowId, newState) => {
    console.log('Riga selezionata:', rowId);
    const competitionId = rowId;
    navigate(`/single-competition/${competitionId}`);
  };

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
        <TopAppBar links={links} />
      </div>
      <div className="container-background-color">
        <div id="title">
          <h1 className="titleHome">Competitions</h1>
        </div>
        <div id="middleBox">
          <div id="blockid">
            <p>
              <b>Select a country: </b>
            </p>
            <br />
            <Select
              sx={{
                width: 100,
                height: 50,
                color: 'white',
                backgroundColor: '#1d3557',
                borderColor: '#1d3557',
              }}
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
            {competitions.map((competition) => (
              <div id="card-element" key={competition.competitionId}>
                <CardElement
                  clubId={competition.competitionId}
                  title={competition.name}
                  type={'single-competition'}
                  image={
                    'https://tmssl.akamaized.net/images/logo/header/' +
                    competition.competitionId.toLowerCase() +
                    '.png?'
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ArrowBack />
      <ChatIcon />
      <Footer />
    </div>
  );
};
export default Competitions;
