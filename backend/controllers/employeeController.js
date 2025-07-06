const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position, salary } = req.body;
    if (!name || !email || !position || salary == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const employee = new Employee({ name, email, position, salary });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, position, salary } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, salary },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 