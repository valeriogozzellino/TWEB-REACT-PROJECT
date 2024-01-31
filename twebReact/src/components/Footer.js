import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import CallIcon from '@mui/icons-material/Call';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/material';
import '../style/Footer.css';

/**
 * Footer Component:
 *
 * Provides a footer for the website with social media links and copyright information.
 *
 * Behavior:
 * - Displays social media icons and links.
 * - Shows copyright information.
 *
 * @returns {JSX.Element} The JSX for the Footer component.
 */

export default function Footer() {
  return (
    <div id="container-footer">
      <Box id="container-icon">
        <WhatsAppIcon />
        <InstagramIcon />
        <TelegramIcon />
        <CallIcon />
        <LinkedInIcon />
      </Box>
      <div className="text-center p-3" style={{ height: '150px' }}>
        © {new Date().getFullYear()} Copyright:
        <a className="text-white" href="/">
          FootGoal.com
        </a>
        <p> Valerio Gozzellino - Alessandro Mao </p>
        <p>Email: info@footgoal.com</p>
        <p>Indirizzo: Via del Calcio, 12345, Città del Calcio</p>
      </div>
    </div>
  );
}
