import React, { useState, useEffect} from 'react';

export default function Footer({ turns }) {

    return(
        <footer className="footer">
            <p>Turns: {turns}</p>
            <a href="http://www.freepik.com">Designed by catalyststuff / Freepik</a>
        </footer>
    )
}