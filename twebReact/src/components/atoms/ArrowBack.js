import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function ArrowBackCircle() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <Box
            sx={{position: 'fixed', top: 36, right: 16}}
        >
            <SpeedDial
                ariaLabel="Arrow Back"
                icon={<ArrowBackIcon />} // ArrowBack icon
                onClick={handleBack}
            >
                <SpeedDialAction
                    icon={<ArrowBackIcon />}
                    tooltipTitle="Back"
                    onClick={handleBack}
                />
            </SpeedDial>
        </Box>
    );
}
