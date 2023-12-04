import axios from 'axios';
import { API } from '../api';

const options = {
  headers: { 'Content-Type': 'application/json' },
};

export const ResetPassword = (email) => {
  return axios.post(`${API}/auth/users/reset_password/`, email, options);
};

export const ConfirmResetPassword = (user) => {
  return axios.post(`${API}/auth/users/reset_password_confirm/`, user, options);
};
