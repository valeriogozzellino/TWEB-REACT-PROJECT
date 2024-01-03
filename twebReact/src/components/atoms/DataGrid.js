import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


export default function DataGridElement({ gridData, followClick }) {
  const handleCellClick = (params, event) => {
    const rowId = params.id;
    window.location.href = `${followClick}?props=${rowId}`;;
      console.log("Riga selezionata:", rowId);
  };
  return (
    <Box sx={{ height: 520, width: '70%' }}>
      <DataGrid
        rows={gridData.rows}  // Passa i dati delle righe come props
        columns={gridData.columns}  // Passa i dati delle colonne come props
        loading={gridData.rows.length === 0}
        pageSizeOptions={[gridData.rows.length]}
        rowHeight={38}
        onCellClick={handleCellClick}
      />
    </Box>
  );
}
 