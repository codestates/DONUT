import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import './Footer.css';

function Footerbar() {
    return (
        <nav className="App">
            <div className="footer">
                <div>
                    copyright © CodeRefreshed
                </div>
                <ul className="footer-menu">
                    <FontAwesomeIcon icon={faGithub} />
                    <li>이현주</li>
                    <li>박경선</li>
                    <li>이정후</li>
                    <li>최혜련</li>
                </ul>
            </div>
        </nav >
    );
}

export default Footerbar;