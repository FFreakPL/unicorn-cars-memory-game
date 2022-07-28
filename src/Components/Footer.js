import React from 'react';

export default function Footer({ turns, switchCards }) {

    return(
        <footer className={switchCards === false ? "footer" : "footer_cars"}>
            <p>Turns: {turns}</p>
            <a href="http://www.freepik.com">Designed by catalyststuff / Freepik</a>
        </footer>
    )
}