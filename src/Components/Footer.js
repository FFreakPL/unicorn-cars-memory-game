import React, { useState, useEffect} from 'react';

export default function Footer({ turns }) {

    return(
        <footer className="footer">
            <p>Turns: {turns}</p>
        </footer>
    )
}