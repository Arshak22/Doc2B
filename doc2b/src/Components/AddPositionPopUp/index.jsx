import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx';
import './style.css';

export default function AddPositionPopUp({ darkMode, close }) {
  const defaultGorcaruytBlocks = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    content: '',
  }));

  const [position, setPosition] = useState('');
  const [gorcaruytBlocks, setGorcaruytBlocks] = useState(
    defaultGorcaruytBlocks
  );
  const [errors, setErrors] = useState({ position: '', gorcaruyt: {} });
  const [submited, setSubmited] = useState(false);

  const addMoreGorcaruyt = () => {
    setGorcaruytBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: Date.now(), content: '' },
    ]);
  };

  const deleteGorcaruyt = (id) => {
    setGorcaruytBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.id !== id)
    );
  };

  const handleContentChange = (id, newContent) => {
    setGorcaruytBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      gorcaruyt: {
        ...prevErrors.gorcaruyt,
        [id]: newContent.trim() ? '' : 'Դաշտը պարտադրի է',
      },
    }));
  };

  const handlePositionChange = (e) => {
    const inputValue = e.target.value;
    setPosition(inputValue);

    setErrors((prevErrors) => ({
      ...prevErrors,
      position: inputValue.trim() ? '' : 'Դաշտը պարտադրի է',
    }));
  };

  const handleSubmit = () => {
    setErrors({});

    const requiredFields = ['Position'];

    const newBlocks = [...gorcaruytBlocks];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newBlocks[0].content) {
        newErrors[field] = 'Դաշտը պարտադրի է';
      }
    });

    const gorcaruytErrors = {};
    newBlocks.forEach((block) => {
      if (!block.content) {
        gorcaruytErrors[block.id] = 'Դաշտը պարտադրի է';
      }
    });

    if (
      Object.keys(newErrors).length > 0 ||
      Object.keys(gorcaruytErrors).length > 0
    ) {
      setErrors({ ...newErrors, gorcaruyt: gorcaruytErrors });
    } else {
      setSubmited(true);
    }
  };

  return (
    <div
      className={
        'AddPopUp AddPositionPopUp' + (darkMode ? ' Dark DarkPopUp' : '')
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
          <div className='singleStaffRow'>
            <div className='staffInputSec NameInptSec'>
              <div>
                <label htmlFor='Position'>Պաշտոնը</label>
                <input
                  type='text'
                  name='Position'
                  id='Position'
                  className={`${darkMode ? ' darkInpt' : ''} ${
                    errors.position ? ' inptError' : ''
                  }`}
                  onChange={handlePositionChange}
                />
              </div>
            </div>
          </div>
          <div className='gorcaruyt-popup-section'>
            {gorcaruytBlocks.map((block) => (
              <div
                key={block.id}
                className={
                  'gorcaruyt-block popup-gorcaruyt' +
                  (darkMode ? ' darkInpt' : '')
                }
              >
                <textarea
                  name=''
                  id=''
                  rows='2'
                  placeholder='Գործառույթ'
                  className={`${darkMode ? ' darkInpt2' : ''} ${
                    gorcaruytBlocks.length > 3 ? ' shortTextarea' : ''
                  } ${
                    errors.gorcaruyt && errors.gorcaruyt[block.id]
                      ? ' inptError'
                      : ''
                  }`}
                  value={block.content}
                  onChange={(e) =>
                    handleContentChange(block.id, e.target.value)
                  }
                ></textarea>
                {gorcaruytBlocks.length > 3 && (
                  <button
                    className='delete-gorcaruyt'
                    onClick={() => deleteGorcaruyt(block.id)}
                  >
                    <ImCross />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div>
            <button className='add-more-gorcaruyt' onClick={addMoreGorcaruyt}>
              +
            </button>
          </div>
          <div className='add-gorcaruyt-btn'>
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
          Պաշտոնն ավելացված է
        </h3>
      )}
    </div>
  );
}
