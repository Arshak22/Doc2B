import { React, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useGlobalContext } from '../../Context/Context';
import AddStaffPopUp from '../AddStaffPopUp';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';
import './style.css';

import StaffAvatar from '../../assets/Images/StaffAvatar.png';

import { ImCross } from 'react-icons/im';

import { DeleteStaff } from '../../Platform/StaffRequests';

export default function StaffMember({ currentItems, currentPage }) {
  const { setPopUpOpen, darkMode } = useGlobalContext();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

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
        await DeleteStaff(deletingId, localStorage.getItem('companyID'));
        setDeleteError('Աշխատողը հաջողությամբ ջնջված է');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setDeleteError('Դուք չեք կարող ջնջել այս աշխատողին');
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
            <div className='AddStaffMemberBlock AddStaffMobile'>
              <h3>
                Ավելացնել<br></br>Աշխատակից
              </h3>
              <button className='StaffPlusBtn'>+</button>
            </div>
          }
          position='top center'
          onOpen={() => setPopUpOpen(true)}
          onClose={() => setPopUpOpen(false)}
        >
          {(close) => <AddStaffPopUp darkMode={darkMode} close={close} />}
        </Popup>
      )}
      {currentItems &&
        currentItems.map((item, index) => {
          return (
            <div key={index}>
              {item.id === 0 ? (
                <Popup
                  trigger={
                    <div className='AddStaffMemberBlock'>
                      <h3>
                        Ավելացնել<br></br>Աշխատակից
                      </h3>
                      <button className='StaffPlusBtn'>+</button>
                    </div>
                  }
                  position='top center'
                  onOpen={() => setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                >
                  {(close) => (
                    <AddStaffPopUp darkMode={darkMode} close={close} />
                  )}
                </Popup>
              ) : (
                <div
                  className={
                    'staffMember' + (darkMode ? ' darkStaffMember' : '')
                  }
                >
                  <NavLink to={ROUTE_NAMES.STAFFMEMBER + item.id}>
                    <img
                      src={
                        item.employer_image ? item.employer_image : StaffAvatar
                      }
                      alt='staffAvatar'
                      className={
                        'staffMemberPic' +
                        (item.employer_image ? ' staffAvatar' : '')
                      }
                    />
                  </NavLink>
                  <NavLink to={ROUTE_NAMES.STAFFMEMBER + item.id}>
                    <div className='staffMemberInfo'>
                      <h4>{truncateText(item.department_name, 14)}</h4>
                      <h3>{item.employer_first_name}</h3>
                      <h3>{item.employer_last_name}</h3>
                      <h2>{truncateText(item.position_name, 12)}</h2>
                      <h5
                        className={
                          item.employer_status === 'Admin'
                            ? 'adminStatus'
                            : item.employer_status === 'Standart'
                            ? 'standartStatus'
                            : 'userStatus'
                        }
                      >
                        {item.employer_status}
                      </h5>
                    </div>
                  </NavLink>
                  <div className='three-dots staff-three-dots'>
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
        {!deleteError ? 'Ցանկանու՞մ եք ջնջել տվյալ աշխատողին' : deleteError}
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
