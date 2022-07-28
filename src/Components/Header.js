import React, { useState, useEffect} from 'react';
import { logout } from "./Firebase/Firebase";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {auth, db} from "./Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header({ props, bestScore, handleSwitchCardsCars, switchCards }) {
    const [user, loading] = useAuthState(auth);
    const [styleState, setStyleState] = useState({})

    useEffect(() => {
        const stylesUnicorn = {
            backgroundColor: "rgb(252 226 225 / 94%)"
        }
        const stylesCars = {
            backgroundColor: "#d3d3d3f2"
        }
        if(switchCards === false) {
            setStyleState(prevState => stylesUnicorn)
        } else {
            setStyleState(prevState => stylesCars)
        }
    },[switchCards])

    return(
        <header className="top_nav" style={styleState}>
            <div className="top_nav_logo"></div>
            <div className="top_nav_hello">Witaj {user.email}</div>
            <input id="menu_toggle" type="checkbox"/>
            <label className='menu_button_container' htmlFor="menu_toggle">
                <div className='menu_button'></div>
            </label>
            <ul className="menu">
                <li className="menu_element">
                    <button className="menu_route"
                            type="button"
                            onClick={props}
                            style={styleState}>NewGame</button>
                </li>
                <li className="menu_element">
                    <Popup trigger={<button className="menu_route"
                                            style={styleState}
                                            type="button">BestScore</button>}
                           position="bottom center">
                        <div className="popUp">Twój najlepszy wynik to: {bestScore}</div>
                    </Popup>
                </li>
                <li className="menu_element">
                    {switchCards === false
                            ? <button className="menu_route bold"
                                      type="button"
                                      onClick={handleSwitchCardsCars}
                                      style={styleState}>Cars Cards</button>
                            : <button className="menu_route bold"
                                      type="button"
                                      onClick={handleSwitchCardsCars}
                                      style={styleState}>Unicorn Cards</button>}
                </li>
                <li className="menu_element">
                    <button className="menu_route"
                            type="button"
                            onClick={logout}
                            style={styleState}><a href="/">Wyloguj się</a></button>
                </li>
            </ul>
        </header>
    )
}