import TopAppBar from "../components/atoms/TopAppBar";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DataGridElement from "../components/atoms/DataGrid";
import Select from '@mui/material/Select';
import "../style/Competitions.css";

const Competitions = () => {
    const links = [false, false, false, false, false, true, true];
    const pages = ['Home', 'News', 'Ranking', 'Teams', 'Players'];
    const [filter, setFilter] = useState("All");  // Imposta il valore di default a "All"
    const [gridData, setGridData] = useState({
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 200 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'subType', headerName: 'subType', width: 200 },
      { field: 'confederation', headerName: 'conferderations', width: 200 },
    ],
    });
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  }
const getAllCompetitions = (filter) => {
    const apiUrl = `http://localhost:3001/competitions/all-competitions?filter=${filter}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newRows = response.data.map((competitions) => ({
          id: competitions.competitionId,
          name: competitions.name,
          subType: competitions.subType,
          confederation: competitions.confederation,
        }));
        console.log(newRows);
        setGridData((prevGridData) => ({
          ...prevGridData,
          rows: newRows,
        }));
      })
      .catch((error) => {
      alert(JSON.stringify(error));
      });
  };

    useEffect(() => {
        getAllCompetitions(filter);
    }, [filter]);
  
    return (
        <div id="container">
        <TopAppBar links={links} pages={pages} />
        <div id="title">
          <h1>Competitions</h1>
        </div>
        <div id="blockid">
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Country"
            onChange={handleChangeFilter}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Italy"}>Italy</MenuItem>
            <MenuItem value={"Russia"}>Russia</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
            <MenuItem value={"France"}>France</MenuItem>
            <MenuItem value={"Spain"}>Spain</MenuItem>
          </Select>
        </div>
            <div id="containerData">
                <DataGridElement gridData={gridData} />
            </div>
    </div>
        
    )
}
export default Competitions;