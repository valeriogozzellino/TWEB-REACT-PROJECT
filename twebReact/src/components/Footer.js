import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import CallIcon from '@mui/icons-material/Call';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/material';
import '../style/Footer.css';
export default function App() {
  return (
    <div id="container-footer">
      <Box id="container-icon">
        <WhatsAppIcon />
        <InstagramIcon />
        <TelegramIcon />
        <CallIcon />
        <LinkedInIcon />
      </Box>
      <div className="text-center p-3" style={{ height: '90px' }}>
        © 2020 Copyright:
        <a className="text-white" href="#">
          FootGoal.com
        </a>
        <p> Valerio Gozzellino - Alessandro Mao </p>
      </div>
    </div>
  );
}
