import React, { useState, useEffect} from 'react';
import {CardsBg} from "./Cards";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="card_front" src={card.url} alt="card front"/>
                <img
                    className="card_back"
                    onClick={handleClick}
                    src={`${CardsBg}`}
                    alt="card back"/>
            </div>
        </div>
    )
}