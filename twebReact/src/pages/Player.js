import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import DataGridElement from '../components/DataGrid';
import TopAppBar from '../components/TopAppBar';
import '../style/Player.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as playerService from '../services/playerService';

export default function Player() {
    const {player_Id} = useParams();
    const [player, setPlayer] = useState(null);
    const [playerAppearances, setPlayerAppearances] = useState([]);
    const links = [true, true, true];
    const [view, setView] = useState(0);
    const columns = [
        {field: 'date', headerName: 'Date', width: 20},
        {field: 'competition_id', headerName: 'Competition', width: 20},
        {field: 'yellow_cards', headerName: 'Yellow Cards', width: 130},
        {field: 'red_cards', headerName: 'Red Cards', width: 130},
        {field: 'goals', headerName: 'Goals', width: 130},
        {field: 'assists', headerName: 'Assists', width: 130},
        {field: 'minutes_played', headerName: 'Minutes Played', width: 130},
    ];

    useEffect(() => {

        playerService
            .getPlayerByPlayerId(player_Id)
            .then((response) => {
                setPlayer(response.data);
            })
            .catch((response) => {
                alert(JSON.stringify(response));
            });

        playerService
            .getAppearancesByPlayerId(player_Id)
            .then((response) => {
                const appearancesData = response.data.map((appearance, index) => ({
                    id: index,
                    date: new Date(appearance.date).toDateString(),
                    competition_id: appearance.competition_id,
                    yellow_cards: appearance.yellow_cards,
                    red_cards: appearance.red_cards,
                    goals: appearance.goals,
                    assists: appearance.assists,
                    minutes_played: appearance.minutes_played,
                }));
                setPlayerAppearances(appearancesData);
            })
            .catch((response) => {
                alert(JSON.stringify(response));
            });

    }, [player_Id]);

    const handleChangeTab = (e) => {
        const id = e.target.id;
        switch (id) {
            case 'tabOne':
                setView(0);
                break;
            case 'tabTwo':
                setView(1);
                break;
            default:
                break;
        }
    };

    if (!player) {
        return (
            <div className="player-loading">
                <TopAppBar links={links}/>
                Loading...
            </div>
        );
    }

    return (
        <div className="player-container">
            <TopAppBar links={links}/>
            <div>
                <div className="header-info-container">
                    <img
                        src={player.imageUrl}
                        alt={`${player.firstName} ${player.lastName}`}
                    />
                    <h1 className="print-color" style={{margin: '20px'}}>
                        {player.firstName} {player.lastName}
                    </h1>
                </div>

                <div className="container-background-color middle-container">
                    <div className="tabs">
                        <Box
                            sx={{
                                borderBottom: 2,
                                borderColor: 'divider',
                            }}
                        >
                            <Tabs aria-label="basic tabs">
                                <Tab
                                    label="Overview"
                                    id="tabOne"
                                    onClick={handleChangeTab}
                                    sx={{
                                        color: 'white',
                                    }}
                                />
                                <Tab
                                    label="Appearances"
                                    id="tabTwo"
                                    onClick={handleChangeTab}
                                    sx={{
                                        color: 'white',
                                    }}
                                />
                            </Tabs>
                        </Box>
                    </div>
                    {view === 0 ? (
                        <div className="overall-info-container">
                            <div className="single-player-card personal-info">
                                <h1 className="print-color"> Informazioni personali </h1>
                                <span>Paese di nascita: {player.countryOfBirth}</span>
                                <span>Data di nascita: {player.dateOfBirth}</span>
                                <span>Città di nascita: {player.cityOfBirth}</span>
                                <span>Cittadinanza: {player.countryOfCitizenship}</span>
                                <span>Altezza (cm): {player.heightInCm}</span>
                            </div>

                            <div className="single-player-card about-player">
                                <h1 className="print-color"> Specifiche </h1>
                                <span>Posizione: {player.position}</span>
                                <span>Posizione specifica: {player.subPosition}</span>
                                <span>Club: {player.currentClubName}</span>
                                <span>Piede: {player.foot}</span>
                            </div>

                            <div className="single-player-card other-info">
                                <h1 className="print-color"> Mercato </h1>
                                <span>Valore di mercato (Eur): {player.marketValueInEur}</span>
                                <span>
                  Valore di mercato piuù alto (Eur):{' '}
                                    {player.highestMarketValueInEur}
                </span>
                                <span>Fine Contratto: {player.contractExpirationDate}</span>
                                <a
                                    style={{color: 'red'}}
                                    href={player.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Altre Info
                                </a>
                            </div>
                        </div>
                    ) : view === 1 ? (
                        <div className="grid-container">
                            <DataGridElement
                                gridData={{rows: playerAppearances, columns: columns}}
                            />
                        </div>
                    ) : (
                        <div style={{height: '300px'}}></div>
                    )}
                </div>
            </div>
            <ArrowBack/>
            <ChatIcon/>
            <Footer/>
        </div>
    );
}
