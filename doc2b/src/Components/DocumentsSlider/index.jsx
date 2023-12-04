import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';
import { useGlobalContext } from '../../Context/Context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

import Document from '../../assets/Images/Document.png';
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

  return !openDelete ? (
    <div className='sliderSection'>
      {documnets.map((elem, index) => {
        const dateParts = elem.date.split(' ');
        return (
          <div
            className={
              !elem.category
                ? 'document'
                : 'document application' + (darkMode ? ' lightDark' : '')
            }
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
                    <li>Ներբեռնել</li>
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
            <NavLink to={ROUTE_NAMES.ACTIVITY + '1'}>
              <h2>{truncateText(elem.name, 41)}</h2>
            </NavLink>
            <NavLink to={ROUTE_NAMES.ACTIVITY + '1'}>
              <h4>{elem.person}</h4>
            </NavLink>
            <h3>
              <span>{dateParts[0]}</span> {dateParts[1]}{' '}
              <span>{dateParts[2]}</span>
            </h3>
            {!elem.category ? (
              <img
                src={Document}
                alt={`document${index}`}
                className='documentPic'
              />
            ) : elem.category === 'Accepted' ? (
              <img
                src={DocumentAccepted}
                alt={`document${index}`}
                className='documentPic'
              />
            ) : elem.category === 'Declined' ? (
              <img
                src={DocumentDeclined}
                alt={`document${index}`}
                className='documentPic'
              />
            ) : elem.category === 'In Process' ? (
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
          <button className='save-staff-edit'>Այո</button>
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
