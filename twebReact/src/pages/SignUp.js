import React, { useEffect, useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { useAuth } from '../components/atoms/AuthContext';
import { Login, PhotoCamera } from '@mui/icons-material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import SensorOccupiedTwoToneIcon from '@mui/icons-material/SensorOccupiedTwoTone';
import '../style/SignUp.css';
import imagePlayers from '../Images/messiVSRonaldo.jpeg';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const { setUser, user } = useAuth();
  const [nome, setNome] = useState(null);
  const [surname, setSurname] = useState('');
  const [annoDiNascita, setAnnoDiNascita] = useState('');
  const [paeseDiProvenienza, setPaeseDiProvenienza] = useState('');
  const [squadraCalcioPreferita, setSquadraCalcioPreferita] = useState('');
  const [giocatorePreferito, setGiocatorePreferito] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clubs, setClubs] = useState([]);
  const [players, setPlayers] = useState([]);
  const uniquePlayerNames = new Set();

  // Filter out players with the same name

  const steps = [
    'Informazioni Personali',
    'Preferenze Calcistiche',
    'Credenziali',
  ];
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getTeams = (filterCountry, filterSeason) => {
    console.log('filterCountry and filterSeason');
    console.log(filterSeason, filterCountry);
    const apiUrl = `http://localhost:3001/teams/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
  const getPlayers = () => {
    const apiUrl = `http://localhost:3001/player/get-all-players`;
    axios
      .get(apiUrl)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  const filteredPlayers = players.filter((player) => {
    if (!uniquePlayerNames.has(player.name)) {
      uniquePlayerNames.add(player.name);
      return true;
    }
    return false;
  });

  useEffect(() => {
    getTeams('All', 0);
    getPlayers();
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    switch (name) {
      case 'nome':
        setNome(value);
        break;
      case 'surname':
        setSurname(value);
        break;
      case 'annoDiNascita':
        setAnnoDiNascita(value);
        break;
      case 'paeseDiProvenienza':
        setPaeseDiProvenienza(value);
        break;
      case 'squadraCalcioPreferita':
        setSquadraCalcioPreferita(value);
        break;
      case 'giocatorePreferito':
        setGiocatorePreferito(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    //insert image
  };

  const handleSubmit = () => {
    const data = {
      firstName: nome,
      lastName: surname,
      dateOfBirth: annoDiNascita,
      countryOfBirth: paeseDiProvenienza,
      favouriteClub: squadraCalcioPreferita,
      favouritePlayer: giocatorePreferito,
      email: email,
      password: password,
    };
    console.log(data);
    axios
      .post('http://localhost:3001/users/sign-up', data)
      .then((response) => {
        alert('Utente registrato con successo');
        setUser(data);
        navigate('/');
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  return (
    <div id="containerSignUp">
      <div id="containerForm">
        <Container
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <SensorOccupiedTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
          </Container>
        </Container>
        {activeStep === 0 ? (
          <div id="containerLabel">
            <h3>Informazioni Personali</h3>

            <Grid sx={{ marginLeft: '10px' }} xs={6}>
              <TextField
                label="Nome"
                name="nome"
                value={nome}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label="Surname"
                name="surname"
                value={surname}
                onChange={handleInputChange}
                fullWidth
                margin="surname"
              />
            </Grid>
            <Grid xs={8}>
              <TextField
                label="Anno di Nascita"
                name="annoDiNascita"
                value={annoDiNascita}
                onChange={handleInputChange}
                type="date"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid sx={{ margin: '5px' }} xs={6}>
              <TextField
                label="Paese di Provenienza"
                name="paeseDiProvenienza"
                value={paeseDiProvenienza}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </div>
        ) : activeStep === 1 ? (
          <div id="containerFavourite">
            <h3>Preferenze Calcistiche</h3>

            <Grid xs={8}>
              <Autocomplete
                id="combo-box-demo"
                nome="squadraCalcioPreferita"
                options={clubs}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Squadra di Calcio Preferita" />
                )}
              />
            </Grid>
            <Grid sx={{ marginTop: '15px' }} xs={8}>
              <Autocomplete
                id="combo-box-demo"
                nome="giocatorePreferito"
                options={filteredPlayers}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) =>
                  option.playerId === value.playerId
                } // Specifica come confrontare gli oggetti
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Giocatore Preferito" />
                )}
              />
            </Grid>
          </div>
        ) : (
          <div id="contaninerCredentials">
            <h3>Credenziali</h3>
            <Grid xs={8}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid xs={8}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </div>
        )}
        <div id="containerButton">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mt: 3, ml: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            sx={{ mt: 3, ml: 1 }}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
        <Link to="/logIn" variant="body2">
          {'Do you already have an account? Log In'}
        </Link>
      </div>
      <div id="containerImage">
        <img
          src={imagePlayers}
          alt="Messi vs Ronaldo"
          style={{
            width: '100%',
            height: '535px',
            borderRadius: '10px',
            boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
    </div>
  );
}

export default SignUp;
