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
import Box from '@mui/material/Box';
import * as gameService from '../services/singleGameService';
import * as playerService from '../services/playerService';
import Modal from '../components/Modal';
import ArrowBack from "../components/atoms/ArrowBack";

const SingleGame = () => {
    const links = [false, true, true, true, true, false, false, false];
    const navigate = useNavigate();

    const {gameId} = useParams();
    const [error, setError] = useState(null);
    const [playersAppearances, setPlayerAppearances] = useState(null);
    const [gameEvents, setGameEvents] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalPlayerId, setOpenModalPlayerId] = useState(null);

    const [game, setGame] = useState(null);
    const [view, setView] = useState(0);
    let clubAwayLogo = '';
    let clubHomeLogo = '';

    if (game) {
        clubAwayLogo =
            'https://tmssl.akamaized.net/images/wappen/head/' +
            game.away_club_id +
            '.png?';
        clubHomeLogo =
            'https://tmssl.akamaized.net/images/wappen/head/' +
            game.home_club_id +
            '.png?';
    }

    const [openDropdownId, setOpenDropdownId] = useState(null);

    const handleModalClick = (playerId) => {
        if (openModalPlayerId === playerId) {
            setOpenModalPlayerId(null); // Close the modal if it's already open for this player
        } else {
            setOpenModalPlayerId(playerId); // Open this player's modal
        }
    };

    const isModalOpenForPlayer = (playerId) => {
        return openModalPlayerId === playerId;
    };

    const handleModalClose = () => {
        setOpenModalPlayerId(null); // Reset the modal open state
        // setIsModalOpen(false);
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
        // Get game events
        gameService
            .getGameEventsById(gameId)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.minute - b.minute);
                setGameEvents(sortedData);
            })
            .catch((err) => {
                setError(err);
            });

        playerService
            .getAppearancesByGameId(gameId)
            .then((response) => {
                setPlayerAppearances(response.data);
            })
            .catch((err) => {
                alert(JSON.stringify(err));
            });

        gameService
            .getGameById(gameId)
            .then((response) => {
                setGame(response.data[0]);
            })
            .catch((err) => {
                setError(err);
            });
    }, [gameId]);

    const processDescription = (description) => {
        if (description !== undefined) {
            if (description.includes(',')) {
                let parts = description.split(',');
                return parts[1];
            } else {
                return description.trim();
            }
        }
        return '';
    };

    const handleChangeTab = (event, newValue) => {
        setView(newValue);
    };

    const renderGoalsIcons = (goals) => {
        let result = '';
        for (let i = 0; i < goals; i++) {
            result += '⚽ ';
        }
        result += ' ';
        return result;
    };

    function handlePlayerClick(player) {
        navigate(`/player/${player.player_id}`);
    }

    function getPlayerNameById(playerId) {
        if (!playersAppearances) return 'Loading player data';
        const player = playersAppearances.find((p) => p.player_id === playerId);
        return player ? player.player_name : 'Player not found';
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
                <TopAppBar links={links}/>
            </div>
            <div className="container-background-color">
                <div className="page-title-container">
                    <div className="page-header-club">
                        <img src={clubHomeLogo} alt={game.home_club_name}/>
                        <h1 className="page-title">{game.home_club_name}</h1>
                    </div>
                    <div>
                        <h1>| {game.aggregate} |</h1>
                    </div>
                    <div className="page-header-club">
                        <img src={clubAwayLogo} alt={game.away_club_name}/>
                        <h1 className="page-title">{game.away_club_name}</h1>
                    </div>
                </div>

                <div id="buttons">
                    <Box
                        sx={{
                            borderBottom: 2,
                            borderColor: 'divider',
                            marginBottom: '5px',
                        }}
                    >
                        <Tabs
                            value={view}
                            aria-label="basic tabs example"
                            onChange={handleChangeTab}
                        >
                            <Tab label="Timeline" value={0}/>
                            <Tab label="Players" value={1}/>
                        </Tabs>
                    </Box>
                </div>
            </div>

            <div className="middle-container-background-color">
                {view === 0 ? (
                    <div>
                        <VerticalTimeline>
                            {gameEvents &&
                                gameEvents.map((event, index) => (
                                    <VerticalTimelineElement
                                        key={index}
                                        date={`${event.minute}'`}
                                        iconStyle={{
                                            background: 'rgb(33, 150, 243)',
                                            color: 'yellow',
                                        }}
                                        style={{color: 'black'}}
                                        icon={getEventIcon(event.type, event)}
                                    >
                                        <h3 className="vertical-timeline-element-title">
                                            {event.type}
                                            <img
                                                src={
                                                    event.club_id === game.away_club_id
                                                        ? clubAwayLogo
                                                        : clubHomeLogo
                                                }
                                                alt="Club Logo"
                                                style={{width: '5%', marginLeft: '20px'}}
                                            />
                                        </h3>
                                        <p>{processDescription(event.description)}</p>
                                        <p onClick={() => navigate(`/player/${event.player_id}`)}>
                                            {getPlayerNameById(event.player_id)}
                                        </p>
                                    </VerticalTimelineElement>
                                ))}
                        </VerticalTimeline>
                    </div>
                ) : view === 1 ? (

                    <div className="game-info-container">
                        <div className="team-left">
                            {playersAppearances
                                .filter((player) => player.player_club_id === game.home_club_id)
                                .map((player) => (
                                    <div key={player.player_id}>
                                        <button
                                            className="dropdown-button"
                                            onClick={() => handleModalClick(player.player_id)}
                                        >
                                            {renderGoalsIcons(player.goals)}
                                            {player.assists > 0 && '🅰️  '}
                                            {player.yellow_cards === 1 && '🟡   '}
                                            {(player.yellow_cards > 1 || player.red_cards > 0) &&
                                                '🔴   '}
                                            {player.player_name}
                                        </button>
                                        <Modal
                                            player_id={player.player_id}
                                            open={isModalOpenForPlayer(player.player_id)}
                                            onClose={() => handleModalClose}
                                        >
                                            <div className="column">
                                                Yellow Cards: {player.yellow_cards}
                                                <br/>
                                                Red Cards: {player.red_cards}
                                            </div>
                                            <div className="column">
                                                Goals: {player.goals}
                                                <br/>
                                                Assists: {player.assists}
                                            </div>
                                            <div className="column">
                                                Minutes Played: {player.minutes_played}
                                            </div>
                                        </Modal>
                                    </div>
                                ))}
                        </div>


                        <div className="team-right">
                            {playersAppearances
                                .filter((player) => player.player_club_id !== game.home_club_id)
                                .map((player) => (
                                    <div key={player.player_id}>
                                        <button
                                            className="dropdown-button"
                                            onClick={() => handleModalClick(player.player_id)}
                                        >
                                            {renderGoalsIcons(player.goals)}
                                            {player.assists > 0 && '🅰️ '}
                                            {player.yellow_cards === 1 && '🟡   '}
                                            {(player.yellow_cards > 1 || player.red_cards > 0) &&
                                                '🔴   '}
                                            {player.player_name}
                                        </button>
                                        <Modal
                                            player_id={player.player_id}
                                            open={isModalOpenForPlayer(player.player_id)}
                                            onClose={() => handleModalClose}
                                        >
                                            <div className="column">
                                                Yellow Cards: {player.yellow_cards}
                                                <br/>
                                                Red Cards: {player.red_cards}
                                            </div>
                                            <div className="column">
                                                Goals: {player.goals}
                                                <br/>
                                                Assists: {player.assists}
                                            </div>
                                            <div className="column">
                                                Minutes Played: {player.minutes_played}
                                            </div>
                                        </Modal>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                <ArrowBack/>
                <Footer/>
            </div>
        </div>
    );
};

export default SingleGame;
