import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../components/AuthContext';
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
import HomeIcon from '@mui/icons-material/Home';
/**
 * SignUp Component:
 *
 * Provides a form for user registration. It collects personal information, football preferences,
 * and account credentials (email and password).
 *
 * Behavior:
 * - Consists of a multi-step form that guides the user through different sections of the registration process.
 * - Fetches a list of football teams and players for the user to select their favorites.
 * - Validates the user input and submits the data to a registration endpoint.
 *
 * @param {Function} handleLogIN Function to handle the login process after successful registration.
 * @returns {JSX.Element} The JSX for the SignUp page.
 */

function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const { setUser } = useAuth();
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
  const [isFocused, setIsFocused] = useState(false);

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
        console.error(error);
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
        console.error(error);
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

  const handleSubmit = () => {
    if (
      !nome ||
      !surname ||
      !annoDiNascita ||
      !paeseDiProvenienza ||
      !email ||
      !password
    ) {
      alert(
        'Compila tutti i campi obbligatori prima di procedere con la registrazione.'
      );
      return; // Non procedere con la registrazione se i campi obbligatori sono vuoti
    }
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
        console.error(error);
      });
  };

  return (
    <div id="containerSignUp">
      <div id="containerForm">
        <div style={{ width: '100%' }}>
          <Button onClick={() => navigate('/')}>
            <HomeIcon />
          </Button>
        </div>
        <Container
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
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
            <Typography component="h1" variant="h4">
              Sign Up
            </Typography>
          </Container>
        </Container>
        {activeStep === 0 ? (
          <div id="containerLabel">
            <h6>Informazioni Personali</h6>

            <Grid sx={{ marginLeft: '10px' }} xs={9}>
              <TextField
                required
                label="Nome"
                name="nome"
                fullWidth
                value={nome}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                required
                label="Surname"
                name="surname"
                value={surname}
                onChange={handleInputChange}
                fullWidth
                margin="surname"
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                required
                label={isFocused || annoDiNascita ? 'Anno di Nascita' : ''}
                name="annoDiNascita"
                value={annoDiNascita}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
              />
              <TextField
                required
                label="Paese di Provenienza"
                name="paeseDiProvenienza"
                value={paeseDiProvenienza}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
          </div>
        ) : activeStep === 1 ? (
          <div id="containerFavourite">
            <h6>Preferenze Calcistiche</h6>

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
            <h6>Credenziali</h6>
            <Grid xs={9}>
              <TextField
                required
                label="Email"
                fullWidth
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                required
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
