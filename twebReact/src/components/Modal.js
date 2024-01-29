import React from 'react';
import '../style/Single-Game.css';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Modal({ open, children, player_id }) {
  const navigate = useNavigate();
  function handlePlayerClick(player_id) {
    navigate(`/player/${player_id}`);
  }

  if (!open) return null;

  return (
    <div
      style={{ border: '1px solid', borderColor: 'white', borderRadius: '5px' }}
    >
      {children}
      <Button
        style={{
          border: '1px solid',
          borderColor: 'white',
          borderRadius: '5px',
        }}
        onClick={() => handlePlayerClick(player_id)}
      >
        {' '}
        Vai alla pagina del giocatore{' '}
      </Button>
    </div>
  );
}
