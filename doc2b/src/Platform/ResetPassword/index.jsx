import axios from 'axios';
import { API, getToken } from '../api';

const optionsForChangePass = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

const options = {
  headers: { 'Content-Type': 'application/json' },
};

export const ResetPassword = (email) => {
  return axios.post(`${API}/auth/users/reset_password/`, email, options);
};

export const ConfirmResetPassword = (user) => {
  return axios.post(`${API}/auth/users/reset_password_confirm/`, user, options);
};

export const ResetPasswordFromProfile = (passwords) => {
  return axios.post(
    `${API}/auth/users/set_password/`,
    passwords,
    optionsForChangePass
  );
};
