// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo">
                {/* Add your logo or application name */}
                {/*<h1>Your App Name</h1>*/}
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/account">Account</a></li>
                    <li><a href="/logout">Log Out</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;