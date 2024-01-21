import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
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


const SingleGame = () => {
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [error, setError] = useState(null);
    const pages = ['Home', 'Competitions', 'Teams', 'Games'];
    const [players, setPlayers] = useState(null);
    const {checkCredentials} = useAuth();
    const links = [false, false, false, true, false, false, false, false, true, true];
    const navigate = useNavigate();
    const [view, setView] = useState(0);
    const [player, setPlayer] = useState(null);
    const playerId = "";
    let clubAwayLogo = "";
    let clubHomeLogo = "";
    if (gameInfo) {   
        clubAwayLogo = "https://tmssl.akamaized.net/images/wappen/head/"+ gameInfo.away_club_id +".png?";
        clubHomeLogo = "https://tmssl.akamaized.net/images/wappen/head/" + gameInfo.home_club_id + ".png?";
    }
    
    const [gameData, setGameData] = useState({
        rows: [],
        columns: [
            {field: 'minute', headerName: 'Minute', width: 130},
            {field: 'eventType', headerName: 'Event Type', width: 130},
            {field: 'player', headerName: 'Player', width: 200},
        ],
    });

    const handleRowClickPlayers = (rowId, newState) => {
        const player = gameData.rows.find((player) => player.id === rowId);
        navigate(`/player/${player.player}`);
    };

    function getEventIcon(eventType) {
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
        // Fetch game events
        axios
            .get(`http://localhost:3001/single-game/get-game-events-by-id/${gameId}`)
            .then((response) => {
                console.log("+++++RESPONSE: ", response.data);
                const sortedData = response.data.sort((a, b) => a.minute - b.minute);
                const newRows = sortedData.map((event, index) => ({
                    id: index,
                    minute: event.minute,
                    eventType: event.type,
                    player: event.player_id,
                }));

                // Create an array to store promises for fetching player details
                const playerPromises = newRows.map((event) => {
                    // Fetch player details for each player_id
                    return axios.get(`http://localhost:3001/player/get-player-by-playerId?filter=${event.player}`);
                });

                // Wait for all player detail requests to complete
                Promise.all(playerPromises)
                    .then((playerResponses) => {
                        // Extract player names from the responses
                        const playerNames = playerResponses.map((playerResponse) => {
                            return playerResponse.data.name; // Adjust this based on the actual field in your response
                        });

                        // Update the rows with player names
                        const rowsWithPlayerNames = newRows.map((row, index) => ({
                            ...row,
                            playerName: playerNames[index], // Add a new field for player name
                        }));

                        // Set the updated rows with player names
                        setGameData((prevState) => ({
                            ...prevState,
                            rows: rowsWithPlayerNames,
                        }));

                        console.log("+++ GAME DATA: ", gameData)

                        console.log('++++SET PLAYERS: ', response.data);
                        setPlayers(response.data);
                        console.log("+++++PLAYERS: ", players);
                    })
                    .catch((err) => {
                        console.error('Error fetching player details:', err);
                        setError(err);
                    });
            })
            .catch((err) => {
                console.error('Error fetching game events:', err);
                setError(err);
            });

        axios
            .get(`http://localhost:3001/single-game/get-game-by-id/${gameId}`)
            .then((response) => {
                console.log('++++++SET GAME INFOS: ', response.data);
                setGameInfo(response.data[0]);
            })
            .catch((err) => {
                console.error('Error fetching game info:', err);
                setError(err);
            });
    }, [gameId]);


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
                        <img src={clubHomeLogo} alt={gameInfo.home_club_name} />
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
                        <img src={clubAwayLogo} alt={gameInfo.away_club_name} />
                        <h1 className='page-title'>
                            {gameInfo.away_club_name}
                        </h1>
                    </div>
                </div>
                <Box sx={{borderBottom: 2, borderColor: 'divider', marginBottom: '5px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <Tabs aria-label="basic tabs example">
                        <Tab label="Timeline" id="tabOne" onClick={handleChangeTab}/>
                        <Tab label="Home Team Lineup" id="tabTwo" onClick={handleChangeTab}/>
                        <Tab label="Away Team Lineup" id="tabTwo" onClick={handleChangeTab}/>
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
                                    icon={getEventIcon(event.eventType)}
                                >
                                    <h3 className="vertical-timeline-element-title">{event.eventType}</h3>
                                    <p onClick={() => navigate(`/player/${event.player}`)}>
                                        {event.playerName}
                                    </p>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                )}
                {view === 1 && (
                    // <div className="game-info-card">
                    //     <div className="info-details">
                    //         <p>Aggregate: {gameInfo.aggregate}</p>
                    //         <p>Date: {gameInfo.date}</p>
                    //         <p>Stadium: {gameInfo.stadium}</p>
                    //     </div>
                    // </div>
                    <div>Lineups here.. </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default SingleGame;
