import React, {useEffect, useState} from "react";
import AppBarUser from "../components/atoms/AppBarUser";
import axios from "axios";
import DataGridElement from "../components/atoms/DataGrid";
import {useNavigate} from 'react-router-dom';

export default function Games() {
    const [setGames] = useState([]);
    const [error, setError] = useState(null);
    const pages = ['Home','Competitions','Teams', 'Games', ];
    const [gridData, setGridData] = useState({
        rows: [],
        columns: [
            {field: 'gameDate', headerName: 'Game Date', width: 150},
            {field: 'homeTeam', headerName: 'Home Team', width: 150},
            {field: 'aggregate', headerName: 'Aggregate', width: 150},
            {field: 'awayTeam', headerName: 'Away Team', width: 150},
            {field: 'game_id', headerName: 'Game ID', width: 150}
        ],
    });

    const handleGetAllGames = () => {
        axios.get("http://localhost:3001/games/get-games")
            .then((response) => {
                const sortedGames = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const newRows = sortedGames.map((game, index) => ({
                    id: index,
                    gameDate: new Date(game.date).toDateString(),
                    homeTeam: game.home_club_name,
                    aggregate: game.aggregate,
                    awayTeam: game.away_club_name,
                    game_id: game.game_id
                }));

                setGridData(prevGridData => ({
                    ...prevGridData,
                    rows: newRows,
                }));
                setError(null);
            })
            .catch((err) => {
                setError(err);
                setGames(null); // This might not be necessary if 'games' state is not used elsewhere
            });
    };

    const handleClick = (roww) => {
        // Find the game using the rowId
        const game = gridData.rows.find(row => row.id === roww);
        console.log("GAME ID: ", game.game_id)
        if (game) {
            console.log("Game ID: ", game.game_id);
            navigate(`/single-game/${game.game_id}`);
        } else {
            console.error("Game not found");
        }
    };

    const navigate = useNavigate();



    useEffect(() => {
        handleGetAllGames();
    }, []);

    return (
        <div>
            <AppBarUser pages={pages}/>
            <h1>Games</h1>
            <div id="containerData">
                <DataGridElement gridData={gridData} onRowClick={handleClick}/>
            </div>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
