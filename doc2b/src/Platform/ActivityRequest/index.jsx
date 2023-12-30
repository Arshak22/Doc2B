import axios from 'axios';
import { API, getToken } from '../api';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

const optionsForZip = {
  responseType: 'arraybuffer',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const GetActivities = (company_id) => {
  return axios.get(
    `${API}/docflow/docactions/?company_id=${company_id}`,
    options
  );
};

export const SearchActivities = (company_id, search) => {
  return axios.get(
    `${API}/docflow/docactions/?company_id=${company_id}&search=${search}`,
    options
  );
};

export const FilterActivities = (company_id, status) => {
  const formattedStatus = status.join(', ');
  return axios.get(
    `${API}/docflow/docactions/?company_id=${company_id}&status=[${formattedStatus}]`,
    options
  );
};

export const GetSingleActivity = (id, company_id) => {
  return axios.get(
    `${API}/docflow/docactions/${id}/?company_id=${company_id}`,
    options
  );
};

export const DownloadDocuments = (id) => {
  return axios.get(
    `${API}/docflow/docaction-temp-document/${id}/`,
    optionsForZip
  );
};

export const DeleteActivity = (id, company_id) => {
  return axios.delete(
    `${API}/docflow/docactions/${id}/?company_id=${company_id}`,
    options
  );
};
