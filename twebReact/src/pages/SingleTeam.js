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
    const [currentView, setCurrentView] = useState('players');
    const {checkCredentials} = useAuth();
    const [showGames, setShowGames] = useState(6);
    const [showPlayer, setShowPlayer] = useState(12);


    const handleNumberPlayer = (param) => {
        if (param === 1) {
            setShowPlayer(showPlayer + 6);
        } else {
            if (showPlayer === 6) return;
            setShowPlayer(showPlayer - 6); // Ensure showPlayer is never less than 1
        }
    };

    const getPlayers = (filter) => {
        const apiUrl = `http://localhost:3001/player/get-player-by-team?filter=${filter}`;
        axios.get(apiUrl)
            .then(response => {
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
    }, [clubId, showPlayer]);


    const handleNumberGame = (number) => {
        if (number === 1) {
            if (showGames === 6) return;
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

    const handleChangeTab = (event, newValue) => {
        setView(newValue);
    };

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

    function handlePlayerClick(player) {
        console.log("++PLAYER: ", player)
        navigate(`/player/${player.playerId}`);
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
                    <div className="team-infos">
                        <p><strong>Stadium:</strong> {team ? team.stadiumName : 'Loading...'}</p>
                        <p><strong>Stadium Seats:</strong> {team ? team.stadiumSeats : 'Loading...'}</p>
                        <p><strong>Transfer Record:</strong> {team ? team.netTransferRecord : 'Loading...'}</p>
                    </div>
                </div>
                <div id="middle-container">

                    <Box sx={{borderBottom: 2, borderColor: 'divider', marginBottom: '5px'}}>
                        <Tabs value={view} aria-label="basic tabs example" onChange={handleChangeTab}>
                            <Tab label="Players" value={0} />
                            <Tab label="Games" value={1} />
                        </Tabs>
                    </Box>

                    {view === 0 ? (
                        <div>
                            <div id="players-card">

                                {players.slice(0, showPlayer).map((player) => (
                                    <Tooltip title={player.position} key={player.playerId}>
                                        <div onClick={() => handlePlayerClick(player)}>
                                            <CardPlayers Id={player.playerId} image={player.imageUrl} firstName={player.firstName} lastName={player.lastName} position={player.subPosition}/>
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

                        <div>
                            <div id="games-card">
                                {clubGames.slice(0, showGames).map((game) => (
                                    <div onClick={() => handleGameClick(game)} key={game.game_id}>
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
                                </Button>
                            </div>

                        </div>
                    ) : (
                        <div className="football-field">
                            {/* Remove this  */}
                        </div>
                    )}
                </div>
                <ChatIcon/>
            </div>
            <Footer/>
        </div>
    );
}
