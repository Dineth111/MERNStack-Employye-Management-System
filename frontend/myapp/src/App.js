import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import EmployeeViewDialog from './components/EmployeeViewDialog';
import Notification from './components/Notification';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  // Fetch employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setNotification({ open: true, message: 'Failed to fetch employees', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  // Add employee
  const handleAdd = async (employee) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error('Add failed');
      setNotification({ open: true, message: 'Employee added', severity: 'success' });
      setFormOpen(false);
      fetchEmployees();
    } catch {
      setNotification({ open: true, message: 'Failed to add employee', severity: 'error' });
    }
  };

  // Edit employee
  const handleEdit = async (employee) => {
    try {
      const res = await fetch(`${API_URL}/${employee._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error('Edit failed');
      setNotification({ open: true, message: 'Employee updated', severity: 'success' });
      setFormOpen(false);
      fetchEmployees();
    } catch {
      setNotification({ open: true, message: 'Failed to update employee', severity: 'error' });
    }
  };

  // Delete employee
  const handleDelete = async (employee) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await fetch(`${API_URL}/${employee._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setNotification({ open: true, message: 'Employee deleted', severity: 'success' });
      fetchEmployees();
    } catch {
      setNotification({ open: true, message: 'Failed to delete employee', severity: 'error' });
    }
  };

  // Open add form
  const openAddForm = () => {
    setFormMode('add');
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  // Open edit form
  const openEditForm = (employee) => {
    setFormMode('edit');
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  // Open view dialog
  const openViewDialog = (employee) => {
    setSelectedEmployee(employee);
    setViewOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={openAddForm}>
            Add Employee
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress />
          </Box>
        ) : (
          <EmployeeTable
            employees={employees}
            onView={openViewDialog}
            onEdit={openEditForm}
            onDelete={handleDelete}
            loading={loading}
          />
        )}
      </Container>
      <EmployeeForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={formMode === 'edit' ? handleEdit : handleAdd}
        initialData={selectedEmployee}
        mode={formMode}
      />
      <EmployeeViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        employee={selectedEmployee}
      />
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
}

export default App;
