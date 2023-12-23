import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import Popup from 'reactjs-popup';
// import AddPositionPopUp from '../../Components/AddPositionPopUp';
import AddFunctioalitiesPopUp from '../../Components/AddFunctionalitiesPopUp';
import { useGlobalContext } from '../../Context/Context';

import MyEventCalendar from '../../Components/MyEventCalendar';
import PreLoader from '../../Components/PreLoader';

import {
  GetSinglePosition,
  UpdatePositionInfo,
  DeletePosition,
} from '../../Platform/PositionRequests';

import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { ImCross } from 'react-icons/im';

export default function SinglePosition() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const [positionName, setPositionName] = useState(null);
  const [functionalities, setFunctionalities] = useState([]);

  const getPositionInfo = async (id) => {
    try {
      const result = await GetSinglePosition(id);
      if (result) {
        setPositionName(result.data.name);
        const functionalitiesArray = Object.values(result.data.functional);
        setFunctionalities(functionalitiesArray);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    getPositionInfo(id);
  }, [id, editMode]);

  const handleDelete = async () => {
    try {
      await DeletePosition(id);
      setDeleteError('Պաշտոնը հաջողությամբ ջնջված է');
    } catch (error) {
      setDeleteError('Դուք չեք կարող ջնջել այս պաշտոնը');
    }
  };

  const handlePositionNameChange = (e) => {
    if (e.target.value && e.target.value !== '') {
      setPositionName(e.target.value);
    }
  };

  const handleTextareaChange = (index, event) => {
    const updatedFunctionalities = [...functionalities];
    updatedFunctionalities[index] = event.target.value;
    setFunctionalities(updatedFunctionalities);
  };

  const handleDeleteFunctional = async (index) => {
    setFunctionalities((prevFunctionalities) => {
      const updatedFunctionalities = [...prevFunctionalities];
      updatedFunctionalities.splice(index, 1);

      const newPosition = {
        name: positionName,
        functional: {},
      };

      updatedFunctionalities.forEach((value, index) => {
        const propName = `additionalProp${index + 1}`;
        newPosition.functional[propName] = value;
      });

      setFunctionalities(updatedFunctionalities);
      setLoading(true);
      UpdatePositionInfo(id, newPosition).then(() => { 
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });

      return updatedFunctionalities;
    });
  };

  useEffect(() => {
  }, [functionalities]);

  const handleSubmit = async () => {
    const newPosition = {
      name: positionName,
      functional: {},
    };

    functionalities.forEach((value, index) => {
      const propName = `additionalProp${index + 1}`;
      newPosition.functional[propName] = value;
    });
    try {
      setLoading(true);
      await UpdatePositionInfo(id, newPosition);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setEditMode(false);
    } catch (error) {}
  };

  const closeEdit = () => {
    setPositionName(null);
    setFunctionalities([]);
    setEditMode(false);

  };

  return (
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {loading ? (
          <PreLoader />
        ) : !openDelete ? (
          <>
            <div className='singleStaffRow'>
              {!editMode ? (
                <h3
                  className={
                    'SinglePositionName' + (darkMode ? ' whiteElement' : '')
                  }
                >
                  {positionName}
                </h3>
              ) : (
                <div className='staffInputSec NameInptSec'>
                  <div>
                    <label htmlFor='Position'>Պաշտոնը</label>
                    <input
                      type='text'
                      name='Position'
                      id='Position'
                      defaultValue={positionName}
                      className={darkMode ? ' darkInpt' : ''}
                      onChange={(e) => handlePositionNameChange(e)}
                    />
                  </div>
                </div>
              )}
              <div className='single-position-edit'>
                {!editMode ? (
                  <button
                    className='welcome-btn staff-edit-button'
                    onClick={handleEditMode}
                  >
                    Խմբագրել <AiFillEdit />
                  </button>
                ) : (
                  <div className='staff-edit-group-btns'>
                    <button className='save-staff-edit' onClick={handleSubmit}>
                      <ImCheckmark />
                    </button>
                    <button
                      className='cancel-staff-edit'
                      onClick={closeEdit}
                    >
                      <ImCross />
                    </button>
                  </div>
                )}
              </div>
              {!editMode ? (
                <Popup
                  trigger={
                    <div className='add-gorcaruyt'>
                      <button className='secondary-add-staff-btn secondary-add-gorcaruyt-btn'>
                        Ավելացնել Գործառույթ<span>+</span>
                      </button>
                    </div>
                  }
                  position='top center'
                  onOpen={() => setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                >
                  {(close) => (
                    <AddFunctioalitiesPopUp darkMode={darkMode} close={close} id={id} positionName={positionName} functionalities={functionalities}/>
                  )}
                </Popup>
              ) : null}
            </div>
            <div className='singleStaffRow'>
              <h4 className={'allTheStaff' + (darkMode ? ' whiteElement' : '')}>
                Բոլոր Գործառույթները
              </h4>
            </div>
            <div className='AllTheStaffSection'>
              <div className='staff-col'>
                {functionalities &&
                  functionalities
                    .slice(0, Math.ceil(functionalities.length / 2))
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            'gorcaruyt-block' +
                            (editMode ? ' edit-gorcaruyt' : '') +
                            (darkMode ? ' darkInpt' : '')
                          }
                        >
                          <h3>
                            Գործառույթ{' '}
                            <span className='numbers'>{index + 1}</span>
                          </h3>
                          {!editMode ? (
                            <p>{item}</p>
                          ) : (
                            <>
                              <textarea
                                name=''
                                id=''
                                rows='2'
                                defaultValue={item}
                                onChange={(event) =>
                                  handleTextareaChange(index, event)
                                }
                                className={darkMode ? ' darkInpt2' : ''}
                              ></textarea>
                              <button
                                className='delete-gorcaruyt'
                                onClick={() => handleDeleteFunctional(index)}
                              >
                                <ImCross />
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
              </div>
              <div className='staff-col'>
                {functionalities &&
                  functionalities
                    .slice(Math.ceil(functionalities.length / 2))
                    .map((item, index) => {
                      const actualIndex =
                        index + Math.ceil(functionalities.length / 2);
                      return (
                        <div
                          key={actualIndex}
                          className={
                            'gorcaruyt-block' +
                            (editMode ? ' edit-gorcaruyt' : '') +
                            (darkMode ? ' darkInpt' : '')
                          }
                        >
                          <h3>
                            Գործառույթ{' '}
                            <span className='numbers'>{actualIndex + 1}</span>
                          </h3>
                          {!editMode ? (
                            <p>{item}</p>
                          ) : (
                            <>
                              <textarea
                                name=''
                                id=''
                                rows='2'
                                defaultValue={item}
                                onChange={(event) =>
                                  handleTextareaChange(actualIndex, event)
                                }
                                className={darkMode ? ' darkInpt2' : ''}
                              ></textarea>
                              <button
                                className='delete-gorcaruyt'
                                onClick={() =>
                                  handleDeleteFunctional(actualIndex)
                                }
                              >
                                <ImCross />
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
              </div>
            </div>
            {editMode ? (
              <div style={{marginLeft: '-10px'}}>
                <button
                  className='delete-button'
                  onClick={() => setOpenDelete(true)}
                >
                  Ջնջել
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className='delete-confirm-section'>
            <h3 className={darkMode ? ' whiteElement' : ''}>
              {!deleteError ? 'Ցանկանու՞մ եք ջնջել տվյալ պաշտոնը' : deleteError}
            </h3>
            {!deleteError ? (
              <div>
                <button className='save-staff-edit' onClick={handleDelete}>
                  Այո
                </button>
                <button
                  className='cancel-staff-edit'
                  onClick={() => setOpenDelete(false)}
                >
                  Ոչ
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className='groupedSideBlocks'>
        <div className='AddsSection adds_2'></div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
