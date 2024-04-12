// CompanyBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompanyBarChart = ({ data, selectedSeries }) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658"];  // Add more colors as needed

    return (
        <ResponsiveContainer width="100%" height={300} >
            <BarChart data={data} margin={{ top: 20, right: 30, left: 55, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="filing_date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedSeries.map((key, index) => (
                    <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CompanyBarChart;
