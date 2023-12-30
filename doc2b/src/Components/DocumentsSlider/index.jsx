import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';
import { useGlobalContext } from '../../Context/Context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

import {
  DeleteActivity,
  DownloadDocuments,
} from '../../Platform/ActivityRequest';

import DocumentAccepted from '../../assets/Images/DocumentAccepted.png';
import DocumentDeclined from '../../assets/Images/DocumentDeclined.png';
import DocumentInProcess from '../../assets/Images/DocumentInProcess.png';

import { HiDotsHorizontal } from 'react-icons/hi';

export default function DocumentSlider({ documnets }) {
  const { darkMode } = useGlobalContext();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [menuVisible, setMenuVisible] = useState([]);
  const menuRefs = useRef([]);

  useEffect(() => {
    setMenuVisible(new Array(documnets.length).fill(false));
    menuRefs.current = menuRefs.current.slice(0, documnets.length);
  }, [documnets.length]);

  const toggleMenu = (index) => {
    const updatedMenuVisible = [...menuVisible];
    updatedMenuVisible[index] = !updatedMenuVisible[index];
    setMenuVisible(updatedMenuVisible);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 2) + '..';
    }
  };

  const handleDownload = async (id, documentName) => {
    try {
      const response = await DownloadDocuments(id);
      console.log(response.data);
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${documentName}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await DeleteActivity(deletingId, localStorage.getItem('companyID'));
        setDeleteError('Փաստաթուղթը հաջողությամբ ջնջված է');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setDeleteError('Դուք չեք կարող ջնջել այս փաստաթուղթը');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  return !openDelete ? (
    <div className='sliderSection'>
      {documnets.map((elem, index) => {
        const dateParts = elem.created_at.split('-');
        return (
          <div
            className={'document application' + (darkMode ? ' lightDark' : '')}
            key={index}
          >
            <div className='three-dots'>
              <HiDotsHorizontal
                className={
                  'three-dots-icon' + (darkMode ? ' darkModeThreeDots' : '')
                }
                onClick={() => toggleMenu(index)}
              />
              {menuVisible[index] && (
                <div
                  className='dots-menu'
                  ref={(el) => (menuRefs.current[index] = el)}
                >
                  <ul>
                    <NavLink to={ROUTE_NAMES.ACTIVITY + elem.id}>
                      <li>Դիտել</li>
                    </NavLink>
                    <li onClick={() => handleDownload(elem.id, elem.name)}>
                      Ներբեռնել
                    </li>
                    <li
                      onClick={() => {
                        setDeletingId(elem.id);
                        setOpenDelete(true);
                      }}
                    >
                      Ջնջել
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <NavLink to={ROUTE_NAMES.ACTIVITY + elem.id}>
              <h2>{truncateText(elem.name, 30)}</h2>
            </NavLink>
            <NavLink to={ROUTE_NAMES.ACTIVITY + elem.id}>
              {elem.employer ? (
                <h4>
                  {elem.employer.employer_first_name.charAt(0)}.{' '}
                  {elem.employer.employer_last_name}
                </h4>
              ) : null}
            </NavLink>
            <h3>
              <span>{dateParts[2]}</span>
              {' - '}
              {dateParts[1]}
              {' - '}
              <span>{dateParts[0]}</span>
            </h3>
            {elem.status === true ? (
              <img
                src={DocumentAccepted}
                alt={`document${index}`}
                className='documentPic'
              />
            ) : elem.status === false ? (
              <img
                src={DocumentDeclined}
                alt={`document${index}`}
                className='documentPic'
              />
            ) : elem.status === null ? (
              <img
                src={DocumentInProcess}
                alt={`document${index}`}
                className='documentPic'
              />
            ) : null}
          </div>
        );
      })}
    </div>
  ) : (
    <div className='delete-confirm-section'>
      <h3 className={darkMode ? ' whiteElement' : ''}>
        {!deleteError ? 'Ցանկանու՞մ եք ջնջել տվյալ փաստաթուղթը' : deleteError}
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
