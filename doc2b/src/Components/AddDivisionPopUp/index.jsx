import React, { useEffect, useState } from 'react';
import './style.css';

import { GetAllStaff } from '../../Platform/StaffRequests';
import { AddNewDepartment } from '../../Platform/DepartmentRequests';

import { RxCross2 } from 'react-icons/rx';

export default function AddDivisionPopUp({ darkMode, close }) {
  const [errors, setErrors] = useState({});
  const [adminsList, setAdminsList] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [inputs, setInputs] = useState({
    division: null,
    adminID: null,
  });

  const getAdminsList = async (id) => {
    const result = await GetAllStaff(id);
    if (result) {
      setAdminsList(result.data);
      if (result.data[1]) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          adminID: result.data[1].id,
        }));
      }
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('companyID');
    getAdminsList(id);
  }, []);

  const handleInputChange = (e, inputName) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setErrors({});

    const requiredFields = ['division'];

    const newInputs = { ...inputs };
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!newInputs[field]) {
        newErrors[field] = 'Դաշտը պարտադիր է';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newDivision = {
        "name": inputs.division,
        "company": parseInt(localStorage.getItem('companyID'), 10),
        "admin": inputs.adminID
      };
      console.log(newDivision);
      await AddNewDepartment(newDivision);
      setSubmited(true);
    }
  };

  useEffect(() => {
    setErrors([]);
  }, [adminsList]);

  return (
    <div
      className={
        'AddPopUp AddPositionPopUp AddDivisionPopUp' +
        (darkMode ? ' Dark DarkPopUp' : '')
      }
    >
      <button
        className={'event-closeBtn' + (darkMode ? ' whiteX' : '')}
        onClick={close}
      >
        <RxCross2 />
      </button>
      {!submited ? (
        <>
          <div className='staffInputSec NameInptSec'>
            <div>
              <label htmlFor='Division'>Ստորաբաժանում</label>
              <input
                type='text'
                name='Division'
                id='Division'
                className={`${darkMode ? ' darkInpt' : ''} ${
                  errors.division ? ' inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'division')}
              />
            </div>
          </div>
          {adminsList.length > 1 && (
            <div className='staffInputSec NameInptSec'>
              <div>
                <label htmlFor='Administrator'>Ադմինիստրատորը</label>
                <select
                  name='Administrator'
                  id='Division'
                  className={`${darkMode ? ' darkInpt' : ''} ${
                    errors.adminID ? ' inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'adminID')}
                >
                  {adminsList.slice(1).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.employer_first_name} {item.employer_last_name}{' '}
                      {item.employer_middle_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className='add-divison-btn'>
            <button className='welcome-btn' onClick={handleSubmit}>
              Ավելացնել
            </button>
          </div>
        </>
      ) : (
        <h3
          className={
            'submited-succesfully-popup' + (darkMode ? ' whiteElement' : '')
          }
        >
          Ստորաբաժանումն ավելացված է
        </h3>
      )}
    </div>
  );
}
