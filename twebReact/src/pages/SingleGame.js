import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import DataGridElement from "../components/atoms/DataGrid";
import "../style/Single-Game.css";
import AppBarUser from "../components/atoms/AppBarUser";
import TopAppBar from "../components/atoms/TopAppBar";
import {useAuth} from "../components/atoms/AuthContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../components/atoms/Footer";

const SingleGame = () => {
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [error, setError] = useState(null);
    const pages = ['Home', 'Competitions', 'Teams', 'Games'];
    const [players, setPlayers] = useState(null);
    const {checkCredentials} = useAuth();
    const links = [false, false, false, true, false, false, false, false, true, true];
    // const { checkCredentials } = useAuth();
    const navigate = useNavigate();

    const [gameData, setGameData] = useState({
        rows: [],
        columns: [
            {field: 'minute', headerName: 'Minute', width: 130},
            {field: 'eventType', headerName: 'Event Type', width: 130},
            {field: 'player', headerName: 'Player', width: 200},
        ]
    });


    const handleRowClickPlayers = (rowId, newState) => {
        console.log("Game data", gameData)
        const player = gameData.rows.find(player => player.id === rowId)
        navigate(`/player/${player.player}`);
    }

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
                setGameData(prevState => ({
                    ...prevState,
                    rows: newRows
                }));
                setPlayers(response.data);
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
        <div className="teams-container">
            <div className="header-container">
                {checkCredentials ? (
                    <AppBarUser pages={pages}/>
                ) : (

                    <TopAppBar links={links} pages={pages}/>
                )}
            </div>
            <div className="container-background-color">
                <div id="container-title">
                    <h1 className="page-title">Single Game</h1>
                </div>

                <div className="data-grid-container">
                    <DataGridElement gridData={gameData} onRowClick={handleRowClickPlayers}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SingleGame;
