import TopAppBar from '../components/TopAppBar';
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import '../style/Competitions.css';
import Footer from '../components/Footer';
import CardElement from '../components/atoms/card/CardElement';
import '../style/global.css';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as competitionService from '../services/competitionsService';
import LoadingComponent from '../components/Loading';
import ButtonGoTop from '../components/atoms/ButtonGoTop';

const Competitions = () => {
  const links = [true, true, true];
  const [country, setCountry] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // Imposta il valore di default a "All"
  const navigate = useNavigate(); //to one team
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  // fare due useeffect uno per lo scorll e uno che cambia in base al filter
  useEffect(() => {
    let promises = [];
    promises.push(
      competitionService
        .getAllCompetitions(filter)
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
        }),

      //modificare questa chiamata fare lo useEffect ogni volta che country cambia e non solo la prima volta
      competitionService
        .getAllCountries()
        .then((response) => {
          setCountry(response.data);
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        })
    );

    Promise.all(promises).then((value) => {
      setIsLoading(false);
    });

    const handleScroll = () => {
      // Ottieni la posizione corrente di scroll
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    // Pulisci il listener quando il componente viene smontato
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filter]);

  if (isLoading) {
    return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'} />;
  }

  return (
    <div id="container">
      <div id="topBox">
        <TopAppBar links={links} />
      </div>
      <div
        className="container-background-color"
        style={{ minHeight: '100vh' }}
      >
        <div id="title">
          <h1 className="titleHome">
            <b>Competitions</b>
          </h1>
        </div>
        <div>
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
                border: '1px solid white',
                backgroundColor: '#1d3557',
                marginLeft: '10px',
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
      <ButtonGoTop scrollPosition={scrollPosition} />
      <ArrowBack />
      <ChatIcon />
      <Footer />
    </div>
  );
};
export default Competitions;
