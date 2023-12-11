import React, { useState } from 'react';
import './style.css';
import { ImCross } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx';
import { UpdatePositionInfo } from '../../Platform/PositionRequests';

export default function AddFunctioalitiesPopUp({
  darkMode,
  close,
  id,
  positionName,
  functionalities,
}) {
  const defaultGorcaruytBlocks = Array.from({ length: 1 }, (_, index) => ({
    id: index + 1,
    content: '',
  }));

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

  const handleSubmit = async () => {
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
      const newPosition = {
        name: positionName,
        functional: {},
      };

      if (functionalities.length > 0) {
        functionalities.forEach((value, index) => {
          const propName = `additionalProp${index + 1}`;
          newPosition.functional[propName] = value;
        });
      }

      let totalIndex = functionalities.length;
      gorcaruytBlocks.forEach((value) => {
        const propName = `additionalProp${totalIndex + 1}`;
        newPosition.functional[propName] = value.content;
        totalIndex++;
      });

      await UpdatePositionInfo(id, newPosition);
      window.location.reload();
    }
  };

  return (
    <div
      className={
        'AddPopUp AddPositionPopUp AddFunctionalityPopUp' + (darkMode ? ' Dark DarkPopUp' : '')
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
          Գործառությներն ավելացված են
        </h3>
      )}
    </div>
  );
}
