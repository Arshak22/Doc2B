import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const GetBasicUserInfo = () => {
  return axios.get(`${API}/api/user-companies/`, options);
};
