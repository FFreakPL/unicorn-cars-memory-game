import React, { useState, useEffect} from 'react';
import { logout } from "./Firebase/Firebase";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Header({ props, bestScore }) {

    return(
        <header className="header">
            <Popup trigger={<button className="header_button_bestScore"
                                    type="button">ShowBestScore</button>} position="right top">
                <div className="popUp">Twój najlepszy wynik to: {bestScore}</div>
            </Popup>
            <button className="header_button" type="button" onClick={props}>New game</button>
            <button className="header_button_logOut"
                    type="button"
                    onClick={logout}><a href="/">Wyloguj się</a></button>
        </header>
    )
}