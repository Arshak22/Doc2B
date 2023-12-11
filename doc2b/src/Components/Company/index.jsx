import { React, useState, useEffect } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';
import AddCompanyPopUp from '../AddCompanyPopUp';
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';

import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { DeleteCompnay } from '../../Platform/CompanyRequests';

import { ImCross } from 'react-icons/im';

export default function Company({ currentItems, currentPage }) {
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
        await DeleteCompnay(deletingId);
        setDeleteError('Կազմակերպությունը հաջողությամբ ջնջված է');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setDeleteError('Դուք չեք կարող ջնջել այս կազմակերպությունը');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  return !openDelete ? (
    <>
      <div className='staffList'>
        {currentPage === 0 ? null : (
          <Popup
            trigger={
              <div className='AddStaffMemberBlock AddStaffMobile AddCompany'>
                <h3>
                  Ավելացնել<br></br>Կազմակերպություն
                </h3>
                <button className='StaffPlusBtn'>+</button>
              </div>
            }
            position='top center'
            onOpen={() => setPopUpOpen(true)}
            onClose={() => setPopUpOpen(false)}
          >
            {(close) => <AddCompanyPopUp darkMode={darkMode} close={close} />}
          </Popup>
        )}

        {currentItems &&
          currentItems.map((item, index) => {
            return (
              <div key={index}>
                {item.id === 0 ? (
                  <Popup
                    trigger={
                      <div className='AddStaffMemberBlock AddCompany'>
                        <h3>
                          Ավելացնել<br></br>Կազմակերպություն
                        </h3>
                        <button className='StaffPlusBtn'>+</button>
                      </div>
                    }
                    position='top center'
                    onOpen={() => setPopUpOpen(true)}
                    onClose={() => setPopUpOpen(false)}
                  >
                    {(close) => (
                      <AddCompanyPopUp darkMode={darkMode} close={close} />
                    )}
                  </Popup>
                ) : (
                  <div
                    className={
                      'staffMember singleComany' +
                      (darkMode ? ' darkStaffMember' : '')
                    }
                  >
                    <NavLink to={ROUTE_NAMES.COMPANY + item.id}>
                      <img
                        src={CaseIcon}
                        alt='CaseIcon'
                        className='CompanyIcon'
                      />
                      <div className='staffMemberInfo comanyInfo'>
                        <h3 className='companyHead'>
                          {truncateText(
                            `${item.company_director_first_name.charAt(0)}. ${
                              item.company_director_last_name
                            }`,
                            15
                          )}
                        </h3>
                        <h3 className='comanyName'>
                          {truncateText(item.company_name, 14)}
                        </h3>
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
    </>
  ) : (
    <div className='delete-confirm-section'>
      <h3 className={darkMode ? ' whiteElement' : ''}>
        {!deleteError
          ? 'Ցանկանու՞մ եք ջնջել տվյալ կազմակերպությունը'
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
