import React, {useEffect, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../style/Teams.css';
import TopAppBar from '../components/TopAppBar';
import Footer from '../components/Footer';
import '../style/global.css';
import CardElement from '../components/atoms/card/CardElement';
import ChatIcon from '../components/atoms/ChatIcon';
import ArrowBack from '../components/atoms/ArrowBack';
import * as teamService from '../services/teamService';
import LoadingComponent from '../components/Loading';


function Teams() {
    const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
    const [filterCountry, setFilterCountry] = useState('All'); // return all country and set them for the filter
    const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
    const [arraySeason, setArraySeason] = useState([]); // return all country and set them for the filter
    const [isLoading, setIsLoading] = useState(true);
    const links = [true, true, true];
    const [clubs, setClubs] = useState([]);

    const handleFilterSeason = (event) => {
        setSeason(event.target.value);
    };
    const handleFilterCountry = (event) => {
        setFilterCountry(event.target.value);
    };

    useEffect(() => {

        let promises = [];
        promises.push(
            teamService
                .getAllCountry()
                .then((response) => {
                    setArrayCountry(response.data);
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                }),

            teamService
                .getClubBySeason()
                .then((response) => {
                    setArraySeason(response.data);
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                }),

            teamService
                .getTeamsBySeasonAndCountry(filterCountry, filterSeason)
                .then((response) => {
                    setClubs(response.data);
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                })
        );
        Promise.all(promises).then((value) => {
            setIsLoading(false);
        });


    }, [filterSeason, filterCountry]);

    if (isLoading) {
        return <LoadingComponent type={'spinningBubbles'} color={'#0c2840'}/>;
    }

    return (
        <div className="teams-container">
            <div className="header-container">
                <TopAppBar links={links}/>
            </div>
            <div className="container-background-color">
                <div id="container-title">
                    <h1 className="page-title">Teams</h1>
                </div>
                <div className="filters-container">
                    <h3 className="filter-title">Season:</h3>
                    <Select
                        className="season-select"
                        value={filterSeason}
                        onChange={handleFilterSeason}
                    >
                        {arraySeason.map((season) => (
                            <MenuItem key={season} value={season}>
                                {season}
                            </MenuItem>
                        ))}
                    </Select>
                    <h3 className="filter-title">Country:</h3>
                    <Select
                        className="country-select"
                        value={filterCountry}
                        onChange={handleFilterCountry}
                    >
                        {arrayCountry.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div id="containerData">
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

export default Teams;
