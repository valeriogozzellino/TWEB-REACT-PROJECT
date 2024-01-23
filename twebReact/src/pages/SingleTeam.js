import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import "../style/Teams.css";
import TopAppBar from "../components/atoms/TopAppBar";
import {useAuth} from '../components/atoms/AuthContext';
import "../style/Single-Team.css";
import Footer from "../components/atoms/Footer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GameCard from "../components/atoms/GameCard";
import Button from '@mui/material/Button';
import ChatIcon from "../components/atoms/ChatIcon";
import CardPlayers from "../components/CardPlayer";
import Tooltip from '@mui/material/Tooltip';



const CustomImageCell = ({value}) => (
    <img src={value} alt="Player" style={{width: '40px', height: '40px'}}/>
);

export default function SingleTeam() {
    const links = [false, true, true, true, true, false, false, false];
    const navigate = useNavigate();
    const {clubId} = useParams();
    const logo = "https://tmssl.akamaized.net/images/wappen/head/" + clubId + ".png?";
    const [view, setView] = useState(0);
    const [players, setPlayers] = useState(null);
    const [clubGames, setClubGames] = useState(null);
    const [team, setTeam] = useState(null);
    const [currentView, setCurrentView] = useState('players'); // State to track current view
    const {checkCredentials} = useAuth();
    const [showGames, setShowGames] = useState(6);
    const [showPlayer, setShowPlayer] = useState(12);



    const [gridDataPlayers, setGridDataPlayers] = useState({
        rows: [],
        columns: [
            {field: 'id', headerName: 'ID', width: 200},
            {
                field: 'imageUrl',
                headerName: 'Image',
                width: 200,
                renderCell: (params) => <CustomImageCell value={params.value}/>,
            },
            {field: 'firstName', headerName: 'First Name', width: 200},
            {field: 'lastName', headerName: 'Last Name', width: 200},
            {field: 'countryOfBirth', headerName: 'Country of Birth', width: 200},
            {field: 'dateOfBirth', headerName: 'DOB', width: 200},
            {field: 'position', headerName: 'Position', width: 200},
        ],
    });

    const [gridDataGames, setGridDataGames] = useState({
        rows: [],
        columns: [
            {field: 'game_id', headerName: 'ID', width: 200},
            {field: 'opponent', headerName: 'Opponent', width: 200},
            {field: 'own_goals', headerName: 'Own Goals', width: 200},
            {field: 'opponent_goals', headerName: 'Opponent Goals', width: 200},
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
        }
    }
    
    const handleNumberPlayer = (param) => {
        if (param === 1) {
            setShowPlayer(showPlayer + 6);
        } else {
            if(showPlayer === 6) return;
            setShowPlayer(showPlayer-6); // Ensure showPlayer is never less than 1
        }
    };

    const getPlayers = (filter) => {
        const apiUrl = `http://localhost:3001/player/get-player-by-team?filter=${filter}`;
        axios.get(apiUrl)
            .then(response => {
                const filteredPlayers = response.data.filter(player =>
                    player.playerId &&
                    player.imageUrl &&
                    player.firstName &&
                    player.lastName &&
                    player.countryOfBirth &&
                    player.dateOfBirth &&
                    player.position
                );

                const newRows = filteredPlayers.map((player) => ({
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
                setPlayers(filteredPlayers);
            })
            .catch(error => {
                console.error("Error fetching players: ", error);
            });
    }


    const getClubGames = (clubId) => {
        const clubGamesApiUrl = `http://localhost:3001/games/get-club-games-by-id/${clubId}`;
        axios.get(clubGamesApiUrl)
            .then(response => {
                
                setClubGames(response.data);
                console.log("Club Games: ", response.data);
            })
            .catch(error => {
                console.error("Error fetching club games: ", error);
            });
    }



    const getPositionClass = (subPosition, player) => {
        console.log("PLAYER: ", player.name, "pos: ", player.position, "sub: ", player.subPosition)
        // console.log("SUB POS: ", subPosition)
        switch (subPosition) {
            case "Goalkeeper":
                return "goalkeeper";
            case "Left-Back":
                return "left-back";
            case "Centre-Back":
                return Math.random() < 0.5 ? "center-back-left" : "center-back-right";
            case "Right-Back":
                return "right-back";
            case "Left Midfield":
                return "left-midfield";
            case "Central Midfield":
                return Math.random() < 0.5 ? "center-midfield-left" : "center-midfield-right";
            case "Right Midfield":
                return "right-midfield";
            case "Centre-Forward":
                return Math.random() < 0.5 ? "left-forward" : "right-forward";
            case "Defensive Midfield":
                return Math.random() < 0.5 ? "center-midfield-left" : "center-midfield-right";
            case "Attacking Midfield":
                return Math.random() < 0.5 ? "left-forward" : "right-forward";
            case "Right Winger":
                return "right-midfield";
            case "Left Winger":
                return "left-midfield";
            default:
                return "generic-position";
        }
    };



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
    }, [clubId, showPlayer]); // Include showPlayer as a dependency to trigger re-fetching when it changes


    const handleViewChange = (event) => {
        setCurrentView(event.target.value);
    };

    const handleNumberGame = (number) => {
        if (number === 1) {
            if(showGames === 6) return;
            setShowGames(showGames - 6);
        } else {
            setShowGames(showGames + 6);
        }        
    };

    if (!players) {
        return (
            <div>
            <TopAppBar links={links}/>
                Loading...
            </div>
        );
    }

    const handleChangeTab = (e) => {
        console.log("PLAYERS:", players)
        const id = e.target.id;
        switch (id) {
            case 'tabOne':
                setView(0);
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

    const getUniquePlayersByPosition = (players) => {
        const uniquePositions = new Set();
        return players.filter(player => {
            const isUnique = !uniquePositions.has(player.subPosition);
            uniquePositions.add(player.subPosition);
            return isUnique;
        });
    };

    function handleGameClick(game) {
        navigate(`/single-game/${game.game_id}`);
    }


    return (
        <div>
            <div id="container">
                    <TopAppBar links={links}/>
                <div className="team-header">
                    <div id="title-box">
                        <img src={logo} alt="Team" style={{width: '80px', height: '100px', margin: '10px'}}/>
                        <h1>{team ? team.name : 'Loading...'}</h1>
                    </div>
                    <div className="team-stats">
                        <p><strong>Stadium:</strong> {team ? team.stadiumName : 'Loading...'}</p>
                        <p><strong>Stadium Seats:</strong> {team ? team.stadiumSeats : 'Loading...'}</p>
                        <p><strong>Transfer Record:</strong> {team ? team.netTransferRecord : 'Loading...'}</p>
                    </div>
                </div>
                <div id="middle-container">

                    <Box sx={{borderBottom: 2, borderColor: 'divider', marginBottom: '5px'}}>
                        <Tabs aria-label="basic tabs example">
                            <Tab label="PLayers" id="tabOne" onClick={handleChangeTab}/>
                            <Tab label="Games" id="tabTwo" onClick={handleChangeTab}/>
                        </Tabs>
                    </Box>

                    {view === 0 ? (
                        <div className="singleTeam-data">
                            <div  id="container-card-player">

                            {players.slice(0, showPlayer).map((player) => (
                                <Tooltip title={player.position}>                                
                                <div className="data-card-container">
                                    <CardPlayers Id={player.playerId} image={player.imageUrl} firstName={player.lastName} />
                                </div>
                                </Tooltip>
                            ))}
                            </div>
                            <div id='button-end'>
                             <Button variant="outlined" size="medium" onClick={() => handleNumberPlayer(1)}
                                        sx={{marginRight: '21px'}}>
                                    Show More
                                </Button>
                                <Button variant="outlined" size="medium" onClick={() => handleNumberPlayer(0)}>
                                    Show Less
                                </Button>
                            </div>
                        </div>
                    ) : view === 1 ? (

                        <div className="game-info">
                            <div id="section-card">
                                {clubGames.slice(0, showGames).map((game) => (
                                    <div onClick={() => handleGameClick(game)} key={game}>
                                        <GameCard
                                            game={game}
                                            imageurl1={"https://tmssl.akamaized.net/images/wappen/head/" + clubId + ".png?"}
                                            imageurl2={"https://tmssl.akamaized.net/images/wappen/head/" + game.away_club_id + ".png?"}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div id='button-end'>
                                <Button variant="outlined" size="medium" onClick={() => handleNumberGame(1)}
                                        sx={{marginRight: '21px'}}>
                                    Show Less
                                </Button>
                                <Button variant="outlined" size="medium" onClick={() => handleNumberGame(0)}>
                                    Show More
                                </Button></div>
                        </div>

                    ) : (
                        <div className="football-field">
                            {getUniquePlayersByPosition(players).map(player => {
                                let positionClass = getPositionClass(player.subPosition, player);
                                return (
                                    <div key={player.playerId} className={`player-position ${positionClass}`}>
                                        {player.firstName} {player.lastName}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <ChatIcon/>
            </div>
            <Footer/>
        </div>
    );
}
