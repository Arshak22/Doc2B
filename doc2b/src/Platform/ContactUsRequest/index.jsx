import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const SendQuestionToSupport = (message) => {
  return axios.post(`${API}/support/create/`, message, options);
};
