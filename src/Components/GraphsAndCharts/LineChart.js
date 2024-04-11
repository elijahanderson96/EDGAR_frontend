// src/Components/LineChart/LineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './LineChart.css';

const CompanyLineChart = () => {
    // Replace this with your actual data fetching logic
    const data = [
        { name: 'Jan', revenue: 1000000 },
        { name: 'Feb', revenue: 1200000 },
        { name: 'Mar', revenue: 1500000 },
        { name: 'Apr', revenue: 1800000 },
        { name: 'May', revenue: 2000000 },
    ];

    return (
        <div className="line-chart">
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default CompanyLineChart;