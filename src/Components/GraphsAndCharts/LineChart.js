import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompanyLineChart = ({ data, selectedSeries, width = "100%", height = 300 }) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658"];  // Define more colors as needed

    return (
        <ResponsiveContainer width={width} height={height}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 55, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="filed_date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedSeries.map((key, index) => (
                    <Line key={key} type="monotone" dataKey={key} stroke={colors[index % colors.length]} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CompanyLineChart;
