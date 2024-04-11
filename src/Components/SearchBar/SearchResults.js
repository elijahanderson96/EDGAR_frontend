import React from 'react';
import './SearchResults.css';

const SearchResults = ({ results, onSelectCompany }) => {
    if (!results || results.length === 0) {
        return null;
    }

    return (
        <ul className="search-results">
            {results.map(([cik, data]) => (
                <li
                    key={cik}
                    onClick={() => onSelectCompany({ cik, ...data })}
                    className="search-result-item"
                >
                    {data.title}
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;