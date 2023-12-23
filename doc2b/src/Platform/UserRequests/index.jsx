import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const UpdateUserBasicInfo = (user) => {
  return axios.put(`${API}/auth/users/me/`, user, options);
};
