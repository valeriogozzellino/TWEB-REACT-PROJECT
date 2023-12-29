import React, { useEffect, useState } from "react";
import axios from "axios";
import CardTemplate from "../components/atoms/Card";
import AppBarUser from "../components/atoms/AppBarUser";

function Teams() {
    const [filteredClubs, setFilteredClubs] = useState([]); // Stato dei club filtrati
    const [clubs, setClubs] = useState([]);
    const getAllTeams = (filter) => {
        console.log("getTeams I'm inside");
        const apiUrl = `http://localhost:3001/teams/all-teams?filter=${filter}`;
        axios
            .get(apiUrl)
            .then((response) => {
            console.log(response.data);
            setClubs(response.data);
            })
            .catch((error) => {
            alert(JSON.stringify(error));
            });
        };

    useEffect(() => {
        getAllTeams("Italy");
    }, [filteredClubs]);
        
  return (
    <div>
      <AppBarUser />
      <h1>Teams</h1>
      {/* {clubs.map((club, index) => (
        <CardTemplate key={index} club={club} />
      ))} */}
    </div>
  );
}

export default Teams;
