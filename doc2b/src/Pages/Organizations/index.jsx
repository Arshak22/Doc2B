import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from '../../Context/Context';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import Popup from 'reactjs-popup';
import PreLoader from '../../Components/PreLoader';
import './style.css';

import MyEventCalendar from '../../Components/MyEventCalendar';
import Company from '../../Components/Company';

import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

import {
  GetAllCompanies,
  SearchCompanies,
} from '../../Platform/CompanyRequests';

export default function Organization() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchAtribute, setSearchAtribute] = useState(null);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const [companies, setCompanies] = useState([]);

  const getCompaniesList = async () => {
    try {
      const result = await GetAllCompanies();
      if (result) {
        setCompanies(result.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

  const handleSearch = async () => {
    if (searchAtribute && searchAtribute !== '') {
      try {
        setLoading(true);
        const result = await SearchCompanies(searchAtribute);
        if (result) {
          if (result.data.length <= 1) {
            setSearchResultEmpty(true);
          } else {
            setSearchResultEmpty(false);
          }
          setCompanies(result.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      } catch (error) {}
    } else {
      setLoading(true);
      getCompaniesList();
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
    const current = companies.slice(newOffset, endOffset);
    const count = Math.ceil(companies.length / itemsPerPage);
    setItemOffset(newOffset);
    setPageCount(count);
    setCurrentItems(current);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const current = companies.slice(0, itemsPerPage);
    const count = Math.ceil(companies.length / itemsPerPage);
    setPageCount(count);
    setCurrentItems(current);
  }, [companies]);

  useEffect(() => {
    if (darkMode) {
      document.querySelectorAll('.page-item .page-link').forEach((item) => {
        item.style.backgroundColor = '#262626 !important';
        item.style.border = '1px solid #393939 !important';
        item.style.color = '#ffffff !important';
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
        ) : companies.length > 1 && !searchResultEmpty ? (
          <>
            <div className='InputContainer'>
              <Popup
                trigger={
                  <div>
                    {currentPage > 0 ? (
                      <button className='secondary-add-staff-btn secondary-add-comany-btn'>
                        Ավելացնել Կազմակերպություն <span>+</span>
                      </button>
                    ) : null}
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
              <Company currentItems={currentItems} currentPage={currentPage} />
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
              <h3 className={darkMode ? ' whiteElement' : ''}>
                Կազմակերպություն
              </h3>
            </div>
            <div
              className={
                'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
              }
            >
              <img src={CaseIcon} alt='CaseIcon' />
              <h5>
                Ավելացրեք կազմակերպություն, որպեսզի սկսեք ձեր աշխատանքը
                համակարգում
              </h5>
            </div>
            <Popup
              trigger={
                <div>
                  <button className='welcome-btn'>Ավելացնել</button>
                </div>
              }
              position='top center'
              onOpen={() => setPopUpOpen(true)}
              onClose={() => setPopUpOpen(false)}
            >
              {(close) => <AddCompanyPopUp darkMode={darkMode} close={close} />}
            </Popup>
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
