import React, { useState, useEffect} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
} from "./Firebase";

export default function RegisterComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!email) alert("Please enter email");
        registerWithEmailAndPassword(auth, email, password, passwordRepeat);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/homepage");
    }, [user, loading]);

    function showError() {
        alert("Passwords are not the same")
    }

    return (
        <>
            <div className="register">
                <div className="register_logo"></div>
                <div className="register_title">Załóż konto</div>
                <div className="register_container">
                    <div className="register_container_email">
                        <p className="register_textBox_title">Email</p>
                        <input
                            type="text"
                            className="register_textBox"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="register_container_password">
                        <p className="register_textBox_title">Hasło</p>
                        <input
                            type="password"
                            className="register_textBox"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="register_container_password">
                        <p className="register_textBox_title">Powtórz hasło</p>
                        <input
                            type="password"
                            className="register_textBox"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                    </div>
                </div>
                <div className="register_btn_container">
                    <div className="register_btn_noFrame">
                        <Link to="/">Zaloguj się</Link>
                    </div>
                    {password !== passwordRepeat
                        ?
                        <button className="register_btn" onClick={() => showError()}>
                            Załóż konto
                        </button>
                        :
                        <button className="register_btn" onClick={register}>
                            Załóż konto
                        </button>
                    }
                </div>
            </div>
        </>
    )
}