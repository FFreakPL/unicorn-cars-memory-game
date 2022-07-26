import React, { useState, useEffect} from 'react';

export default function Header({props}) {

    return(
        <header className="header">
            <button className="header_button" type="button" onClick={props}>New game</button>
        </header>
    )
}