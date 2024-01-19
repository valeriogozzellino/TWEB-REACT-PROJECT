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




const CustomImageCell = ({ value }) => (
  <img src={value} alt="Competitions" style={{ width: '40px', height: '40px' }} />
);

export default function SingleCompetitions() {
    const links = [false, false, false, false, false, true,false, true, true];
    const pages = ['News', 'Ranking', 'Teams', 'Player', 'Games', 'Competitions'];
    const navigate = useNavigate(); //to one team
    const { competitionId } = useParams();
    const [clubs, setClubs] = useState([]);
    const [competition, setCompetition] = useState(null);
    const competitionImage = "https://tmssl.akamaized.net/images/logo/header/"+ competitionId+".png?"
    //const [currentView, setCurrentView] = useState('players'); // State to track current view
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

    
    const handleRowClick = (rowId, newState) => {
        const club = clubs.find((club) => club.clubId === rowId);
        navigate(`/single-team/${club.clubId}`);
    }

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



   
    

    useEffect(() => {
      getClub(competitionId);
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
        {checkCredentials ? (
                <AppBarUser pages={pages}/>
            ) : (     
                <TopAppBar links={links} pages={pages} />
            )}
            <div className="team-header">
                <h1>{competition ? competition.name : 'Loading...'}</h1>
                <img src={competition ? competitionImage  : 'Loading...'} alt="Competition" />
            <div className="team-stats">
                <p>confederation: {competition ? competition.stadiumName : 'Loading...'} </p>
            </div>
        </div>
       
        <div className="data-grid-container">
                <DataGridElement gridData={gridDataClubs} onRowClick={handleRowClick} />
        </div>
        <Footer/>    
    </div>
);
}
