import React from "react";
import '../style/Single-Game.css';

export default function Modal({open, children, onClose}) {
    if (!open) return null

    return (
        <div>
            {children}
        </div>
    )
}