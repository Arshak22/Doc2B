import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const AddNewPosition = (position) => {
  return axios.post(`${API}/main/positions/`, position, options);
};

export const GetAllPositions = () => {
  return axios.get(`${API}/main/positions/`, options);
};

export const SearchPosition = (search) => {
  return axios.get(`${API}/main/positions/?&search=${search}`, options);
};

export const GetSinglePosition = (id) => {
  return axios.get(`${API}/main/positions/${id}/`, options);
};

export const UpdatePositionInfo = (id, position) => {
  return axios.put(`${API}/main/positions/${id}/`, position, options);
};

export const DeletePosition = (id) => {
  return axios.delete(`${API}/main/positions/${id}/`, options);
};
