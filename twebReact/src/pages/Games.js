import React, { useState, useEffect } from "react";
import AppBarUser from "../components/atoms/AppBarUser";
import axios from "axios";
import GameCard from "../components/atoms/GameCard";

export default function Games() {
    const [games, setGames] = useState(null);
    const [error, setError] = useState(null);

    const handleGetAllGames = () => {
        axios.get("http://localhost:3001/games/get-games")
            .then((response) => {
                setGames(response.data);
                setError(null);
            })
            .catch((err) => {
                setError(err);
                setGames(null);
            });
    };

    useEffect(() => {
        handleGetAllGames();
    }, []);

    return (
        <div>
            <AppBarUser />
            <h1>Games</h1>
            {/* Button removed since we're fetching games on init */}
            {games && games.map(game => <GameCard key={game._id} game={game} />)}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
