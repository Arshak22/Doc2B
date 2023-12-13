import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from '../../Context/Context';
import Popup from 'reactjs-popup';
import AddPositionPopUp from '../../Components/AddPositionPopUp';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import PreLoader from '../../Components/PreLoader';

import MyEventCalendar from '../../Components/MyEventCalendar';
import Position from '../../Components/Position';

import PositionIcon from '../../assets/Icons/PositionIcon.png';

import {
  GetAllPositions,
  SearchPosition,
} from '../../Platform/PositionRequests';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

export default function Positions() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchAtribute, setSearchAtribute] = useState(null);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const [positions, setPositions] = useState([]);

  const getPositionsList = async () => {
    const result = await GetAllPositions();
    if (result) {
      setPositions(result.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getPositionsList();
  }, []);

  const handleSearch = async () => {
    if (searchAtribute && searchAtribute !== '') {
      try {
        setLoading(true);
        const result = await SearchPosition(searchAtribute);
        if (result) {
          if (result.data.length <= 1) {
            setSearchResultEmpty(true);
          } else {
            setSearchResultEmpty(false);
          }
          setPositions(result.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      } catch (error) {}
    } else {
      setLoading(true);
      getPositionsList();
      setSearchResultEmpty(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageClick = (event) => {
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
  }, [positions]);

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
  }, [darkMode, currentItems, currentPage, loading]);

  return (
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {loading ? (
          <PreLoader />
        ) : positions.length > 1 && !searchResultEmpty ? (
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
                    value={searchAtribute ? searchAtribute : null}
                    className={
                      'inpts headerInpt' + (darkMode ? ' darkInpt' : '')
                    }
                    onChange={(e) => setSearchAtribute(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <ImSearch
                    className={
                      'passwordIcon searchIcon' + (darkMode ? ' whiteIcon' : '')
                    }
                    onClick={handleSearch}
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
        ) : searchResultEmpty ? (
          <>
            <div className='InputContainer InputContainerRight'>
              <div className='staff-filter-section'>
                <div>
                  <input
                    type='text'
                    placeholder='Փնտրել'
                    name='Փնտրել'
                    value={searchAtribute ? searchAtribute : null}
                    className={
                      'inpts headerInpt' + (darkMode ? ' darkInpt' : '')
                    }
                    onChange={(e) => setSearchAtribute(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <ImSearch
                    className={
                      'passwordIcon searchIcon' + (darkMode ? ' whiteIcon' : '')
                    }
                    onClick={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className='delete-confirm-section'>
              <h3 className={darkMode ? ' whiteElement' : ''}>
                Որոնման արդյունքը դատարկ է
              </h3>
            </div>
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
