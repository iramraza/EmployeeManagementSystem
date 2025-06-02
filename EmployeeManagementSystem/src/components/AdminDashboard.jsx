import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [form, setForm] = useState({
    id: null,
    name: '',
    department: '',
    salary: '',
    joiningDate: ''
  });
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/employees', {
        headers: { Role: 'ADMIN' }
      });
      setEmployees(res.data);
    } catch (error) {
      alert('❌ Error fetching employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`http://localhost:8080/api/employees/${form.id}`, form, {
          headers: { Role: 'ADMIN' }
        });
        alert('✅ Employee updated!');
      } else {
        await axios.post('http://localhost:8080/api/employees', form, {
          headers: { Role: 'ADMIN' }
        });
        alert('✅ Employee added!');
      }
      setForm({ id: null, name: '', department: '', salary: '', joiningDate: '' });
      fetchEmployees();
    } catch (error) {
      alert('❌ Operation failed');
    }
  };

  const handleEdit = (emp) => {
    setForm(emp);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/${id}`, {
          headers: { Role: 'ADMIN' }
        });
        alert('🗑️ Employee deleted');
        fetchEmployees();
      } catch (error) {
        alert('❌ Delete failed');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm mb-5">
        <h3 className="mb-3">{form.id ? 'Update' : 'Add'} Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="name"
                className="form-control"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="department"
                className="form-control"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="salary"
                type="number"
                className="form-control"
                placeholder="Salary"
                value={form.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="joiningDate"
                type="date"
                className="form-control"
                value={form.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            {form.id ? 'Update' : 'Add'} Employee
          </button>
        </form>
      </div>

      <h4>Employee List</h4>
      <table className="table table-hover table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>{emp.joiningDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(emp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
