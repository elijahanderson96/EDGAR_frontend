// src/Components/BarChart/BarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './BarChart.css';

const CompanyBarChart = () => {
    // Replace this with your actual data fetching logic
    const data = [
        { name: 'Company 1', revenue: 1000000 },
        { name: 'Company 2', revenue: 1500000 },
        { name: 'Company 3', revenue: 2000000 },
    ];

    return (
        <div className="bar-chart">
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default CompanyBarChart;