import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import { useNavigate } from 'react-router-dom';
import "../style/Teams.css";
import { useParams } from 'react-router-dom';

export default function SingleTeam() {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const [players, setPlayers] = useState(null);
    const [clubGames, setClubGames] = useState(null);
    const [currentView, setCurrentView] = useState('players'); // State to track current view

    const [gridDataPlayers, setGridDataPlayers] = useState({
        rows: [],
        columns: [
            { field: 'id', headerName: 'ID', width: 200 },
            { field: 'imageUrl', headerName: 'Image', width: 200 },
            { field: 'firstName', headerName: 'First Name', width: 200 },
            { field: 'lastName', headerName: 'Last Name', width: 200 },
            { field: 'countryOfBirth', headerName: 'Country of Birth', width: 200 },
            { field: 'dateOfBirth', headerName: 'DOB', width: 200 },
            { field: 'position', headerName: 'Position', width: 200 },
        ],
    });

    const [gridDataGames, setGridDataGames] = useState({
        rows: [],
        columns: [
            { field: 'game_id', headerName: 'ID', width: 200 },
            { field: 'opponent', headerName: 'Opponent', width: 200 },
            { field: 'own_goals', headerName: 'Own Goals', width: 200 },
            { field: 'opponent_goals', headerName: 'Opponent Goals', width: 200 },
        ],
    });

    const handleRowClickPlayers = (rowId, newState) => {
        const player = players.find((player) => player.playerId === rowId);
        navigate(`/player/${player.playerId}`);
    }

    const handleRowClickGames = (rowId, newState) => {
        const game = gridDataGames.rows.find(game => game.id === rowId);
        // console.log("GAME ID: ", game.game_id)
        if (game) {
            // console.log("Game ID: ", game.game_id);
            navigate(`/single-game/${game.id}`);
        } else {
            console.error("Game not found");
        }    }

    const getPlayers = (filter) => {
        const apiUrl = `http://localhost:3001/player/get-player-by-team?filter=${filter}`;
        axios.get(apiUrl)
            .then(response => {
                const newRows = response.data.map((player) => ({
                    id: player.playerId,
                    imageUrl: player.imageUrl,
                    firstName: player.firstName,
                    lastName: player.lastName,
                    countryOfBirth: player.countryOfBirth,
                    dateOfBirth: player.dateOfBirth,
                    position: player.position,
                }));
                setGridDataPlayers(prevGridData => ({
                    ...prevGridData,
                    rows: newRows,
                }));
                setPlayers(response.data);
            })
            .catch(error => {
                console.error("Error fetching players: ", error);
            });
    }

    const getClubGames = (clubId) => {
        const clubGamesApiUrl = `http://localhost:3000/get-club-games-by-id/${clubId}`;
        axios.get(clubGamesApiUrl)
            .then(response => {
                const newRows = response.data.map((game) => ({
                    id: game.game_id,
                    opponent: game.opponent_id,
                    own_goals: game.own_goals,
                    opponent_goals: game.opponent_goals,
                }));
                setGridDataGames(prevGridData => ({
                    ...prevGridData,
                    rows: newRows,
                }));
                setClubGames(response.data);
            })
            .catch(error => {
                console.error("Error fetching club games: ", error);
            });
    }

    useEffect(() => {
        getPlayers(clubId);
        getClubGames(clubId);
    }, [clubId]);

    const handleViewChange = (event) => {
        setCurrentView(event.target.value);
    };

    if (!players) {
        return (
            <div>
                <AppBarUser />
                Loading...
            </div>
        );
    }

    return (
        <div>
            <AppBarUser />
            <div>
                <h1>Team Name.....</h1>
                <Select
                    value={currentView}
                    onChange={handleViewChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="players">Players</MenuItem>
                    <MenuItem value="games">Games</MenuItem>
                </Select>
            </div>
            <div id="blockDetails">
                <div id="containerGridPlayer">
                    {currentView === 'players' ? (
                        <DataGridElement gridData={gridDataPlayers} onRowClick={handleRowClickPlayers} />
                    ) : (
                        <DataGridElement gridData={gridDataGames} onRowClick={(row) => handleRowClickGames(row)}/>
                    )}
                </div>
            </div>
        </div>
    );
}
