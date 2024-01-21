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
import CalendarElement from "../components/atoms/CalendarElement";
import GameCard from "../components/atoms/GameCard";

export default function Games() {
    const [error, setError] = useState(null);
    const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
    const [filterCountry, setFilterCountry] = useState("All"); // return all country and set them for the filter
    const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
    const [games, setGames] = useState([]); // return all country and set them for the filter
    const [allGames, setAllGames] = useState([]); // return all country and set them for the filter
    const [gameDates, setGameDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(false);
    const pages = ['Home', 'Competitions', 'Teams', 'Games',];
    const {checkCredentials} = useAuth();
    const links = [false, false, false, true, false, false, false, false, true, true];
    // const [gridData, setGridData] = useState({
    //     rows: [],
    //     columns: [
    //         {field: 'gameDate', headerName: 'Game Date', width: 150},
    //         {field: 'homeTeam', headerName: 'Home Team', width: 150},
    //         {field: 'aggregate', headerName: 'Aggregate', width: 150},
    //         {field: 'awayTeam', headerName: 'Away Team', width: 150},
    //         {field: 'game_id', headerName: 'Game ID', width: 150}
    //     ],
    // });

    const handleGetAllGames = () => {
        axios.get("http://localhost:3001/games/get-games")
            .then((response) => {
                const sortedGames = response.data
                    .filter(game => game.date && game.home_club_name && game.away_club_name && game.aggregate != null && game.game_id)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                const newRows = sortedGames.map((game, index) => ({
                    id: index,
                    gameDate: new Date(game.date).toDateString(),
                    homeTeam: game.home_club_name,
                    aggregate: game.aggregate,
                    awayTeam: game.away_club_name,
                    game_id: game.game_id
                }));
                const gameDates = sortedGames.map(game => new Date(game.date).toDateString());
                setGameDates(gameDates);
                console.log("GAME sortedGames: ", sortedGames);
                setAllGames(sortedGames);
                // setGridData(prevGridData => ({
                //     ...prevGridData,
                //     rows: newRows,
                // }));
                setError(null);
            })
            .catch((err) => {
                setError(err);
            });
    };

    // const handleClick = (roww) => {
    //     // Find the game using the rowId
    //     // const game = gridData.rows.find(row => row.id === roww);
    //     console.log("GAME ID: ", game.game_id)
    //     if (game) {
    //         console.log("Game ID: ", game.game_id);
    //         navigate(`/single-game/${game.game_id}`);
    //     } else {
    //         console.error("Game not found");
    //     }
    // };
    
    const handleDateClick = (date) => {
         const formattedDate = new Date(date).toDateString(); // Formatta la data in modo da confrontarla correttamente
        const gamesOnDate = allGames.filter(game => new Date(game.date).toDateString() === formattedDate);
        setGames(gamesOnDate);
        console.log("GAMES: ", gamesOnDate);
        setSelectedDate(true);
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
                <div className="data-grid-container">
                    <h3 className="page-subtitle">Select a date to see more details</h3>
                    <CalendarElement gameDates={gameDates} onDateClick={handleDateClick}/>
                    {/* <DataGridElement gridData={gridData} onRowClick={handleClick}/> */}
                </div>
                <div id="container-game-date">

                    {selectedDate && games.length > 0 && (
                        games.map((game, index) => (
                            <div key={index} >
                               <GameCard game={game} imageurl1={"https://tmssl.akamaized.net/images/wappen/head/" + game.home_club_id + ".png?"} imageurl2={"https://tmssl.akamaized.net/images/wappen/head/" + game.away_club_id + ".png?"}/>
                            </div>
                        ))    
                    )}
                </div>
            </div>
            <Footer/>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
