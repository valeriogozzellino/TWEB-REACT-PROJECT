import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../style/DataGrid.css';

//controllare se viene import
/**
 *
 * @param {} param0
 * @returns
 */
export default function DataGridElement({ gridData, onRowClick }) {
  const handleCellClick = (params, event) => {
    const rowId = params.id;
    onRowClick(rowId, true);
  };
  const getRowClassName = (params) => {
    return `custom-row-${params.rowIndex % 2 === 0 ? 'even' : 'odd'}`;
  };

  // Assuming equal width for all columns
  const columnsWithWidth = gridData.columns.map((column) => ({
    ...column,
    width: 300,
  }));

  return (
    <Box
      sx={{ height: 520, width: '90%', marginBottom: '30px' }}
      className="data-grid"
    >
      <DataGrid
        rows={gridData.rows}
        columns={columnsWithWidth}
        loading={gridData.rows.length === 0}
        pageSizeOptions={[gridData.rows.length]}
        rowHeight={48}
        onCellClick={handleCellClick}
        viewportPageSize={gridData.rows.length}
        getRowClassName={getRowClassName}
      />
    </Box>
  );
}
