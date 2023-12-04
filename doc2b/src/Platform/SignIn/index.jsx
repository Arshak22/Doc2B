import axios from 'axios';
import { API } from '../api';

const options = {
  headers: { 'Content-Type': 'application/json' },
};

export const SignInUser = (user) => {
  return axios.post(`${API}/auth/jwt/create/`, user, options);
};
