import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GameEventCard from "../components/atoms/GameEventCard"; // Make sure this path is correct

const SingleGame = () => {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/single-game/get-game-by-id/${gameId}`)
            .then(response => {
                setGameData(response.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching game data:', err);
                setError(err);
            });
    }, [gameId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!gameData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Game ID: {gameId}</h1>
            {gameData.map(event => (
                <GameEventCard key={event.game_event_id} event={event} />
            ))}
        </div>
    );
}

export default SingleGame;
