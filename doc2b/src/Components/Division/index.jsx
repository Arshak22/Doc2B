import { React, useState, useEffect } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';
import AddDivisionPopUp from '../AddDivisionPopUp';
import Popup from 'reactjs-popup';

import { ImCross } from 'react-icons/im';

import DivisionIcon from '../../assets/Icons/DivisionIcon.png';

import { DeleteDepartment } from '../../Platform/DepartmentRequests';

export default function Division({ currentItems, currentPage }) {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await DeleteDepartment(deletingId);
        setDeleteError('Ստորաբաժանումը հաջողությամբ ջնջված է');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setDeleteError('Դուք չեք կարող ջնջել այս ստորաբաժանումը');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  useEffect(() => {}, [openDelete]);

  return !openDelete ? (
    <div className='staffList'>
      {currentPage === 0 ? null : (
        <Popup
          trigger={
            <div className='AddStaffMemberBlock AddStaffMobile AddDivision'>
              <h3>
                Ավելացնել<br></br>Ստորաբաժանում
              </h3>
              <button className='StaffPlusBtn'>+</button>
            </div>
          }
          position='top center'
          onOpen={() => setPopUpOpen(true)}
          onClose={() => setPopUpOpen(false)}
        >
          {(close) => <AddDivisionPopUp darkMode={darkMode} close={close} />}
        </Popup>
      )}
      {currentItems &&
        currentItems.map((item, index) => {
          return (
            <div key={index}>
              {item.id === 0 ? (
                <Popup
                  trigger={
                    <div className='AddStaffMemberBlock AddDivision'>
                      <h3>
                        Ավելացնել<br></br>Ստորաբաժանում
                      </h3>
                      <button className='StaffPlusBtn'>+</button>
                    </div>
                  }
                  position='top center'
                  onOpen={() => setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                >
                  {(close) => (
                    <AddDivisionPopUp darkMode={darkMode} close={close} />
                  )}
                </Popup>
              ) : (
                <div
                  className={
                    'staffMember singleComany singleDivision' +
                    (darkMode ? ' darkStaffMember' : '')
                  }
                >
                  <img
                    src={DivisionIcon}
                    alt='DivisionIcon'
                    className='DivisionIcon'
                  />
                  <div className='staffMemberInfo comanyInfo'>
                    <h3 className='DivisionName'>{item.name}</h3>
                  </div>
                  <div className='three-dots staff-three-dots position-three-dots'>
                    <div className='staff-edit-group-btns pagination-element-action-buttons'>
                      <button
                        className={
                          'delete-element' + (darkMode ? ' dark-delete' : '')
                        }
                      >
                        <ImCross
                          onClick={() => {
                            setDeletingId(item.id);
                            setOpenDelete(true);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  ) : (
    <div className='delete-confirm-section'>
      <h3 className={darkMode ? ' whiteElement' : ''}>
        {!deleteError
          ? 'Ցանկանու՞մ եք ջնջել տվյալ ստորաբաժանումը'
          : deleteError}
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
  );
}
