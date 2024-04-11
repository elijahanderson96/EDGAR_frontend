// src/views/Home.js
import React from 'react';
import Header from '../../Components/Headers/Header';
import SearchBar from '../..//Components/SearchBar/SearchBar';
import Card from '../..//Components/Cards/Card';

const Home = () => {
    const handleSearch = (searchTerm) => {
        // Handle search functionality
        console.log('Search term:', searchTerm);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className="card-container">
                <Card title="Top 10 Companies by Cash to Market Cap" content="..." />
                <Card title="Another Metric" content="..." />
                {/* Add more cards */}
            </div>
        </div>
    );
};

export default Home;