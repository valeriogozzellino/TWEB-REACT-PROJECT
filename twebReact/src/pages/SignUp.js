import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function SubscriptionForm() {
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

  const steps = ['Informazioni Personali', 'Preferenze Calcistiche', 'Credenziali'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, fotoProfilo: event.target.files[0] });
  };

  const StepContent = ({ step }) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Cognome" name="cognome" value={formData.cognome} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Anno di Nascita" name="annoDiNascita" value={formData.annoDiNascita} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Paese di Provenienza" name="paeseDiProvenienza" value={formData.paeseDiProvenienza} onChange={handleChange} fullWidth margin="normal" />
            <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleFileChange} />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </>
        );
      case 1:
        return (
          <>
            <TextField label="Squadra di Calcio Preferita" name="squadraCalcioPreferita" value={formData.squadraCalcioPreferita} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Giocatore Preferito" name="giocatorePreferito" value={formData.giocatorePreferito} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 2:
        return (
          <>
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <p>Tutte le informazioni sono state inserite. Puoi procedere con l'iscrizione.</p>
            <Button onClick={handleBack}>Indietro</Button>
            <Button variant="contained" color="primary">Iscriviti</Button>
          </div>
        ) : (
          <div>
            <StepContent step={activeStep} />
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>Indietro</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Iscriviti' : 'Avanti'}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubscriptionForm;
