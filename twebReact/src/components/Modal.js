import React from 'react';
import '../style/Single-Game.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

/**
 * Modal Component:
 *
 * Provides a modal dialog for displaying content.
 *
 * Behavior:
 * - Displays the provided content in a modal format.
 * - Includes a button to navigate to a player's page based on the provided player_id.
 *
 * @param {boolean} open Indicates if the modal is open.
 * @param {JSX.Element} children The content to display inside the modal.
 * @param {number} player_id The ID of the player for the navigation button.
 * @returns {JSX.Element} The JSX for the Modal component.
 */

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
