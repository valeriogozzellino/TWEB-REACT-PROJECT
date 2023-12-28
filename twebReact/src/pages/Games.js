import React, { useState } from "react";
import AppBarUser from "../components/atoms/AppBarUser";
import axios from "axios"; // Import Axios for making HTTP requests

export default function Games() {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleGetAllGames = () => {
        axios.get("http://localhost:3001/games/get-games") // Make a GET request to your server endpoint
            .then((response) => {
                setResponseData(response.data);
                setError(null); // Reset error if there was one
            })
            .catch((err) => {
                setError(err);
                setResponseData(null); // Reset response data if there was an error
            });
    };

    return (
        <div>
            <AppBarUser />
            <h1>Games</h1>
            <button onClick={handleGetAllGames}>Get All Games</button>
            {/* You can display response data or error message here */}
            {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
