import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import { useNavigate } from 'react-router-dom';
import "../style/Teams.css";
import { useParams } from 'react-router-dom';
import TopAppBar from "../components/atoms/TopAppBar";
import { useAuth } from '../components/atoms/AuthContext';
import "../style/Single-Team.css";
import Footer from "../components/atoms/Footer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GameCard from "../components/atoms/GameCard";
import Button from '@mui/material/Button';


const CustomImageCell = ({ value }) => (
  <img src={value} alt="Player" style={{ width: '40px', height: '40px' }} />
);

export default function SingleTeam() {
    const links = [false, false, false, false, false, false, true, false, true , true];
    const pages = ['News', 'Ranking', 'Teams', 'Player', 'Games', 'Competitions'];
    const navigate = useNavigate();
    const { clubId } = useParams();
    const logo = "https://tmssl.akamaized.net/images/wappen/head/" + clubId + ".png?";
    const [view, setView] = useState(0);
    const [players, setPlayers] = useState(null);
    const [clubGames, setClubGames] = useState(null);
    const [team, setTeam] = useState(null);
    const [currentView, setCurrentView] = useState('players'); // State to track current view
    const { checkCredentials } = useAuth();
    const [showGames, setShowGames] = useState(10);
    const [gridDataPlayers, setGridDataPlayers] = useState({
        rows: [],
        columns: [
            { field: 'id', headerName: 'ID', width: 200 },
            { field: 'imageUrl', headerName: 'Image', width: 200, renderCell: (params) => <CustomImageCell value={params.value} />, },
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
        const clubGamesApiUrl = `http://localhost:3001/games/get-club-games-by-id/${clubId}`;
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
                console.log("Club Games: ", response.data);
            })
            .catch(error => {
                console.error("Error fetching club games: ", error);
            });
    }


    const getTeamById = (clubId) => {
        axios.get(`http://localhost:3001/single-team/get-team-by-id/${clubId}`)
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                console.error("Error fetching team: ", error);
            });
    };

    useEffect(() => {
        getPlayers(clubId);
        getClubGames(clubId);
        getTeamById(clubId);
    }, [clubId]);

    const handleViewChange = (event) => {
        setCurrentView(event.target.value);
    };

    if (!players) {
        return (
            <div>
                {checkCredentials ? (
                    <AppBarUser   pages={pages}/>
                ) : (     
                    <TopAppBar links={links} pages={pages} />
                )}
                Loading...
            </div>
        );
    }

    const handleChangeTab = (e) => {
        const id = e.target.id;
        switch (id) {
            case 'tabOne':
                setView(0);
                //called funzioction
                break;
            case 'tabTwo':
                setView(1);
                break;
            case 'tabThree':
                setView(2);
                break;
            default:
                break;
        }
    }
    
    return (
    <div>
        <div id="container">
            
        {checkCredentials ? (
                <AppBarUser pages={pages}/>
            ) : (     
                <TopAppBar links={links} pages={pages} />
            )}
        <div className="team-header">
            <div id="title-box">
                <img src={logo} alt="Team" style={{ width: '80px', height: '100px', margin:'10px' }} />    
                <h1>{team ? team.name : 'Loading...'}</h1>
            </div>
        
            <div className="team-stats">
                <p>Stadium: {team ? team.stadiumName : 'Loading...'} </p>
                <p>Stadium Seats: {team ? team.stadiumSeats : 'Loading...'} </p>
                <p>Transfer Record: {team ? team.netTransferRecord : 'Loading...'} </p>
            </div>
        </div>
        <div id="middle-container" >
        
            <Box sx={{ borderBottom: 2, borderColor: 'divider', marginBottom:'5px'}}>
            <Tabs  aria-label="basic tabs example">
                <Tab label="PLayer" id="tabOne" onClick={handleChangeTab} />
                <Tab label="Game Of the team" id="tabTwo" onClick={handleChangeTab}/>
                <Tab label="Players in the field" id="tabThree" onClick={handleChangeTab} />
            </Tabs>
            </Box>
        
            {view === 0 ? (
                <div className="data-grid-container">
                    <DataGridElement gridData={gridDataPlayers} onRowClick={handleRowClickPlayers} />
                </div>
            ) : view === 1 ? (
             <div className="game-info">                
                {clubGames.slice(0, showGames).map((game) => (
                    <GameCard game={game} />
                ))}
                <button onClick={() => setShowGames(showGames - 10)}>Show Less</button>
                <Button variant="contained" size="large">
                    Large
                </Button>                
                <button onClick={() => setShowGames(showGames + 10)}>Show More</button>    
            </div>
            ):(
                    <div className="player-info">
                        <h2>Position: </h2>
                        <h3>Inserire la formazioen</h3>
                    </div>
            )}
        </div>
        </div>
        <Footer/>    
    </div>
);
}
