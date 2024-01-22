import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarUser from "../components/atoms/AppBarUser";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import { useNavigate } from 'react-router-dom';
import "../style/Teams.css";
import { useParams } from 'react-router-dom';
import TopAppBar from "../components/atoms/TopAppBar";
import { useAuth } from '../components/atoms/AuthContext';
import "../style/Single-Team.css";
import Footer from "../components/atoms/Footer";
import '../style/global.css';
import CardElement from "../components/atoms/CardElement";


const CustomImageCell = ({ value }) => (
  <img src={value} alt="Competitions" style={{ width: '40px', height: '40px' }} />
);

export default function SingleCompetitions() {
    const links = [false, false, false, false, false, true, false, false, true, true];
    const pages = ['Home','Competitions','Teams', 'Games' ];
    const navigate = useNavigate(); //to one team
    const { competitionId } = useParams();
    const logoCompetition = "https://tmssl.akamaized.net/images/logo/header/"+competitionId.toLocaleLowerCase()+".png?"
    const [clubs, setClubs] = useState([]);
    const [competition, setCompetition] = useState(null);   

    const { checkCredentials } = useAuth();
    //al teams for this competition
    const [gridDataClubs, setGridDataClubs] = useState({
        rows: [],
        columns: [
            { field: 'id', headerName: 'ID', width: 200 },
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'squadSize', headerName: 'Squad Size', width: 200 },
            { field: 'stadiumName', headerName: 'Stadium Name', width: 200 },
            { field: 'stadiumSeats', headerName: 'Stadium Seats', width: 200 },
        ],
    });


    const getClub = (competitionId) => {
        console.log("competitionId", competitionId);
        const filterCompetition = competitionId;
        console.log("filterCompetition", filterCompetition);
        const competitionApiUrl = `http://localhost:3001/teams/get-teams-by-competition?filterCompetition=${filterCompetition}`;
        axios.get(competitionApiUrl)
            .then(response => {
                const newRows = response.data.map((clubs) => ({
                    id: clubs.clubId,
                    name: clubs.name,
                    squadSize: clubs.squadSize,
                    stadiumName: clubs.stadiumName,
                    stadiumSeats: clubs.stadiumSeats,
                }));
                setGridDataClubs(prevGridData => ({
                    ...prevGridData,
                    rows: newRows,
                }));
                setClubs(response.data);
            })
            .catch(error => {
                console.error("Error fetching club games: ", error);
            });
    }

    const getInfoCompetition = (competitionId) => {
        const apiUrl = `http://localhost:3001/competitions/get-competitions-by-id?competitionId=${competitionId}`;
        axios.get(apiUrl)
          .then((response) => {
            setCompetition(response.data);
          })
          .catch((error) => {
            alert(JSON.stringify(error));
          });
    }


 
    

    useEffect(() => {
        getClub(competitionId);
        getInfoCompetition(competitionId);
    }, [competitionId]);

   
    if (!clubs) {
        return (
            <div>
                {checkCredentials ? (
                    <AppBarUser   pages={pages}/>
                ) : (     
                    <TopAppBar links={links} pages={pages} />
                )}
                Loading...
            </div>
        );
    }

    return (
    <div>
        <div> 
        {checkCredentials ? (
                <AppBarUser pages={pages}/>
            ) : (     
                <TopAppBar links={links} pages={pages} />
            )}
        </div>
    <div className="container-background-color" id="block-single-competition">
          <div className="team-header">
            <div id="title-box">
                <img src={logoCompetition} alt="Competition" style={{ width: '100px', height: '150px', margin:'10px' }} />    
                <h1>{competition ? competition.name.toUpperCase() : 'Loading...'}</h1>
            </div>
            </div>
       
        <div className="data-card-container"> 
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
