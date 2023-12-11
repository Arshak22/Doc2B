import { React, useState, useEffect } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';
import Popup from 'reactjs-popup';
import AddPositionPopUp from '../AddPositionPopUp';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';

import { ImCross } from 'react-icons/im';

import PositionIcon from '../../assets/Icons/PositionIcon.png';

import { DeletePosition } from '../../Platform/PositionRequests';

export default function Position({ currentItems, currentPage }) {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {}, [openDelete]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 2) + '..';
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await DeletePosition(deletingId);
        setDeleteError('Պաշտոնը հաջողությամբ ջնջված է');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setDeleteError('Դուք չեք կարող ջնջել այս պաշտոնը');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  return !openDelete ? (
    <div className='staffList'>
      {currentPage === 0 ? null : (
        <Popup
          trigger={
            <div className='AddStaffMemberBlock AddStaffMobile AddCompany AddPosition'>
              <h3>
                Ավելացնել<br></br>Պաշտոն
              </h3>
              <button className='StaffPlusBtn'>+</button>
            </div>
          }
          position='top center'
          onOpen={() => setPopUpOpen(true)}
          onClose={() => setPopUpOpen(false)}
        >
          {(close) => <AddPositionPopUp darkMode={darkMode} close={close} />}
        </Popup>
      )}
      {currentItems &&
        currentItems.map((item, index) => {
          return (
            <div key={index}>
              {item.id === 0 ? (
                <Popup
                  trigger={
                    <div className='AddStaffMemberBlock AddCompany AddPosition'>
                      <h3>
                        Ավելացնել<br></br>Պաշտոն
                      </h3>
                      <button className='StaffPlusBtn'>+</button>
                    </div>
                  }
                  position='top center'
                  onOpen={() => setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                >
                  {(close) => (
                    <AddPositionPopUp darkMode={darkMode} close={close} />
                  )}
                </Popup>
              ) : (
                <div
                  className={
                    'staffMember singlePosition' +
                    (darkMode ? ' darkStaffMember' : '')
                  }
                >
                  <NavLink to={ROUTE_NAMES.POSITION + item.id}>
                    <img
                      src={PositionIcon}
                      alt='PositionIcon'
                      className='PositionIcon'
                    />
                    <div className='staffMemberInfo comanyInfo'>
                      <h3 className='positionName'>
                        {truncateText(item.name, 18)}
                      </h3>
                    </div>
                  </NavLink>
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
  );
}
