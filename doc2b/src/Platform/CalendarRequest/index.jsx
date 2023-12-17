import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const GetCalendarEvents = () => {
  return axios.get(`${API}/main/events/`, options);
};

export const GetCalendarSingleEvent = (id) => {
  return axios.get(`${API}/main/events/${id}/`, options);
};

export const AddNewCalendarEvent = (event) => {
  return axios.post(`${API}/main/events/`, event, options);
};

export const UpdateSingleCalendarEvent = (id, event) => {
  return axios.put(`${API}/main/events/${id}/`, event, options);
};

export const DeleteCalendarEvent = (id) => {
  return axios.delete(`${API}/main/events/${id}/`, options);
};
