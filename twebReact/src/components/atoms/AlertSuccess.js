import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function AlertSuccess() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Utente registrato con successo
    </Alert>
  );
}
