import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from '../../Context/Context';
import Popup from 'reactjs-popup';
import AddDivisionPopUp from '../../Components/AddDivisionPopUp';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import PreLoader from '../../Components/PreLoader';

import MyEventCalendar from '../../Components/MyEventCalendar';
import Division from '../../Components/Division';

import DivisionIcon from '../../assets/Icons/DivisionIcon.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { GetAllCompanies } from '../../Platform/CompanyRequests';
import {
  GetAllDepartments,
  SearchDepartment,
} from '../../Platform/DepartmentRequests';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

export default function Divisions() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasCompanies, setHasCompnaies] = useState(false);
  const [searchAtribute, setSearchAtribute] = useState(null);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const [divisions, setDivisions] = useState([]);

  const getDivisonsList = async (id) => {
    const result = await GetAllDepartments(id);
    if (result) {
      setDivisions(result.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getCompaniesList = async () => {
    const result = await GetAllCompanies();
    if (result) {
      if (result.data.length > 1) {
        setHasCompnaies(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('companyID');
    getDivisonsList(id);
  }, []);

  useEffect(() => {
    getCompaniesList();
  }, []);

  const handleSearch = async () => {
    if (searchAtribute && searchAtribute !== '') {
      try {
        setLoading(true);
        const result = await SearchDepartment(
          localStorage.getItem('companyID'),
          searchAtribute
        );
        if (result) {
          if (result.data.length <= 1) {
            setSearchResultEmpty(true);
          } else {
            setSearchResultEmpty(false);
          }
          setDivisions(result.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      } catch (error) {}
    } else {
      setLoading(true);
      getDivisonsList(localStorage.getItem('companyID'));
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
    const current = divisions.slice(newOffset, endOffset);
    const count = Math.ceil(divisions.length / itemsPerPage);
    setItemOffset(newOffset);
    setPageCount(count);
    setCurrentItems(current);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const current = divisions.slice(0, itemsPerPage);
    const count = Math.ceil(divisions.length / itemsPerPage);
    setPageCount(count);
    setCurrentItems(current);
  }, [divisions]);

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
        ) : divisions.length > 1 && !searchResultEmpty ? (
          <>
            <div className='InputContainer'>
              <Popup
                trigger={
                  <div>
                    {currentPage > 0 ? (
                      <button className='secondary-add-staff-btn'>
                        Ավելացնել Ստորաբաժանում <span>+</span>
                      </button>
                    ) : null}
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
              <Division currentItems={currentItems} currentPage={currentPage} />
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
        ) : hasCompanies ? (
          <div className='no-staff-content'>
            <div className='welcome-section'>
              <h5>Դուք դեռ չունեք</h5>
              <h3 className={darkMode ? ' whiteElement' : ''}>
                Ստորաբաժանումներ
              </h3>
            </div>
            <div
              className={
                'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
              }
            >
              <img src={DivisionIcon} alt='DivisionIcon' />
              <h5>
                Ավելացրեք ստորաբաժանումներ, և կարգավորեք դրանք համակարգում
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
              {(close) => (
                <AddDivisionPopUp darkMode={darkMode} close={close} />
              )}
            </Popup>
          </div>
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
