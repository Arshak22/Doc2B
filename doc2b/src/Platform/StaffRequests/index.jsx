import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const AddNewStaff = (employee) => {
  return axios.post(`${API}/main/employers/`, employee, options);
};

export const GetAllStaff = (id) => {
  return axios.get(`${API}/main/employers/?company=${id}`, options);
};

export const GetSingleStaff = (id) => {
  return axios.get(`${API}/main/employers/${id}/`, options);
};

export const UpdateStaffInfo = (id, employee) => {
  return axios.put(`${API}/main/employers/${id}/`, employee, options);
};

export const DeleteStaff = (id) => {
  return axios.delete(`${API}/main/employers/${id}/`, options);
};
