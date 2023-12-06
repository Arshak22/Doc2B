import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const AddNewDepartment = (department) => {
  return axios.post(`${API}/main/departments/`, department, options);
};

export const GetAllDepartments = (id) => {
  return axios.get(`${API}/main/departments/?company=${id}`, options);
};

export const GetSingleDepartment = (id) => {
  return axios.get(`${API}/main/departments/${id}/`, options);
};

export const UpdateDepartmentInfo = (id, department) => {
  return axios.put(`${API}/main/departments/${id}/`, department, options);
};

export const DeleteDepartment = (id) => {
  return axios.delete(`${API}/main/departments/${id}/`, options);
};
