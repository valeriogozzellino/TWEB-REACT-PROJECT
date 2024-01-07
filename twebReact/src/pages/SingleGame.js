import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataGridElement from "../components/atoms/DataGrid"; // Adjust the path as needed

const SingleGame = () => {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState([]);
    const [error, setError] = useState(null);

    // Define columns for your game events data grid
    const columns = [
        { field: 'minute', headerName: 'Minute', width: 130 },
        { field: 'eventType', headerName: 'Event Type', width: 130 },
        { field: 'player', headerName: 'Player Name', width: 200 },
    ];

    useEffect(() => {
        axios.get(`http://localhost:3001/single-game/get-game-events-by-id/${gameId}`)
            .then(response => {
                // Sort response data by 'minute' field
                const sortedData = response.data.sort((a, b) => a.minute - b.minute);
                const newRows = sortedData.map((event, index) => ({
                    id: index,
                    minute: event.minute,
                    eventType: event.type,
                    player: event.player_id
                }));
                setGameData(newRows);
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
            <h1>Game Events</h1>
            <DataGridElement gridData={{ rows: gameData, columns: columns, }} />
        </div>
    );
}

export default SingleGame;
