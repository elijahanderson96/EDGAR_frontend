// src/components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ title, content }) => {
    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <div className="card-content">{content}</div>
        </div>
    );
};

export default Card;