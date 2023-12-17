import axios from 'axios';
import { API } from '../api';

const options = {
  headers: { 'Content-Type': 'application/json' },
};

export const RefreshTokenRequest = (refreshToken) => {
  return axios.post(`${API}/auth/jwt/refresh/`, refreshToken, options);
};
