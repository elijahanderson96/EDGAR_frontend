// src/Components/DataTable/DataTable.js
import React from 'react';
import { useTable } from 'react-table';
import './DataTable.css';

const DataTable = () => {
    // Replace this with your actual data fetching logic
    const data = [
        { id: 1, name: 'Company 1', revenue: 1000000 },
        { id: 2, name: 'Company 2', revenue: 1500000 },
        { id: 3, name: 'Company 3', revenue: 2000000 },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Revenue', accessor: 'revenue' },
    ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="data-table">
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default DataTable;