import React from 'react';
import { Card } from '@nextui-org/react';
import '../../../style/global.css';
import { useNavigate } from 'react-router-dom';

/**
 * CardPlayers Component:
 *
 * This component is used for displaying a card for each player, providing a brief overview
 * of their information. It's designed to be visually appealing and interactive, allowing users
 * to navigate to a detailed view of the player's profile.
 *
 * Props:
 *  @param {number} Id - Unique identifier for the player.
 *  @param {string} firstName - The player's first name.
 *  @param {string} lastName - The player's last name.
 *  @param {string} position - The player's position in the team.
 *  @param {string} image - URL of the player's image or avatar.
 *
 * Behavior:
 *  - The card is styled with a dark background, a hover effect, and it's clickable.
 *  - Clicking the card navigates the user to a route with detailed information about that specific player.
 *  - The card displays the player's image, name, and position, with predefined styles for dimensions, alignment, and appearance.
 *
 * @returns {JSX.Element} A styled card component displaying the player's image, name, and position with click-to-navigate functionality.
 */
export default function CardPlayers({
  Id,
  firstName,
  lastName,
  position,
  image,
}) {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/player/${Id}`);
  };

  return (
    <div
      className="gap-2 grid grid-cols-2 sm:grid-cols-4"
      style={{ overflow: 'hidden' }}
    >
      <Card
        key={Id}
        hoverable
        clickable
        shadow="sm"
        className="w-full circle-card card-hover-effect" // Add the CSS class here
        style={{
          borderColor: 'rgb(254, 254, 254)',
          border: '1px solid',
          width: '350px',
          height: '100px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          background: '#1a1a2e',
          borderRadius: '10px',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onPress={() => handleClickCard()}
      >
        <img
          src={image}
          alt={`${firstName} ${lastName} ${position}`}
          width="40px"
          height="40px"
          style={{ borderRadius: '50%', margin: '5px' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            color: 'white',
            paddingLeft: '10px',
          }}
        >
          <b>
            {firstName} {lastName}
            <br />
            {position}
          </b>
        </div>
      </Card>
    </div>
  );
}
