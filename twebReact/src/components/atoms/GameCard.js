import React from 'react';
import { useNavigate } from 'react-router-dom';


const GameCard = ({ game }) => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/single-game/${game.game_id}`);
    };

    return (
        <div
            style={{ border: '1px solid black', margin: '10px', padding: '10px', cursor: 'pointer' }}
            onClick={handleClick}
        >
            <h2>{game.home_club_name} vs {game.away_club_name}</h2>
        </div>
    );
};

export default GameCard;
