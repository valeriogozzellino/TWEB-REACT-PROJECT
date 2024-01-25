import React from "react";
import '../style/Single-Game.css';
import { useNavigate, useParams } from 'react-router-dom';


export default function Modal({open, children, player_id}) {
    const navigate = useNavigate();
    function handlePlayerClick(player_id) {
        navigate(`/player/${player_id}`);
    }

    if (!open) return null

    return (
        <div>
            {children}
            <button onClick={() => handlePlayerClick(player_id)}> Vai alla pagina del giocatore </button>
        </div>
    )
}

