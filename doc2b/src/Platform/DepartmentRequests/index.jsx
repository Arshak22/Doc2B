import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const AddNewDepartment = (companyID, department) => {
  return axios.post(
    `${API}/main/departments/?company=${companyID}`,
    department,
    options
  );
};

export const GetAllDepartments = (id) => {
  return axios.get(`${API}/main/departments/?company=${id}`, options);
};

export const SearchDepartment = (companyID, search) => {
  return axios.get(
    `${API}/main/departments/?company=${companyID}&search=${search}`,
    options
  );
};

export const GetSingleDepartment = (id) => {
  return axios.get(`${API}/main/departments/${id}/`, options);
};

export const UpdateDepartmentInfo = (id, companyID, department) => {
  return axios.put(
    `${API}/main/departments/${id}/?company=${companyID}`,
    department,
    options
  );
};

export const DeleteDepartment = (id, companyID) => {
  return axios.delete(
    `${API}/main/departments/${id}/?company=${companyID}`,
    options
  );
};
