import * as React from 'react';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
/**
 * ArrowBackCircle Component:
 *
 * Provides a button for navigating back to the previous page.
 *
 * Behavior:
 * - On button click, navigates the user back to the previous page in the browser's history.
 *
 * @returns {JSX.Element} The JSX for the ArrowBackCircle button.
 */

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
