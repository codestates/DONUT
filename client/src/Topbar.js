import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './App.css';

function Topbar() {
    return (
        <nav className="App">
            <div className="navbar">
                <Link to="/">DONUT</Link>
                <ul className="navbar-menu">
                    <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
                    <Link to="./all">ALL</Link>
                    <Link to="./post">POST</Link>
                    <Link to="./free-talk">FREE-TALK</Link >
                    <Link to="./login">LOGIN</Link>
                    <Link to="./my">MY</Link>
                    <Link to="./logout">LOGOUT</Link>
                </ul>
            </div>
        </nav>
    );
}

export default Topbar;