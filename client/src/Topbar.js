import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './App.css';

function Topbar() {
    return (
        <nav className="App">
            <div className="navbar">
                DONUT
    <ul className="navbar-menu">
                    <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
                    <a href='a'>ALL</a>
                    <a href='b'>POST</a >
                    <a href='c'>FREE-TALK</a >
                    <a href='d'>LOGIN</a >
                </ul>
            </div>
        </nav>
    );
}

export default Topbar;