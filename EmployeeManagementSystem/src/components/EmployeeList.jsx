import React from 'react';

const EmployeeList = ({ employees }) => {
  if (employees.length === 0) return <p>No employees added yet.</p>;

  return (
    <table className="table table-bordered">
      <thead>
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
              <button className="btn btn-warning btn-sm me-2" disabled>Edit</button>
              <button className="btn btn-danger btn-sm" disabled>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
