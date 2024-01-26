import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';

export default function ArrowBackCircle() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <Box sx={{ position: 'fixed', top: 86, left: 16 }}>
      {/* <SpeedDial
                ariaLabel="Arrow Back"
                icon={<ArrowBackIcon />} // ArrowBack icon
                onClick={handleBack}
            >
                <SpeedDialAction
                    icon={<ArrowBackIcon />}
                    tooltipTitle="Back"
                    onClick={handleBack}
                />
            </SpeedDial> */}
      <Button size="sm" onClick={handleBack}>
        <ArrowBackIcon />
        Back
      </Button>
    </Box>
  );
}
