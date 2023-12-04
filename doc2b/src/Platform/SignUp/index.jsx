import axios from 'axios';
import { API } from '../api';

const options = {
  headers: { 'Content-Type': 'application/json' },
};

export const SignUpUser = (user) => {
  return axios.post(`${API}/auth/users/`, user, options);
};
