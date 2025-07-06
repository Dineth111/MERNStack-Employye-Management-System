import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from '@mui/material';

const EmployeeViewDialog = ({ open, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography><strong>Name:</strong> {employee.name}</Typography>
          <Typography><strong>Email:</strong> {employee.email}</Typography>
          <Typography><strong>Position:</strong> {employee.position}</Typography>
          <Typography><strong>Salary:</strong> {employee.salary}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeViewDialog; 