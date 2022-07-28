import React from 'react';
import {CardsBg} from "./Cards";
import {CardsBg2} from "./Cards2";

export default function SingleCard({ card, handleChoice, flipped, disabled, switchCards }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="card_front" src={card.url} alt="card front"/>
                {switchCards === false
                    ?
                    <img
                        className="card_back"
                        onClick={handleClick}
                        src={`${CardsBg}`}
                        alt="card back"/>
                :
                    <img
                        className="card_back"
                        onClick={handleClick}
                        src={`${CardsBg2}`}
                        alt="card back"/>}
            </div>
        </div>
    )
}