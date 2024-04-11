// src/Components/SidePanel/SidePanel.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidePanel.css';

const SidePanel = () => {
    const [expandedSources, setExpandedSources] = useState([]);

    const dataSources = [
        {
            name: 'EDGAR',
            entries: [
                {
                    name: 'Company Facts',
                    path: '/company-facts',
                },
            ],
        },
    ];

    const toggleSourceExpansion = (sourceName) => {
        if (expandedSources.includes(sourceName)) {
            setExpandedSources(expandedSources.filter((name) => name !== sourceName));
        } else {
            setExpandedSources([...expandedSources, sourceName]);
        }
    };

    return (
        <div className="side-panel">
            <ul className="data-source-list">
                {dataSources.map((source, index) => (
                    <li key={index}>
                        <div
                            className="data-source-name"
                            onClick={() => toggleSourceExpansion(source.name)}
                        >
                            {source.name}
                            <span className={`toggle-icon ${expandedSources.includes(source.name) ? 'open' : ''}`}>
                &#9658;
              </span>
                        </div>
                        {expandedSources.includes(source.name) && (
                            <ul className="data-entry-list">
                                {source.entries.map((entry, entryIndex) => (
                                    <li key={entryIndex}>
                                        <Link to={entry.path}>{entry.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidePanel;