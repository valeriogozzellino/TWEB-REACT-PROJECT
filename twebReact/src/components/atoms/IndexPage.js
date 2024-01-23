import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from '@mui/material/Typography';



export default function IndexPage({page}) {
    const navigate = useNavigate();
    const redirectToPage = (page) => () => {
        if (page === "Home") {
      
            navigate("/");
        } else {
            navigate(`/${page.toLowerCase()}`);
        }
    }
     
    if (page === "teams") {
        return (
            <div className="index-page">
                <div onClick={redirectToPage('Home')}><HomeIcon /></div>
                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Teams</b>
                </Typography></div>
            </div>
        )
    } else if (page === "competitions") {
        return (
            <div className="index-page">
                <div onClick={navigate('/')} ><HomeIcon /></div>
                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Competitions</b>
                </Typography></div>
            </div>
        )
    } else if (page === "players") {
        return (
            <div className="index-page">
                <div onClick={()=>navigate('/')}><HomeIcon /></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Teams</b>
                </Typography></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Single teams</b>
                </Typography></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Players</b>
                </Typography></div>
            </div>
        )
    } else if (page === "singleTeam") {
        return (
            <div className="index-page">
                <div onClick={()=>navigate('/')} ><HomeIcon /></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Teams</b>
                </Typography></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Single teams</b>
                </Typography></div>
            </div>
        )
    } else if (page === "singleCompetition") {
        return (
            <div className="index-page">
                <div onClick={()=>navigate('/')} ><HomeIcon /></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Competitions</b>
                </Typography></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Single competitions</b>
                </Typography></div>
            </div>
        )
    } else if (page === "games") {
        return (
            <div className="index-page">
                <div onClick={()=>navigate('/')} ><HomeIcon /></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Games</b>
                </Typography></div>
            </div>
        )
    } else if (page === 'single game') {
        return (
            <div className="index-page">
                <div onClick={()=>navigate('/')}><HomeIcon /></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Games</b>
                </Typography></div>

                <div><ArrowRightAltIcon /></div>
                <div><Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                    <b>Single game</b>
                </Typography></div>
            </div>
        )
    }

}