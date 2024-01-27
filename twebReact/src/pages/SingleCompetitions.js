import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../style/Teams.css';
import TopAppBar from '../components/TopAppBar';
import '../style/Single-Team.css';
import Footer from '../components/Footer';
import '../style/global.css';
import CardElement from '../components/atoms/card/CardElement';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as competitionService from '../services/competitionsService';
import * as teamService from '../services/teamService';
import LoadingComponent from '../components/Loading';


export default function SingleCompetitions() {
    const links = [true, true, true];
    const {competitionId} = useParams();
    const logoCompetition =
        'https://tmssl.akamaized.net/images/logo/header/' +
        competitionId.toLocaleLowerCase() +
        '.png?';
    const [clubs, setClubs] = useState([]);
    const [competition, setCompetition] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        let promises = [];
        promises.push(
            // todo: Eliminare rows
            teamService
                .getTeamsByCompetition(competitionId)
                .then((response) => {
                    const newRows = response.data.map((clubs) => ({
                        id: clubs.clubId,
                        name: clubs.name,
                        squadSize: clubs.squadSize,
                        stadiumName: clubs.stadiumName,
                        stadiumSeats: clubs.stadiumSeats,
                    }));

                    setClubs(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching club games: ', error);
                }),

            competitionService
                .getCompetitionsById(competitionId)
                .then((response) => {
                    setCompetition(response.data);
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                })
        );
        Promise.all(promises).then((value) => {
            setIsLoading(false);
        });

    }, [competitionId]);

    if (isLoading) {
        return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'} />;
    }

    return (
        <div>
            <div>
                <TopAppBar links={links}/>
            </div>
            <div className="container-background-color" id="block-single-competition">
                <div className="team-header">
                    <div id="title-box">
                        <img
                            src={logoCompetition}
                            alt="Competition"
                            style={{width: '100px', height: '150px', margin: '10px'}}
                        />
                        <h1>
                            {competition ? competition.name.toUpperCase() : 'Loading...'}
                        </h1>
                    </div>
                </div>

                <div className="data-card-container">
                    {clubs.map((club) => (
                        <div id="card-element" key={club.clubId}>
                            <CardElement
                                clubId={club.clubId}
                                title={club.name}
                                type={'single-team'}
                                subtitle={club.squadSize}
                                image={
                                    'https://tmssl.akamaized.net/images/wappen/head/' +
                                    club.clubId +
                                    '.png?'
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ArrowBack/>
            <ChatIcon/>
            <Footer/>
        </div>
    );
}
