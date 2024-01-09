// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import DataGridElement from "../components/atoms/DataGrid";
//
// const SingleGame = () => {
//     const { gameId } = useParams();
//     const [gameData, setGameData] = useState([]);
//     const [gameInfo, setGameInfo] = useState(null);
//     const [error, setError] = useState(null);
//
//     // Define columns for your game events data grid
//     const columns = [
//         { field: 'minute', headerName: 'Minute', width: 130 },
//         { field: 'eventType', headerName: 'Event Type', width: 130 },
//         { field: 'player', headerName: 'Player Name', width: 200 },
//     ];
//
//     useEffect(() => {
//         // Fetch game events
//         axios.get(`http://localhost:3001/single-game/get-game-events-by-id/${gameId}`)
//             .then(response => {
//                 const sortedData = response.data.sort((a, b) => a.minute - b.minute);
//                 const newRows = sortedData.map((event, index) => ({
//                     id: index,
//                     minute: event.minute,
//                     eventType: event.type,
//                     player: event.player_id
//                 }));
//                 setGameData(newRows);
//             })
//             .catch(err => {
//                 console.error('Error fetching game events:', err);
//                 setError(err);
//             });
//
//         // Fetch game information
//         axios.get(`http://localhost:3001/single-game/get-game-by-id/${gameId}`)
//             .then(response => {
//                 setGameInfo(response.data);
//                 console.log("GAME INFO: ", gameInfo)
//             })
//             .catch(err => {
//                 console.error('Error fetching game info:', err);
//                 setError(err);
//             });
//     }, [gameId]);
//
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }
//
//     if (!gameData) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div>
//             <h1>Game</h1>
//             {gameInfo && (
//                 <div>
//                     <p>Date: {new Date(gameInfo[0].date).toDateString()}</p>
//                     <p>Game: {gameInfo[0].home_club_name} vs {gameInfo[0].away_club_name}</p>
//                     <p>Result: {gameInfo[0].aggregate}</p>
//                     <p>Referee: {gameInfo[0].referee}</p>
//                     <p>Stadium: {gameInfo[0].stadium} | Attendance: {gameInfo[0].attendance}</p>
//                     <p>Season: {gameInfo[0].season}</p>
//                     <p>More Infos --&gt; <a href={gameInfo[0].url} target="_blank" rel="noopener noreferrer">{gameInfo[0].url}</a></p>
//
//                 </div>
//             )}
//             <DataGridElement gridData={{ rows: gameData, columns: columns }} />
//         </div>
//     );
// }
//
// export default SingleGame;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataGridElement from "../components/atoms/DataGrid";
import { useAuth } from '../components/atoms/AuthContext';
import AppBarUser from "../components/atoms/AppBarUser";
import TopAppBar from "../components/atoms/TopAppBar";
const SingleGame = () => {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState([]);
    const [gameInfo, setGameInfo] = useState(null);
    const [error, setError] = useState(null);
    const links = [true, false, false, false, false, false, true, true];
    const pages = ['News', 'Ranking', 'Teams', 'Player', 'Games', 'Competitions'];
    const { checkCredentials } = useAuth();
    // Define columns for your game events data grid
    const columns = [
        { field: 'minute', headerName: 'Minute', width: 130 },
        { field: 'eventType', headerName: 'Event Type', width: 130 },
        { field: 'player', headerName: 'Player Name', width: 200 },
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

        // Fetch game information
        axios.get(`http://localhost:3001/single-game/get-game-by-id/${gameId}`)
            .then(response => {
                setGameInfo(response.data[0]); // Assuming the response is an array and we're interested in the first item
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
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
                {checkCredentials ? (
                    <AppBarUser  pages={pages} />
                ) : (     
                    <TopAppBar links={links} pages={pages} />
                )}
                <div style={{ textAlign: 'center' }}>
                    <p>{gameInfo.home_club_name}</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p>{gameInfo.competition_id}</p>
                    <p>{new Date(gameInfo.date).toLocaleDateString()}</p>
                    <p>{gameInfo.home_club_goals} : {gameInfo.away_club_goals}</p>
                    <p>{gameInfo.round} | {new Date(gameInfo.date).toLocaleTimeString()}</p>
                    <p>{gameInfo.stadium} | Attendance: {gameInfo.attendance}</p>
                    <p>Referee: {gameInfo.referee}</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p>{gameInfo.away_club_name}</p>
                </div>
            </div>
            <div id="containerData">
                <DataGridElement gridData={{ rows: gameData, columns: columns }} />
            </div>
        </div>
    );
};

export default SingleGame;
