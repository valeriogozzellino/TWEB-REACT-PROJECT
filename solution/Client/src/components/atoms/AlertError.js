import * as React from 'react';
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';
export default function AlertError({ message }) {
  return (
    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
      {message}
    </Alert>
  );
}
