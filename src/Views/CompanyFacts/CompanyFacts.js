// src/Components/CompanyFacts/CompanyFacts.js
import React, {useState} from 'react';
import './CompanyFacts.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import DataTable from '../../Components/DataTable/DataTable';
import BarChart from '../../Components/GraphsAndCharts/BarChart';
import LineChart from '../../Components/GraphsAndCharts/LineChart';
import Card from '../../Components/Cards/Card';
import {ClipLoader} from 'react-spinners';
import SearchResults from '../../Components/SearchBar/SearchResults';
import axios from "axios";
import Select from "react-select";

const CompanyFacts = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyFacts, setCompanyFacts] = useState(null);
    const [selectedDataSeries, setSelectedDataSeries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [activeTab, setActiveTab] = useState([]);
    const [chartData, setChartData] = useState([]);


    const handleSearch = (results) => {
        const limitedResults = Object.entries(results).slice(0, 5);
        setSearchResults(limitedResults);
        setSelectedCompany(null);
    };

    const [loading, setLoading] = useState(false);

    const handleSelectCompany = async (company) => {
        setSelectedCompany(company);
        setSearchResults([]);
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:8000/company_facts/facts?symbol=${company.symbol}`);
            const {metadata, data} = response.data;
            setCompanyFacts(metadata);
            console.log(data)
            setTableData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching company facts:', error);
            setLoading(false);
        }
    };

    const handleDataSeriesSelection = (selectedOptions) => {
        const selectedSeriesKeys = selectedOptions.map(option => option.value);
        setSelectedDataSeries(selectedSeriesKeys);
        console.log(selectedSeriesKeys)
        // Transform data whenever new series are selected
        const newData = transformDataForChart(tableData, selectedSeriesKeys);
        console.log('New data is below')
        console.log(newData)
        setChartData(newData);  // Assuming you add state for chartData
    };




    function transformDataForChart(data, selectedSeries) {
        const groupedData = {};

        // Iterate over each data item
        data.forEach(item => {
            // Check if the current item's fact_key is in the selected series
            if (selectedSeries.includes(item.fact_key)) {
                const date = item.filed_date; // Use filed_date as the key for grouping
                const key = item.fact_key;
                const value = parseFloat(item.value); // Convert value to number if not already

                // Initialize the grouping object for this date if it doesn't already exist
                if (!groupedData[date]) {
                    groupedData[date] = { filed_date: date };
                }

                // Aggregate values for the same fact_key under the same filed_date
                if (!groupedData[date][key]) {
                    groupedData[date][key] = 0;
                }
                groupedData[date][key] += value;
            }
        });

        // Convert the groupedData object into an array of objects
        return Object.values(groupedData);
    }


    const handleTableSelectionChange = (selectedRows) => {
        const selectedSeries = selectedRows.map(row => row.fact_key);
        setSelectedDataSeries(selectedSeries);
    };

    const darkTheme = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: '#555',
            primary50: '#555',
            primary: '#fff',
            neutral0: '#333',
            neutral20: '#444',
            neutral30: '#555',
            neutral40: '#666',
            neutral50: '#888',
            neutral80: '#fff',
        },
    });

    return (
        <div className="company-facts">
            <h2>Company Facts</h2>
            <div className="search-container">
                <SearchBar onSearch={handleSearch}/>
                <SearchResults results={searchResults} onSelectCompany={handleSelectCompany}/>
            </div>
            {loading ? (
                <div className="loading">
                    <ClipLoader color="#ffffff" size={50}/>
                </div>
            ) : (
                selectedCompany && (
                    <div className="selected-company">
                        <div className="company-details">
                            <h3>{selectedCompany.title}</h3>
                            <span>Symbol: {selectedCompany.symbol}</span>
                        </div>
                        {companyFacts && (
                            <div>
                                <DataTable data={tableData} onSelectionChange={handleTableSelectionChange}/>
                                <h4>Select Data Series:</h4>
                                <Select
                                    isMulti
                                    isSearchable
                                    options={Object.keys(companyFacts).map(factKey => ({
                                        value: factKey,
                                        label: factKey,
                                    }))}
                                    value={selectedDataSeries.map(factKey => ({
                                        value: factKey,
                                        label: factKey,
                                    }))}
                                    onChange={selectedOptions => handleDataSeriesSelection(selectedOptions || [])}
                                    placeholder="Select data series"
                                    theme={darkTheme}

                                />
                            </div>
                        )}
                        <div className="charts-container">
                            <div className="chart-tabs">
                                <div
                                    className={`chart-tab ${activeTab === 'bar' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('bar')}
                                >
                                    Bar Chart
                                </div>
                                <div
                                    className={`chart-tab ${activeTab === 'line' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('line')}
                                >
                                    Line Chart
                                </div>
                            </div>
                            <div className="chart-content">
                                {activeTab === 'bar' && (
                                    <Card
                                        title="Bar Chart"
                                        content={<BarChart data={chartData} selectedSeries={selectedDataSeries} />}
                                    />
                                )}
                                {activeTab === 'line' && (
                                    <Card
                                        title="Line Chart"
                                        content={<LineChart data={chartData} selectedSeries={selectedDataSeries} />}
                                    />
                                )}
                            </div>

                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default CompanyFacts;