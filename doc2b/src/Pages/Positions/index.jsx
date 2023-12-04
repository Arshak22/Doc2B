import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from '../../Context/Context';
import Popup from 'reactjs-popup';
import AddPositionPopUp from '../../Components/AddPositionPopUp';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';

import MyEventCalendar from '../../Components/MyEventCalendar';
import Position from '../../Components/Position';

import PositionIcon from '../../assets/Icons/PositionIcon.png';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

export default function Positions() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const positions = [];
  // const positions = [
  //   {
  //     id: 0,
  //   },
  //   {
  //     id: 1,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 2,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 3,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 4,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 5,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 6,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 7,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 8,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 9,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 10,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 11,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 12,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 13,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 14,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 1,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 2,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 3,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 4,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 5,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 6,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 7,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 8,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 9,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 10,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 11,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 12,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 13,
  //     name: 'Պաշտոն',
  //   },
  //   {
  //     id: 14,
  //     name: 'Պաշտոն',
  //   },
  // ];

  const handlePageClick = (event) => {
    // Calculate the new offset based on the selected page
    const newOffset = event.selected * itemsPerPage;
    const endOffset = newOffset + itemsPerPage;
    const current = positions.slice(newOffset, endOffset);
    const count = Math.ceil(positions.length / itemsPerPage);
    setItemOffset(newOffset);
    setPageCount(count);
    setCurrentItems(current);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const current = positions.slice(0, itemsPerPage);
    const count = Math.ceil(positions.length / itemsPerPage);
    setPageCount(count);
    setCurrentItems(current);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.querySelectorAll('.page-item .page-link').forEach((item) => {
        item.style.backgroundColor = '#262626';
        item.style.border = '1px solid #393939';
        item.style.color = '#ffffff';
      });
    } else {
      document.querySelectorAll('.page-item .page-link').forEach((item) => {
        item.style.backgroundColor = '#F5F7FA';
        item.style.border = '1px solid #d6d6d6';
        item.style.color = '#000000';
      });
    }
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      const liElements = pagination.querySelectorAll('li');
      if (liElements.length === 3) {
        pagination.style.display = 'none';
      } else {
        pagination.style.display = 'flex';
      }
    }
  }, [darkMode, currentItems, currentPage]);

  return (
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {positions.length > 1 ? (
          <>
            <div className='InputContainer'>
              <div>
                <Popup
                  trigger={
                    <div>
                      {currentPage > 0 ? (
                        <button className='secondary-add-staff-btn secondary-add-comany-btn'>
                          Ավելացնել Պաշտոն <span>+</span>
                        </button>
                      ) : null}
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
              </div>
              <div className='staff-filter-section'>
                <div>
                  <input
                    type='text'
                    placeholder='Փնտրել'
                    name='Փնտրել'
                    className={
                      'inpts headerInpt' + (darkMode ? ' darkInpt' : '')
                    }
                  />
                  <ImSearch
                    className={
                      'passwordIcon searchIcon' + (darkMode ? ' whiteIcon' : '')
                    }
                  />
                </div>
              </div>
            </div>
            <>
              <Position currentItems={currentItems} currentPage={currentPage} />
              <ReactPaginate
                nextLabel={<IoIosArrowForward className='paginationArrows' />}
                previousLabel={<IoIosArrowBack className='paginationArrows' />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
                renderOnZeroPageCount={null}
              />
            </>
          </>
        ) : (
          <div className='no-staff-content'>
            <div className='welcome-section'>
              <h5>Դուք դեռ չունեք</h5>
              <h3 className={darkMode ? ' whiteElement' : ''}>Պաշտոններ</h3>
            </div>
            <div
              className={
                'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
              }
            >
              <img src={PositionIcon} alt='PositionIcon' />
              <h5>Ավելացրեք պաշտոններ, և կարգավորեք դրանք համակարգում</h5>
            </div>
            <div>
              <Popup
                trigger={<button className='welcome-btn'>Ավելացնել</button>}
                position='top center'
                onOpen={() => setPopUpOpen(true)}
                onClose={() => setPopUpOpen(false)}
              >
                {(close) => (
                  <AddPositionPopUp darkMode={darkMode} close={close} />
                )}
              </Popup>
            </div>
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
