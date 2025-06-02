import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    department: '',
    salary: '',
    joiningDate: ''
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const userId = localStorage.getItem('userId'); // assuming this is set on login

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/employees');
      setAllEmployees(res.data);
    } catch (error) {
      
    }
  };

  // Filter employees whenever allEmployees or userId changes
  useEffect(() => {
    if (userId && allEmployees.length > 0) {
      const filtered = allEmployees.filter(emp => emp.addedBy === userId);
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  }, [allEmployees, userId]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('http://localhost:8080/api/employees', {
  headers: {
    Role: localStorage.getItem('role'),
    UserId: localStorage.getItem('userId')
  }
});

      alert('✅ Employee added!');
      setForm({ name: '', department: '', salary: '', joiningDate: '' });
      fetchEmployees(); // refresh employees after adding
    } catch (error) {
      alert('❌ Failed to add employee');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Employee</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          name="joiningDate"
          type="date"
          value={form.joiningDate}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>

      
      {filteredEmployees.length === 0 ? (
        <p></p>
      ) : (
        <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>{emp.joiningDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;
