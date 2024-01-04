import React from 'react';

const GameEventCard = ({ event }) => {
    return (
        <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Minute:</strong> {event.minute}</p>
            <p><strong>Club ID:</strong> {event.club_id}</p>
            {event.player_id && <p><strong>Player ID:</strong> {event.player_id}</p>}
            {event.player_in_id && <p><strong>Player In ID:</strong> {event.player_in_id}</p>}
            {event.description && <p><strong>Description:</strong> {event.description}</p>}
        </div>
    );
};

export default GameEventCard;
