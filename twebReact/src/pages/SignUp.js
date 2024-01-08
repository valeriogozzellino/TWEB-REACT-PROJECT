import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import SensorOccupiedTwoToneIcon from '@mui/icons-material/SensorOccupiedTwoTone';

function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    annoDiNascita: '',
    fotoProfilo: null,
    paeseDiProvenienza: '',
    email: '',
    password: '',
    squadraCalcioPreferita: '',
    giocatorePreferito: ''
  });
  const [clubs, setClubs] = useState([]);
  const steps = ['Informazioni Personali', 'Preferenze Calcistiche', 'Credenziali'];

  
  const handleNext = (e) => {
    // Chiamare handleChange solo quando si preme "Avanti" o "Iscriviti"
    handleChange(e);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log('Updating form data 2:', e.target.name, e.target.value);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getTeamsByCountry = (filterCountry, filterSeason) => {
    console.log("filterCountry and filterSeason");
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
  useEffect(() => {
    getTeamsByCountry("All", 0);
  }, []);
  const handleChange = (e) => {
    // Settare i parametri del formData solo quando si preme "Avanti" o "Iscriviti"
    console.log('Updating form data:', e.target.name, e.target.value);
    if (activeStep === 0) {
      console.log(formData);
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      
    } else if (activeStep === 1) {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      
    } else if (activeStep === 2) {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, fotoProfilo: event.target.files[0] });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const StepContent = ({ step }) => {
    switch (step) {
      case 0:
        return (
          <>
            <Container sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange}   margin="normal" />
               </Grid>
              <Grid item xs={6}>
                <TextField label="Cognome" name="cognome"  value={formData.cognome} onChange={handleChange}  fullWidth margin="normal" />
              </Grid>
              <Grid item xs={8}>
                <TextField label="Anno di Nascita" name="annoDiNascita" value={formData.annoDiNascita} onChange={handleChange}  type='date' fullWidth margin="normal" />
              </Grid>
              <Grid item xs={8}>
                <TextField label="Paese di Provenienza" name="paeseDiProvenienza"  value={formData.paeseDiProvenienza} onChange={handleChange} fullWidth margin="normal" />
              </Grid>
            </Grid>
              <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />  
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Container>
          </>
        );
      case 1:
        return (
          <>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%' }}>  
               <Autocomplete
                disablePortal
                options={clubs.map((club) => club.name)} // Mappare solo i nomi dei club
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Favourite Team" name="squadraCalcioPreferita"  value={formData.squadraCalcioPreferita} onChange={handleChange} fullWidth margin="normal" />}
              />
            <TextField label="Giocatore Preferito" name="giocatorePreferito" value={formData.giocatorePreferito} onChange={handleChange} fullWidth margin="normal" />
            </Container>
            
          </>
        );
      case 2:
        return (
          <>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
              
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
            </Container>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Container sx={{ alignItems: 'center', display: 'flex', flexDirection:'column', alignItems:'stretch' }}>
        <Container sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SensorOccupiedTwoToneIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Container>        
          <Stepper sx={{ marginTop:'20px'}} activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
            ))}
          </Stepper>        
      </Container>
      <div>
        
        {activeStep === steps.length ? (
          <div>
            <p>Tutte le informazioni sono state inserite. Puoi procedere con l'iscrizione.</p>
            <Button onClick={handleBack}>Indietro</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Iscriviti</Button>
          </div>
        ) : (
          <div>
            <StepContent step={activeStep} />
              <div>
                <Container sx={{ display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>Indietro</Button>
                  <Button variant="contained" color="primary" onClick={(e) => handleNext(e)}>{activeStep === steps.length - 1 ? 'Iscriviti' : 'Avanti'}</Button>
                </Container>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
