import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../style/Teams.css';
import TopAppBar from '../components/TopAppBar';
import Footer from '../components/Footer';
import '../style/global.css';
import CardElement from '../components/atoms/card/CardElement';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as teamService from '../services/teamService';
import LoadingComponent from '../components/Loading';
import ButtonGoTop from '../components/atoms/ButtonGoTop';
/**
 * Teams Component:
 *
 * Displays a list of football teams. Users can filter the list by season and country.
 * The component fetches data about teams, countries, and seasons and allows the user to select
 * specific criteria for filtering the displayed teams.
 *
 * Behavior:
 * - On load, fetches lists of countries, seasons, and teams based on the selected filters using the `teamService`.
 * - Users can select a season and a country from the dropdowns to filter the teams.
 * - Displays each team in a CardElement.
 *
 * @returns {JSX.Element} The JSX for the Teams page.
 */

function Teams() {
  const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
  const [filterCountry, setFilterCountry] = useState('All'); // return all country and set them for the filter
  const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
  const [arraySeason, setArraySeason] = useState([]); // return all country and set them for the filter
  const [isLoading, setIsLoading] = useState(true);
  const links = [true, true, true];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clubs, setClubs] = useState([]);

  const handleFilterSeason = (event) => {
    setSeason(event.target.value);
  };
  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  };

  useEffect(() => {
    let promises = [];
    promises.push(
      teamService
        .getAllCountry()
        .then((response) => {
          setArrayCountry(response.data);
        })
        .catch((error) => {
          console.error(error);
        }),

      teamService
        .getClubBySeason()
        .then((response) => {
          setArraySeason(response.data);
        })
        .catch((error) => {
          console.error(error);
        }),

      teamService
        .getTeamsBySeasonAndCountry(filterCountry, filterSeason)
        .then((response) => {
          setClubs(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
    );
    Promise.all(promises).then((value) => {
      setIsLoading(false);
    });

    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filterSeason, filterCountry]);

  if (isLoading) {
    return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'} />;
  }

  return (
    <div className="teams-container">
      <div className="header-container">
        <TopAppBar links={links} />
      </div>
      <div className="container-background-color">
        <div id="container-title">
          <h1 className="titleHome">
            <b>Teams</b>
          </h1>
        </div>
        <div className="filters-container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '60px',
              alignItems: 'center',
            }}
          >
            <h5 className="filter-title">Select a season:</h5>
            <Select
              className="season-select"
              value={filterSeason}
              style={{ color: 'white' }}
              placeholder=""
              onChange={handleFilterSeason}
            >
              {arraySeason.map((season) => (
                <MenuItem key={season} value={season}>
                  {season}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '60px',
              alignItems: 'center',
            }}
          >
            <h5 className="filter-title">Select a country:</h5>
            <Select
              className="country-select"
              value={filterCountry}
              style={{ color: 'white' }}
              placeholder="Select a country"
              onChange={handleFilterCountry}
            >
              {arrayCountry.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div id="containerData">
          {clubs.map((club) => (
            <div id="card-element" key={club.clubId}>
              <CardElement
                clubId={club.clubId}
                title={club.name}
                type={'single-team'}
                subtitle={club.squadSize}
                image={
                  'https://tmssl.akamaized.net/images/wappen/head/' +
                  club.clubId +
                  '.png?'
                }
              />
            </div>
          ))}
        </div>
      </div>
      <ButtonGoTop scrollPosition={scrollPosition} />
      <ArrowBack />
      <ChatIcon />
      <Footer />
    </div>
  );
}

export default Teams;
