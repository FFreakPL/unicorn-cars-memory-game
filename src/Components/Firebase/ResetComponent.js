import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./Firebase";

export default function ResetComponent() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset_logo"></div>
            <div className="reset_title">Przypomnij hasło</div>
            <div className="reset_container">
                <div className="reset_container_email">
                    <p className="reset_textBox_title">Email</p>
                    <input
                        type="text"
                        className="reset_textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="reset_btn_container">
                <button
                    className="reset_btn"
                    onClick={() => sendPasswordReset(email)}
                >
                    Zresetuj hasło przez e-mail
                </button>
                <div className="reset_register">
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link> teraz.
                </div>
            </div>
        </div>
    );
}