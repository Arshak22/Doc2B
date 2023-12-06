import React, { useState } from 'react';
import './style.css';

import { RxCross2 } from 'react-icons/rx';

export default function AddDivisionPopUp({ darkMode, close }) {
  const [division, setDivision] = useState('');
  const [error, setError] = useState('');
  const [submited, setSubmited] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setDivision(inputValue);

    setError(inputValue.trim() ? '' : 'Դաշտը պարտադիր է');
  };

  const handleSubmit = () => {
    if (!division.trim()) {
      setError('Դաշտը պարտադրի է');
    } else {
      setSubmited(true);
    }
  };

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
                  error ? ' inptError' : ''
                }`}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='staffInputSec NameInptSec'>
            <div>
              <label htmlFor='Division'>Ադմինիստրատորը</label>
              <select
                name='Division'
                id='Division'
                className={`${darkMode ? 'darkInpt' : ''}`}
                onChange={(e) => handleInputChange(e, 'division')}
              >
                <option value='Ստորաբաժանում 1'>Ադմինիստրատոր 1</option>
                <option value='Ստորաբաժանում 2'>Ադմինիստրատոր 2</option>
                <option value='Ստորաբաժանում 3'>Ադմինիստրատոր 3</option>
                <option value='Ստորաբաժանում 4'>Ադմինիստրատոր 4</option>
              </select>
            </div>
          </div>
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
