import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee, updateEmployee, editingEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    department: '',
    salary: '',
    joiningDate: '',
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      setEmployee({ name: '', department: '', salary: '', joiningDate: '' });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEmployee) {
      updateEmployee(employee);
      alert('✅ Employee updated!');
    } else {
      addEmployee(employee);
      alert('✅ Employee added!');
    }

    setEmployee({ name: '', department: '', salary: '', joiningDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 mb-3">
      <input
        className="form-control mb-2"
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-2"
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-2"
        type="number"
        name="salary"
        placeholder="Salary"
        value={employee.salary}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-2"
        type="date"
        name="joiningDate"
        value={employee.joiningDate}
        onChange={handleChange}
        required
      />
      <button className="btn btn-primary" type="submit">
        {editingEmployee ? 'Update Employee' : 'Save Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
