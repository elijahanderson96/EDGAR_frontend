import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback(
        debounce(async () => {
            try {
                const response = await axios.get('http://localhost:8000/company_facts/search', {
                    params: { term: searchTerm },
                });
                onSearch(response.data);
            } catch (error) {
                console.error('Error searching:', error);
            }
        }, 300),
        [searchTerm, onSearch]
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;