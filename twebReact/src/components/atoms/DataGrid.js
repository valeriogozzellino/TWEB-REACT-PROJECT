import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "../../style/DataGrid.css";
export default function DataGridElement({ gridData, onRowClick }) {
    const handleCellClick = (params, event) => {
        const rowId = params.id;
        console.log("Riga selezionata:", rowId);
        onRowClick(rowId, true);
    };

    // Assuming equal width for all columns
    const columnsWithWidth = gridData.columns.map(column => ({
        ...column,
        width: 300,
    }));

    return (
        <Box sx={{ height: 520, width: '90%', marginBottom:'30px' }} className="data-grid">
            <DataGrid
                rows={gridData.rows}
                columns={columnsWithWidth}
                loading={gridData.rows.length === 0}
                pageSizeOptions={[gridData.rows.length]}
                rowHeight={48}
                onCellClick={handleCellClick}
                viewportPageSize={gridData.rows.length}
                className="css-1u3bzj6-MuiDataGrid-columnHeaders"
            />
        </Box>
    );
}