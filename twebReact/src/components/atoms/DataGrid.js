import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

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
        <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
                rows={gridData.rows}
                columns={columnsWithWidth}
                loading={gridData.rows.length === 0}
                pageSizeOptions={[gridData.rows.length]}
                rowHeight={38}
                onCellClick={handleCellClick}
                autoHeight
                viewportPageSize={gridData.rows.length}
            />
        </Box>
    );
}