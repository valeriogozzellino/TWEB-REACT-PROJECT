// import React, {useEffect, useState} from 'react';
// import {useNavigate, useParams} from 'react-router-dom';
// import axios from 'axios';
// import "../style/Single-Game.css";
// import AppBarUser from "../components/atoms/AppBarUser";
// import TopAppBar from "../components/atoms/TopAppBar";
// import {useAuth} from "../components/atoms/AuthContext";
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import {GiCardPlay} from 'react-icons/gi';
// import {AiOutlineSwap} from 'react-icons/ai';
// import Footer from "../components/atoms/Footer";
//
// import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
//
// const SingleGame = () => {
//     const {gameId} = useParams();
//     const [gameInfo, setGameInfo] = useState(null);
//     const [error, setError] = useState(null);
//     const pages = ['Home', 'Competitions', 'Teams', 'Games'];
//     const [players, setPlayers] = useState(null);
//     const {checkCredentials} = useAuth();
//     const links = [false, false, false, true, false, false, false, false, true, true];
//     const navigate = useNavigate();
//
//     const [gameData, setGameData] = useState({
//         rows: [],
//         columns: [
//             {field: 'minute', headerName: 'Minute', width: 130},
//             {field: 'eventType', headerName: 'Event Type', width: 130},
//             {field: 'player', headerName: 'Player', width: 200},
//         ]
//     });
//
//
//     const handleRowClickPlayers = (rowId, newState) => {
//         console.log("Game data", gameData)
//         const player = gameData.rows.find(player => player.id === rowId)
//         navigate(`/player/${player.player}`);
//     }
//
//     function getEventIcon(eventType) {
//         switch (eventType) {
//             case 'Goals':
//                 return <SportsSoccerIcon/>;
//             case 'Cards':
//                 return <GiCardPlay/>;
//             case 'Substitutions':
//                 return <AiOutlineSwap/>;
//             default:
//                 return null;
//         }
//     }
//
//     useEffect(() => {
//         // Fetch game events
//         axios.get(`http://localhost:3001/single-game/get-game-events-by-id/${gameId}`)
//             .then(response => {
//                 const sortedData = response.data.sort((a, b) => a.minute - b.minute);
//                 const newRows = sortedData.map((event, index) => ({
//                     id: index,
//                     minute: event.minute,
//                     eventType: event.type,
//                     player: event.player_id
//                 }));
//                 setGameData(prevState => ({
//                     ...prevState,
//                     rows: newRows
//                 }));
//                 console.log("++++SET PLAYERS: ", response.data)
//                 setPlayers(response.data);
//             })
//             .catch(err => {
//                 console.error('Error fetching game events:', err);
//                 setError(err);
//             });
//
//         axios.get(`http://localhost:3001/single-game/get-game-by-id/${gameId}`)
//             .then(response => {
//                 console.log("++++++SET GAME INFOS: ", response.data)
//                 setGameInfo(response.data[0]);
//             })
//             .catch(err => {
//                 console.error('Error fetching game info:', err);
//                 setError(err);
//             });
//
//     }, [gameId]);
//
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }
//
//     if (!gameData || !gameInfo) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className="teams-container">
//             <div className="header-container">
//                 {checkCredentials ? (
//                     <AppBarUser pages={pages}/>
//                 ) : (
//
//                     <TopAppBar links={links} pages={pages}/>
//                 )}
//             </div>
//             <div className="container-background-color">
//                 <div id="container-title">
//                     <h1 className="page-title">Single Game</h1>
//                     <div className="game-info-card">
//                         <div className="club-names">
//                             <p>{gameInfo.home_club_name} VS {gameInfo.away_club_name}</p>
//                         </div>
//                         <div className="info-details">
//                             <p>Aggregate: {gameInfo.aggregate}</p>
//                             <p>Date: {gameInfo.date}</p>
//                             <p>Stadium: {gameInfo.stadium}</p>
//                         </div>
//                     </div>
//                 </div>
//
//
//
//                 <div className="timeline-container">
//                     <VerticalTimeline>
//                         {gameData.rows.map((event, index) => (
//                             <VerticalTimelineElement
//                                 key={index}
//                                 date={`${event.minute}'`}
//                                 iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
//                                 icon={getEventIcon(event.eventType)}
//
//                             >
//                                 <h3 className="vertical-timeline-element-title">{event.eventType}</h3>
//                                 <p onClick={() => navigate(`/player/${event.player}`)}>
//                                     Player ID: {event.player}
//                                 </p>
//                             </VerticalTimelineElement>
//                         ))}
//                     </VerticalTimeline>
//
//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     );
// };
//
// export default SingleGame;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/Single-Game.css';
import AppBarUser from '../components/atoms/AppBarUser';
import TopAppBar from '../components/atoms/TopAppBar';
import { useAuth } from '../components/atoms/AuthContext';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { GiCardPlay } from 'react-icons/gi';
import { AiOutlineSwap } from 'react-icons/ai';
import Footer from '../components/atoms/Footer';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";



const SingleGame = () => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [error, setError] = useState(null);
    const pages = ['Home', 'Competitions', 'Teams', 'Games'];
    const [players, setPlayers] = useState(null);
    const { checkCredentials } = useAuth();
    const links = [false, false, false, true, false, false, false, false, true, true];
    const navigate = useNavigate();
    const [view, setView] = useState(0);
    const [gameData, setGameData] = useState({
        rows: [],
        columns: [
            { field: 'minute', headerName: 'Minute', width: 130 },
            { field: 'eventType', headerName: 'Event Type', width: 130 },
            { field: 'player', headerName: 'Player', width: 200 },
        ],
    });

    const handleRowClickPlayers = (rowId, newState) => {
        const player = gameData.rows.find((player) => player.id === rowId);
        navigate(`/player/${player.player}`);
    };

    function getEventIcon(eventType) {
        switch (eventType) {
            case 'Goals':
                return <SportsSoccerIcon />;
            case 'Cards':
                return <GiCardPlay />;
            case 'Substitutions':
                return <AiOutlineSwap />;
            default:
                return null;
        }
    }

    useEffect(() => {
        // Fetch game events
        axios
            .get(`http://localhost:3001/single-game/get-game-events-by-id/${gameId}`)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.minute - b.minute);
                const newRows = sortedData.map((event, index) => ({
                    id: index,
                    minute: event.minute,
                    eventType: event.type,
                    player: event.player_id,
                }));
                setGameData((prevState) => ({
                    ...prevState,
                    rows: newRows,
                }));
                console.log('++++SET PLAYERS: ', response.data);
                setPlayers(response.data);
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

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChangeTab = (e) => {
        console.log("PLAYERS:", players)
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
                    <AppBarUser pages={pages} />
                ) : (
                    <TopAppBar links={links} pages={pages} />
                )}
            </div>
            <div className="container-background-color">
                <div id="container-title">

                    <div className="club-names">
                        <p>
                            {gameInfo.home_club_name} VS {gameInfo.away_club_name}
                        </p>
                    </div>
                </div>
                <Box sx={{borderBottom: 2, borderColor: 'divider', marginBottom: '5px'}}>
                    <Tabs aria-label="basic tabs example">
                        <Tab label="Timeline" id="tabOne" onClick={handleChangeTab}/>
                        <Tab label="Infos" id="tabTwo" onClick={handleChangeTab}/>
                    </Tabs>
                </Box>

                {view === 0 && (
                    <div>
                        <VerticalTimeline>
                            {gameData.rows.map((event, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    date={`${event.minute}'`}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    icon={getEventIcon(event.eventType)}
                                >
                                    <h3 className="vertical-timeline-element-title">{event.eventType}</h3>
                                    <p onClick={() => navigate(`/player/${event.player}`)}>
                                        Player ID: {event.player}
                                    </p>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                )}
                {view === 1 && (
                    <div className="game-info-card">
                        <div className="info-details">
                            <p>Aggregate: {gameInfo.aggregate}</p>
                            <p>Date: {gameInfo.date}</p>
                            <p>Stadium: {gameInfo.stadium}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SingleGame;
