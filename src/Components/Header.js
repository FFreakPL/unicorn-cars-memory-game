import React, { useState, useEffect} from 'react';

export default function Header({props}) {

    return(
        <header className="header">
            <button onClick={props}>New game</button>
        </header>
    )
}