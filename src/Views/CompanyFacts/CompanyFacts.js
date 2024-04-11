// src/Components/CompanyFacts/CompanyFacts.js
import React, {useState} from 'react';
import './CompanyFacts.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import DataTable from '../../Components/DataTable/DataTable';
import BarChart from '../../Components/GraphsAndCharts/BarChart';
import LineChart from '../../Components/GraphsAndCharts/LineChart';
import Card from '../../Components/Cards/Card';

import SearchResults from '../../Components/SearchBar/SearchResults';

const CompanyFacts = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleSearch = (results) => {
        const limitedResults = Object.entries(results).slice(0, 5);
        setSearchResults(limitedResults);
        setSelectedCompany(null);
    };

    const handleSelectCompany = (company) => {
        setSelectedCompany(company);
        setSearchResults([]);
    };

    return (
        <div className="company-facts">
            <h2>Company Facts</h2>
            <div className="search-container">
                <SearchBar onSearch={handleSearch} />
                <SearchResults results={searchResults} onSelectCompany={handleSelectCompany} />
            </div>
            {selectedCompany && (
                <div className="selected-company">
                    <h3>{selectedCompany.title}</h3>
                    <p>CIK: {selectedCompany.cik}</p>
                    <p>Symbol: {selectedCompany.symbol}</p>
                    <div className="charts">
                        <Card title="Bar Chart" content={<BarChart />} />
                        <Card title="Line Chart" content={<LineChart />} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyFacts;