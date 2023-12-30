import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const GetStaffShortList = (company_id) => {
  return axios.get(`${API}/main/employers-short-list/?company_id=${company_id}`, options);
};

export const SearchStaffShortList = (company_id, search) => {
  return axios.get(
    `${API}/main/employers-short-list/?company_id=${company_id}&search=${search}`,
    options
  );
};
