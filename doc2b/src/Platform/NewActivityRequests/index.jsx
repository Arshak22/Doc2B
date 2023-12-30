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

export const GetNewActivityTree = () => {
  return axios.get(`${API}/docflow/actions/`, options);
};

export const GetTreeTemplatesInfo = (employer_id, company_id, template_ids) => {
  const formattedTemplateIDs = template_ids.join(', ');
  return axios.get(
    `${API}/docflow/submit-templates/?employer_id=${employer_id ? employer_id : ''}&company_id=${company_id}&template_ids=[${formattedTemplateIDs}]`,
    options
  );
};

export const CreateDocument = (company_id, employer_id, data) => {
  return axios.post(
    `${API}/docflow/create_documents/?company_id=${company_id}&employer_id=${employer_id ? employer_id : ''}`,
    data,
    optionsForZip
  );
};
