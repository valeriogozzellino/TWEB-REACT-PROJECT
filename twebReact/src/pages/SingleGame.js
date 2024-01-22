import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import '../style/Single-Game.css';
import AppBarUser from '../components/atoms/AppBarUser';
import TopAppBar from '../components/atoms/TopAppBar';
import {useAuth} from '../components/atoms/AuthContext';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {GiCardPlay} from 'react-icons/gi';
import {AiOutlineSwap} from 'react-icons/ai';
import Footer from '../components/atoms/Footer';
import {VerticalTimeline, VerticalTimelineElement,} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import * as gameService from '../services/singleGameService';
import * as playerService from '../services/playerService';


const SingleGame = () => {
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [error, setError] = useState(null);
    const pages = ['Home', 'Competitions', 'Teams', 'Games'];
    const [players, setPlayers] = useState(null);
    const [playersAppearances, setPlayerAppearances] = useState(null);
    const {checkCredentials} = useAuth();
    const links = [false, false, false, true, false, false, false, false, true, true];
    const navigate = useNavigate();
    const [view, setView] = useState(0);
    const [player, setPlayer] = useState(null);
    const playerId = "";
    let clubAwayLogo = "";
    let clubHomeLogo = "";
    if (gameInfo) {
        clubAwayLogo = "https://tmssl.akamaized.net/images/wappen/head/" + gameInfo.away_club_id + ".png?";
        clubHomeLogo = "https://tmssl.akamaized.net/images/wappen/head/" + gameInfo.home_club_id + ".png?";
    }

    const [gameData, setGameData] = useState({
        rows: [],
        columns: [
            {field: 'minute', headerName: 'Minute', width: 130},
            {field: 'eventType', headerName: 'Event Type', width: 130},
            {field: 'player', headerName: 'Player', width: 200},
            {field: 'club_id', headerName: 'Club Id', width: 200},
            {field: 'description', headerName: 'Event description', width: 200},
        ],
    });


    function getEventIcon(eventType, event) {
        // console.log("+++ EVENT:", event)
        switch (eventType) {
            case 'Goals':
                return <SportsSoccerIcon/>;
            case 'Cards':
                return <GiCardPlay/>;
            case 'Substitutions':
                return <AiOutlineSwap/>;
            default:
                return null;
        }
    }

    useEffect(() => {
        // Get game events
        gameService.getGameEventsById(gameId)
            .then((response) => {
                console.log("+++++EVENTS: ", response.data);

                const sortedData = response.data.sort((a, b) => a.minute - b.minute);

                const newRows = sortedData.map((event, index) => ({
                    id: index,
                    minute: event.minute,
                    eventType: event.type,
                    player: event.player_id,
                    club_id: event.club_id,
                    description: event.description
                }));

                // Get the game infos
                gameService.getGameById(gameId)
                    .then((response) => {
                        // console.log('++++++GAME INFOS: ', response.data);
                        setGameInfo(response.data[0]);
                    })
                    .catch((err) => {
                        console.error('Error fetching game info:', err);
                        setError(err);
                    });

                // Get player appearances data
                playerService.getAppearancesByGameId(gameId)
                    .then((response) => {
                        // console.log("++++ PLAYER APPEARANCES: ", response.data);

                        // Create a mapping of player_id to player appearance data
                        const playerAppearanceMap = {};
                        response.data.forEach((appearance) => {
                            playerAppearanceMap[appearance.player_id] = appearance;
                        });

                        // Merge player appearances into the newRows array
                        const rowsWithPlayerData = newRows.map((row) => {
                            const playerAppearance = playerAppearanceMap[row.player];
                            return {
                                ...row,
                                playerName: playerAppearance ? playerAppearance.player_name : "Unknown",
                                yellowCards: playerAppearance ? playerAppearance.yellow_cards : 0,
                                redCards: playerAppearance ? playerAppearance.red_cards : 0,
                                goals: playerAppearance ? playerAppearance.goals : 0,
                                assists: playerAppearance ? playerAppearance.assists : 0,
                                minutesPlayed: playerAppearance ? playerAppearance.minutes_played : 0,
                            };
                        });

                        // Set the updated rows with player data
                        setGameData((prevState) => ({
                            ...prevState,
                            rows: rowsWithPlayerData,
                        }));

                        console.log("+++ GAME DATA: ", gameData);
                    })
                    .catch((err) => {
                        console.error("Error in receiving player appearances: ", err);
                        alert(JSON.stringify(err));
                    });
            })
            .catch((err) => {
                console.error('Error fetching game events:', err);
                setError(err);
            });
    }, [gameId]);

    const processDescription = (description)  => {
        if (description.includes(',')) {
            let parts = description.split(',');
            return parts[1];
        } else {
            return description.trim();
        }
    };


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
                <div className="page-title-container">
                    <div className='page-header-club'>
                        <img src={clubHomeLogo} alt={gameInfo.home_club_name}/>
                        <h1 className="page-title">
                            {gameInfo.home_club_name}
                        </h1>
                    </div>
                    <div>
                        <h1>
                            | {gameInfo.aggregate} |
                        </h1>
                    </div>
                    <div className='page-header-club'>
                        <img src={clubAwayLogo} alt={gameInfo.away_club_name}/>
                        <h1 className='page-title'>
                            {gameInfo.away_club_name}
                        </h1>
                    </div>
                </div>
                <Box sx={{
                    borderBottom: 2,
                    borderColor: 'divider',
                    marginBottom: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Tabs aria-label="basic tabs example">
                        <Tab label="Timeline" id="tabOne" onClick={handleChangeTab}/>
                        <Tab label="Players" id="tabTwo" onClick={handleChangeTab}/>
                    </Tabs>
                </Box>

                {view === 0 && (
                    <div>
                        <VerticalTimeline>
                            {gameData.rows.map((event, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    date={`${event.minute}'`}
                                    iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                                    icon={getEventIcon(event.eventType, event)}
                                >
                                    <h3 className="vertical-timeline-element-title">
                                        {event.eventType}
                                        <img
                                            src={event.club_id === gameInfo.away_club_id ? clubAwayLogo : clubHomeLogo}
                                            alt="Club Logo"
                                            style={{width: '5%', marginLeft: '20px'}}
                                        />
                                    </h3>
                                    <p>
                                        {processDescription(event.description)}
                                    </p>
                                    <p onClick={() => navigate(`/player/${event.player}`)}>
                                        {event.playerName}
                                    </p>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                )}
                {view === 1 && (
                    <div className="game-info-card">
                        <div className="info-details">
                            {gameData.rows.map((player, index) => (
                                <div key={index} className="player-card">
                                    <h2>{player.playerName}</h2>
                                    <p>Goals: {player.goals}</p>
                                    <p>Assists: {player.assists}</p>
                                    <p>Yellow Cards: {player.yellowCards}</p>
                                    <p>Red Cards: {player.redCards}</p>
                                    <p>Minutes Played: {player.minutesPlayed}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default SingleGame;
