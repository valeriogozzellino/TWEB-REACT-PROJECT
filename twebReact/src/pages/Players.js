import React, { useEffect } from "react";
//import AppBarUser from "../components/atoms/AppBarUser";
import axios from "axios";
//import { set } from "mongoose";
//import Box from '@mui/material/Box';
//import Tab from '@mui/material/Tab';
//import TabContext from '@mui/lab/TabContext';
//import TabList from '@mui/lab/TabList';
//import TabPanel from '@mui/lab/TabPanel';

export default function Players() {
  const [filteredPlayers, setFilteredPlayers] = React.useState([]); // Stato dei giocatori filtrati
  const [players, setPlayers] = React.useState([]);
  const getPlayers = (filter) => {
    console.log("getPlayers i'm inside: filter:: "+filter);
    const apiUrl = `http://localhost:3001/player/get-player-by-team?filter=${filter}`;
    axios.get(apiUrl)
    .then(response => {
      response.data.forEach(player => {
        setPlayers(player);
      });
    })
    .catch(response => {
      alert(JSON.stringify(response));
    });
  }
  useEffect(() => {
    getPlayers("FC Barcelona");
  }, [filteredPlayers]);
  return (
      <div>
      {/* <AppBarUser />
      <TabContext > {/* insert value ={value} 
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
           <TabList  aria-label="lab API tabs example">  insert onchange ={function} 
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext> */}
      <button onClick={getPlayers}>getPlayersfrom db</button>
      <h1>Players</h1>
    </div>
  );
}