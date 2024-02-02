import React from 'react';
import { Card } from '@nextui-org/react';
import '../../../style/global.css';

/**
 *
 * @param {} param0
 * @returns
 */
export default function CardAppearance({ playerAppearances, showAppearances }) {
  return (
    <div id="event-card">
      {playerAppearances.slice(0, showAppearances).map((appearance, index) => (
        <div key={index} style={{ overflow: 'hidden' }}>
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
            <div>
              {/* Qui puoi aggiungere una logica per calcolare una metrica di performance, ad esempio: */}
              {/* Performance Score: {calcolaScore(appearance)}% */}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
