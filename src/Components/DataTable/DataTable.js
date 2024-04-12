import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

const DataTable = ({ data, onSelectionChange }) => {
    const [columnDefs, setColumnDefs] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (data) {
            const columns = Object.keys(data[0]).map(key => ({
                headerName: key,
                field: key,
                filter: 'agSetColumnFilter',
                filterParams: {
                    values: (params) => {
                        const uniqueValues = new Set(params.success(data.map(row => row[key])));
                        return [...uniqueValues];
                    },
                },
                sortable: true,
                resizable: true,
            }));
            setColumnDefs(columns);
            setRowData(data);
        }
    }, [data]);

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    const onSelectionChanged = () => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        onSelectionChange(selectedRows);
    };

    const gridRef = React.useRef(null);

    return (
        <div className="ag-theme-alpine-dark" style={{ height: '400px', width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    filter: true,
                    sortable: true,
                    resizable: true,
                }}
                rowSelection="multiple"
                onGridReady={onGridReady}
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    );
};

export default DataTable;