import React, {useEffect, useState} from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../components/atoms/AuthContext';
import "../style/Teams.css";
import TopAppBar from "../components/atoms/TopAppBar";
import Footer from "../components/atoms/Footer";
import '../style/global.css'
import CardElement from "../components/atoms/CardElement";


function Teams() {
    const [filterSeason, setSeason] = useState(0); // return all competition and set them for the filter
    const [filterCountry, setFilterCountry] = useState("All"); // return all country and set them for the filter
    const [arrayCountry, setArrayCountry] = useState([]); // return all country and set them for the filter
    const [arraySeason, setArraySeason] = useState([]); // return all country and set them for the filter
    const links = [false, false, false, true, false, false, false, false, true, true];
    const pages = ['Home','Competitions','Teams', 'Games' ];
    const {checkCredentials} = useAuth();
    const [clubs, setClubs] = useState([]);



    const handleFilterSeason = (event) => {
        setSeason(event.target.value);
    }
    const handleFilterCountry = (event) => {
        setFilterCountry(event.target.value);
    }

    useEffect(() => {
        const getAllCountry = () => {
            const apiUrl = `http://localhost:3001/teams/get-teams-country`;
            axios
                .get(apiUrl)
                .then((response) => {
                    console.log(response.data);
                    setArrayCountry(response.data);
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                });
        };

        const getAllSeason = () => {
            const apiUrl = `http://localhost:3001/teams/get-club-season`;
            axios
                .get(apiUrl)
                .then((response) => {
                    console.log(response.data);
                    setArraySeason(response.data);
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                });
        };

        getAllCountry();
        getAllSeason();

    }, []);

    /** filter Teams by Competitions, return data  */
    const getTeamsByCountry = (filterCountry, filterSeason) => {
        console.log("filterCountry and filterSeason");
        console.log(filterSeason, filterCountry);
        const apiUrl = `http://localhost:3001/teams/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`;
        axios
            .get(apiUrl)
            .then((response) => {
                setClubs(response.data)
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
    };
    useEffect(() => {
        getTeamsByCountry(filterCountry, filterSeason);
    }, [filterCountry, filterSeason]);



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
                            <CardElement clubId={club.clubId} title={club.name} type={'single-team'} subtitle={club.squadSize} image={"https://tmssl.akamaized.net/images/wappen/head/" + club.clubId + ".png?"} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );


}


export default Teams;
