import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import '../style/Single-Game.css';
import TopAppBar from '../components/atoms/TopAppBar';
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
    const links = [false, true, true, true, true, false, false, false];
    const navigate = useNavigate();

    const {gameId} = useParams();
    const [error, setError] = useState(null);
    const [playersAppearances, setPlayerAppearances] = useState(null);
    const [gameEvents, setGameEvents] = useState(null);

    const [game, setGame] = useState(null);
    const [view, setView] = useState(0);
    let clubAwayLogo = "";
    let clubHomeLogo = "";

    if (game) {
        clubAwayLogo = "https://tmssl.akamaized.net/images/wappen/head/" + game.away_club_id + ".png?";
        clubHomeLogo = "https://tmssl.akamaized.net/images/wappen/head/" + game.home_club_id + ".png?";
    }

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

        // Get game events
        gameService.getGameEventsById(gameId)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.minute - b.minute);
                setGameEvents(sortedData)
            })
            .catch((err) => {
                console.error('Error fetching game events:', err);
                setError(err);
            });


        playerService.getAppearancesByGameId(gameId)
            .then((response) => {
                setPlayerAppearances(response.data)

            })
            .catch((err) => {
                console.error("Error in receiving player appearances: ", err);
                alert(JSON.stringify(err));
            });


        gameService.getGameById(gameId)
            .then((response) => {
                setGame(response.data[0])
            })
            .catch((err) => {
                console.error('Error fetching game info:', err);
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

    function getPlayerNameById(playerId) {
        if (!playersAppearances) return "Loading player data";
        const player = playersAppearances.find(p => p.player_id === playerId);
        return player ? player.player_name : "Player not found";
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="teams-container">
            <div className="header-container">
                <TopAppBar links={links}  />
            </div>
            <div className="container-background-color">
                <div className="page-title-container">
                    <div className='page-header-club'>
                        <img src={clubHomeLogo} alt={game.home_club_name}/>
                        <h1 className="page-title">
                            {game.home_club_name}
                        </h1>
                    </div>
                    <div>
                        <h1>
                            | {game.aggregate} |
                        </h1>
                    </div>
                    <div className='page-header-club'>
                        <img src={clubAwayLogo} alt={game.away_club_name}/>
                        <h1 className='page-title'>
                            {game.away_club_name}
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
                            {gameEvents && gameEvents.map((event, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    date={`${event.minute}'`}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: 'yellow' }}
                                    icon={getEventIcon(event.type, event)}
                                >
                                    <h3 className="vertical-timeline-element-title">
                                        {event.type}
                                        <img
                                            src={event.club_id === game.away_club_id ? clubAwayLogo : clubHomeLogo}
                                            alt="Club Logo"
                                            style={{ width: '5%', marginLeft: '20px' }}
                                        />
                                    </h3>
                                    <p>
                                        {processDescription(event.description)}
                                    </p>
                                    <p onClick={() => navigate(`/player/${event.player_id}`)}>
                                        {getPlayerNameById(event.player_id)}
                                    </p>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>

                )}
                {view === 1 && (
                    <div className="game-info-card">
                        {/*<div className="info-details">*/}
                        {/*    {gameData.rows.map((player, index) => (*/}
                        {/*        <div key={index} className="player-card">*/}
                        {/*            <h2>{player.playerName}</h2>*/}
                        {/*            <p>Goals: {player.goals}</p>*/}
                        {/*            <p>Assists: {player.assists}</p>*/}
                        {/*            <p>Yellow Cards: {player.yellowCards}</p>*/}
                        {/*            <p>Red Cards: {player.redCards}</p>*/}
                        {/*            <p>Minutes Played: {player.minutesPlayed}</p>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default SingleGame;
