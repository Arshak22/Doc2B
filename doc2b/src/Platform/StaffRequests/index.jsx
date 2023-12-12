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

export const SearchStaff = (companyID, search) => {
  return axios.get(`${API}/main/employers/?company=${companyID}&search=${search}`, options);
};

export const FilterStaff = (companyID, status) => {
  return axios.get(`${API}/main/employers/?company=${companyID}&status=${status}`, options);
};

export const GetSingleStaff = (id, companyID) => {
  return axios.get(`${API}/main/employers/${id}/?company=${companyID}`, options);
};

export const UpdateStaffInfo = (id, employee, companyID) => {
  return axios.put(`${API}/main/employers/${id}/?company=${companyID}`, employee, options);
};

export const DeleteStaff = (id, companyID) => {
  return axios.delete(`${API}/main/employers/${id}/?company=${companyID}`, options);
};
