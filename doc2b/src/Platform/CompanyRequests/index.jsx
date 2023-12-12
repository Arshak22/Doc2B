import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const AddNewCompany = (company) => {
  return axios.post(`${API}/main/my-companies/`, company, options);
};

export const GetAllCompanies = () => {
  return axios.get(`${API}/main/my-companies/`, options);
};

export const SearchCompanies = (search) => {
  return axios.get(`${API}/main/my-companies/?search=${search}`, options);
};

export const GetSingleCompany = (id) => {
  return axios.get(`${API}/main/my-companies/${id}/`, options);
};

export const UpdateCompanyInfo = (id, company) => {
  return axios.put(`${API}/main/my-companies/${id}/`, company, options);
};

export const DeleteCompnay = (id) => {
  return axios.delete(`${API}/main/my-companies/${id}/`, options);
};
