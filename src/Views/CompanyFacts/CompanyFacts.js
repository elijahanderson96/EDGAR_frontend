// src/Components/CompanyFacts/CompanyFacts.js
import React from 'react';
import './CompanyFacts.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import DataTable from '../../Components/DataTable/DataTable';
import BarChart from '../../Components/GraphsAndCharts/BarChart';
import LineChart from '../../Components/GraphsAndCharts/LineChart';
import Card from '../../Components/Cards/Card';

const CompanyFacts = () => {
    return (
        <div className="company-facts">
            <h2>Company Facts</h2>
            <SearchBar />
            {/*<Card title="Data Table" content={<DataTable />} />*/}
            <div className="charts">
                <Card title="Bar Chart" content={<BarChart />} />
                <Card title="Line Chart" content={<LineChart />} />
            </div>
        </div>
    );
};

export default CompanyFacts;