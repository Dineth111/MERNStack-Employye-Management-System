import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';

const initialState = { name: '', email: '', position: '', salary: '' };

const EmployeeForm = ({ open, onClose, onSubmit, initialData, mode }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, salary: initialData.salary?.toString() || '' });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [initialData, open]);

  const validate = () => {
    let temp = {};
    temp.name = form.name ? '' : 'Name is required';
    temp.email = /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Valid email is required';
    temp.position = form.position ? '' : 'Position is required';
    temp.salary = form.salary && !isNaN(form.salary) && Number(form.salary) >= 0 ? '' : 'Valid salary is required';
    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...form, salary: Number(form.salary) });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
            <TextField
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
              error={!!errors.position}
              helperText={errors.position}
              fullWidth
              required
            />
            <TextField
              label="Salary"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
              fullWidth
              required
              type="number"
              inputProps={{ min: 0 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {mode === 'edit' ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmployeeForm; 