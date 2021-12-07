import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger, faSearch } from "@fortawesome/free-solid-svg-icons";

import './App.css';

function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="App">
            <div className="navbar">
                <Link to="/">DONUT</Link>
                <ul className="navbar-menu1">
                    <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
                    <Link to="./all">ALL</Link>
                    <Link to="./post">POST</Link>
                    <Link to="./free-talk">FREE-TALK</Link >
                    <Link to="./login">LOGIN</Link>
                    <Link to="./my">MY</Link>
                    <Link to="./logout">LOGOUT</Link>
                </ul><FontAwesomeIcon icon={faBars} className="navbar-toggle-btn"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                </FontAwesomeIcon>
            </div>
            {isOpen ? (
                <ul className="navbar-menu2">
                    <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
                    <Link to="./all">ALL</Link>
                    <Link to="./post">POST</Link>
                    <Link to="./free-talk">FREE-TALK</Link >
                    <Link to="./login">LOGIN</Link>
                    <Link to="./my">MY</Link>
                    <Link to="./logout">LOGOUT</Link>
                </ul>
            ) : (
                <></>
            )}
        </nav >
    );
}

export default Topbar;