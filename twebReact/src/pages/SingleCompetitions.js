import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Teams.css';
import { useParams } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import '../style/Single-Team.css';
import Footer from '../components/Footer';
import '../style/global.css';
import CardElement from '../components/atoms/card/CardElement';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';

export default function SingleCompetitions() {
  const links = [true, true, true];
  const { competitionId } = useParams();
  const logoCompetition =
    'https://tmssl.akamaized.net/images/logo/header/' +
    competitionId.toLocaleLowerCase() +
    '.png?';
  const [clubs, setClubs] = useState([]);
  const [competition, setCompetition] = useState(null);

  const getClub = (competitionId) => {
    const filterCompetition = competitionId;
    const competitionApiUrl = `http://localhost:3001/teams/get-teams-by-competition?filterCompetition=${filterCompetition}`;
    axios
      .get(competitionApiUrl)
      .then((response) => {
        const newRows = response.data.map((clubs) => ({
          id: clubs.clubId,
          name: clubs.name,
          squadSize: clubs.squadSize,
          stadiumName: clubs.stadiumName,
          stadiumSeats: clubs.stadiumSeats,
        }));

        setClubs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching club games: ', error);
      });
  };

  const getInfoCompetition = (competitionId) => {
    const apiUrl = `http://localhost:3001/competitions/get-competitions-by-id?competitionId=${competitionId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setCompetition(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getClub(competitionId);
    getInfoCompetition(competitionId);
  }, [competitionId]);

  if (!clubs) {
    return (
      <div>
        <TopAppBar links={links} />
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div>
        <TopAppBar links={links} />
      </div>
      <div className="container-background-color" id="block-single-competition">
        <div className="team-header">
          <div id="title-box">
            <img
              src={logoCompetition}
              alt="Competition"
              style={{ width: '100px', height: '150px', margin: '10px' }}
            />
            <h1>
              {competition ? competition.name.toUpperCase() : 'Loading...'}
            </h1>
          </div>
        </div>

        <div className="data-card-container">
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
      <ArrowBack />
      <ChatIcon />
      <Footer />
    </div>
  );
}
