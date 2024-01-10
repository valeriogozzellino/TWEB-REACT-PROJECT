import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DataGridElement from "../components/atoms/DataGrid";
import "../style/Single-Game.css";
import AppBarUser from "../components/atoms/AppBarUser";

const SingleGame = () => {
    const {gameId} = useParams();
    const [gameData, setGameData] = useState([]);
    const [gameInfo, setGameInfo] = useState(null);
    const [error, setError] = useState(null);
    const links = [true, false, false, false, false, false, true, true];
    const pages = ['News', 'Ranking', 'Teams', 'Player', 'Games', 'Competitions'];
    // const { checkCredentials } = useAuth();
    // Define columns for your game events data grid
    const columns = [
        {field: 'minute', headerName: 'Minute', width: 130},
        {field: 'eventType', headerName: 'Event Type', width: 130},
        {field: 'player', headerName: 'Player Name', width: 200},
    ];

    useEffect(() => {
        // Fetch game events
        axios.get(`http://localhost:3001/single-game/get-game-events-by-id/${gameId}`)
            .then(response => {
                const sortedData = response.data.sort((a, b) => a.minute - b.minute);
                const newRows = sortedData.map((event, index) => ({
                    id: index,
                    minute: event.minute,
                    eventType: event.type,
                    player: event.player_id
                }));
                setGameData(newRows);
            })
            .catch(err => {
                console.error('Error fetching game events:', err);
                setError(err);
            });

        axios.get(`http://localhost:3001/single-game/get-game-by-id/${gameId}`)
            .then(response => {
                setGameInfo(response.data[0]);
            })
            .catch(err => {
                console.error('Error fetching game info:', err);
                setError(err);
            });
    }, [gameId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!gameData || !gameInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AppBarUser pages={pages}/>
            <div className="game-header">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1>{gameInfo.home_club_name} vs {gameInfo.away_club_name}</h1>
                    <div className="game-details">
                        <p>Date: {new Date(gameInfo.date).toLocaleDateString()}</p>
                        <p>Competition: {gameInfo.competition_id}</p>
                        <p>Score: {gameInfo.home_club_goals} - {gameInfo.away_club_goals}</p>
                        <p>Round: {gameInfo.round}</p>
                        <p>Time: {new Date(gameInfo.date).toLocaleTimeString()}</p>
                        <p>Stadium: {gameInfo.stadium} | Attendance: {gameInfo.attendance}</p>
                        <p>Referee: {gameInfo.referee}</p>
                    </div>
                </div>

            </div>
            <div id="containerData">
                <DataGridElement gridData={{rows: gameData, columns: columns}}/>
            </div>
        </div>
    );
};

export default SingleGame;
