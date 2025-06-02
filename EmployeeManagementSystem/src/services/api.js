import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const registerUser = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/login`, userData);
};

export const fetchEmployees = (role, userId) => {
  return axios.get(`${API_BASE_URL}/employees`, {
    headers: { Role: role, UserId: userId }
  });
};

export const addEmployee = (employeeData, userId) => {
  return axios.post(`${API_BASE_URL}/employees`, employeeData, {
    headers: { UserId: userId }
  });
};

export const updateEmployee = (id, employeeData, role) => {
  return axios.put(`${API_BASE_URL}/employees/${id}`, employeeData, {
    headers: { Role: role }
  });
};

export const deleteEmployee = (id, role) => {
  return axios.delete(`${API_BASE_URL}/employees/${id}`, {
    headers: { Role: role }
  });
};
