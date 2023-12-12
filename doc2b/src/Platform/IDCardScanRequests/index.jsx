import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const SendIdCardScan = (idCard) => {
  return axios.post(`${API}/vision/id-analyze/`, idCard, options);
};
