import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const SendPassportScan = (passport) => {
  return axios.post(`${API}/vision/passport-analyze/`, passport, options);
};
