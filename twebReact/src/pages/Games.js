import React, {useEffect, useState} from "react";
import AppBarUser from "../components/atoms/AppBarUser";
import axios from "axios";
import DataGridElement from "../components/atoms/DataGrid";
import {useNavigate} from 'react-router-dom';
import TopAppBar from "../components/atoms/TopAppBar";
import {useAuth} from "../components/atoms/AuthContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../components/atoms/Footer";


export default function Games() {
    const [setGames] = useState([]);
    const [error, setError] = useState(null);
    const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
    const [filterCountry, setFilterCountry] = useState("All"); // return all country and set them for the filter
    const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
    const [arraySeason, setArraySeason] = useState([]); // return all country and set them for the filter

    const pages = ['Home', 'Competitions', 'Teams', 'Games',];
    const {checkCredentials} = useAuth();
    const links = [false, false, false, true, false, false, false, false, true, true];
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

    const handleFilterSeason = (event) => {
        setSeason(event.target.value);
    }
    const handleFilterCountry = (event) => {
        setFilterCountry(event.target.value);
    }


    useEffect(() => {
        handleGetAllGames();
    }, []);

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
                    <h1 className="page-title">Games</h1>
                </div>

                <div className="filters-container">
                    <h3 className="filter-title">Season:</h3>
                    <Select
                        className="season-select"
                        value={filterSeason}
                        onChange={handleFilterSeason}
                    >
                        {arraySeason.map((season) => (
                            <MenuItem key={season} value={season}>
                                {season}
                            </MenuItem>
                        ))}
                    </Select>
                    <h3 className="filter-title">Country:</h3>
                    <Select
                        className="country-select"
                        value={filterCountry}
                        onChange={handleFilterCountry}
                    >
                        {arrayCountry.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="data-grid-container">
                    <DataGridElement gridData={gridData} onRowClick={handleClick}/>
                </div>
            </div>
            <Footer/>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
