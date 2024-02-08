import React from 'react';
import { Card } from '@nextui-org/react';
import '../../../style/global.css';
import { useNavigate } from 'react-router-dom';
/**
 * CardAppearance Component:
 *
 * This component is used for displaying a set of cards, each representing a player's appearance in a game.
 * It's designed to present key statistics and information in an engaging and interactive manner, allowing
 * users to navigate to a detailed view of each game.
 *
 * Props:
 *  @param {Array} playerAppearances - Array of objects, each containing data about a player's appearance in a game.
 *  @param {number} showAppearances - The number of appearances to display.
 *
 *
 * @returns {JSX.Element} A series of styled cards, each displaying information about a player's game appearance.
 */
export default function CardAppearance({ playerAppearances, showAppearances }) {
  const navigate = useNavigate();
  return (
    <div id="event-card">
      {playerAppearances.slice(0, showAppearances).map((appearance, index) => (
        <div
          key={index}
          style={{ overflow: 'hidden' }}
          onClick={() => navigate(`/single-game/${appearance.game_id}`)}
        >
          <Card
            hoverable
            clickable
            shadow="sm"
            className="w-full circle-card card-hover-effect"
            style={{
              borderColor: 'rgb(254, 254, 254)',
              border: '1px solid',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
              background: '#1a1a2e',
              borderRadius: '10px',
              margin: '15px',
            }}
          >
            <h4>{appearance.date}</h4>
            <div>
              <p>⚽️ Goals: {appearance.goals}</p>
              <p>🅰️ Assists: {appearance.assists}</p>
              <p>🟨 Yellow Cards: {appearance.yellow_cards}</p>
              <p>🟥 Red Cards: {appearance.red_cards}</p>
              <p>Minutes Played: {appearance.minutes_played}</p>
            </div>
            <div></div>
          </Card>
        </div>
      ))}
    </div>
  );
}
