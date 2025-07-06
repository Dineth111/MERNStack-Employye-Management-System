import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = (onView, onEdit, onDelete) => [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'position', headerName: 'Position', flex: 1 },
  { field: 'salary', headerName: 'Salary', flex: 1, type: 'number' },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" onClick={() => onView(params.row)}>
          <VisibilityIcon />
        </IconButton>
        <IconButton color="info" onClick={() => onEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(params.row)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
  },
];

const EmployeeTable = ({ employees, onView, onEdit, onDelete, loading }) => {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={employees}
        columns={columns(onView, onEdit, onDelete)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        loading={loading}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default EmployeeTable; 