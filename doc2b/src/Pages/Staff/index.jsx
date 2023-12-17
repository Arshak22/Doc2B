import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
import { useGlobalContext } from '../../Context/Context';
import AddStaffPopUp from '../../Components/AddStaffPopUp';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import PreLoader from '../../Components/PreLoader';
import './style.css';

import MyEventCalendar from '../../Components/MyEventCalendar';
import StaffMember from '../../Components/StaffMember';
import StaffIcon from '../../assets/Icons/StaffIcon.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { GetAllCompanies } from '../../Platform/CompanyRequests';
import {
  GetAllStaff,
  SearchStaff,
  FilterStaff,
} from '../../Platform/StaffRequests';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

export default function Staff() {
  const { darkMode, setPopUpOpen, companyID } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(9);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasCompanies, setHasCompnaies] = useState(false);
  const [searchAtribute, setSearchAtribute] = useState(null);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const [staff, setStaff] = useState([]);

  const getStaffList = async (id) => {
    const result = await GetAllStaff(id);
    if (result) {
      setStaff(result.data);
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
    if (companyID) {
      getCompaniesList();
    }
  }, [companyID]);

  useEffect(() => {
    if (companyID && companyID !== 'companyID') {
      getStaffList(companyID);
    }
  }, [companyID]);

  const handleSearch = async () => {
    if (searchAtribute && searchAtribute !== '') {
      try {
        setLoading(true);
        const result = await SearchStaff(
          localStorage.getItem('companyID'),
          searchAtribute
        );
        if (result) {
          if (result.data.length <= 1) {
            setSearchResultEmpty(true);
          } else {
            setSearchResultEmpty(false);
          }
          setStaff(result.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      } catch (error) {}
    } else {
      setLoading(true);
      getStaffList(localStorage.getItem('companyID'));
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
    const current = staff.slice(newOffset, endOffset);
    const count = Math.ceil(staff.length / itemsPerPage);
    setItemOffset(newOffset);
    setPageCount(count);
    setCurrentItems(current);
    setCurrentPage(event.selected);
  };

  const handleCheckboxChange = (event) => {
    const status = event.target.value;

    setSelectedStatus((prevSelectedStatus) => {
      if (prevSelectedStatus.includes(status)) {
        return prevSelectedStatus.filter((s) => s !== status);
      } else {
        return [...prevSelectedStatus, status];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStatus.length > 0) {
        try {
          const result = await FilterStaff(
            localStorage.getItem('companyID'),
            selectedStatus
          );
          if (result.data.length <= 1) {
            setSearchResultEmpty(true);
          } else {
            setSearchResultEmpty(false);
          }
          setStaff(result.data);
        } catch (error) {}
      } else {
        setLoading(true);
        getStaffList(localStorage.getItem('companyID'));
        setSearchResultEmpty(false);
      }
    };
    fetchData();
  }, [selectedStatus, companyID]);

  useEffect(() => {
    const current = staff.slice(0, itemsPerPage);
    const count = Math.ceil(staff.length / itemsPerPage);
    setPageCount(count);
    setCurrentItems(current);
  }, [staff, companyID]);

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
        ) : staff.length > 1 && !searchResultEmpty ? (
          <>
            <div className='InputContainer'>
              <Popup
                trigger={
                  <div>
                    {currentPage > 0 ? (
                      <button className='secondary-add-staff-btn'>
                        Ավելացնել Աշխատակից <span>+</span>
                      </button>
                    ) : null}
                  </div>
                }
                position='top center'
                onOpen={() => setPopUpOpen(true)}
                onClose={() => setPopUpOpen(false)}
              >
                {(close) => <AddStaffPopUp darkMode={darkMode} close={close} />}
              </Popup>
              <div className='staff-filter-section'>
                <div className='StatusFilter'>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='Admin'
                      checked={selectedStatus.includes('Admin')}
                      onChange={handleCheckboxChange}
                    />
                    Admin
                  </label>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='Standard'
                      checked={selectedStatus.includes('Standard')}
                      onChange={handleCheckboxChange}
                    />
                    Standard
                  </label>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='Inactive'
                      checked={selectedStatus.includes('Inactive')}
                      onChange={handleCheckboxChange}
                    />
                    Inactive
                  </label>
                </div>
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
              <StaffMember
                currentItems={currentItems}
                currentPage={currentPage}
              />
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
                <div className='StatusFilter'>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='Admin'
                      checked={selectedStatus.includes('Admin')}
                      onChange={handleCheckboxChange}
                    />
                    Admin
                  </label>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='Standard'
                      checked={selectedStatus.includes('Standard')}
                      onChange={handleCheckboxChange}
                    />
                    Standard
                  </label>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='Inactive'
                      checked={selectedStatus.includes('Inactive')}
                      onChange={handleCheckboxChange}
                    />
                    Inactive
                  </label>
                </div>
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
              <h3 className={darkMode ? ' whiteElement' : ''}>Աշխատակազմ</h3>
            </div>
            <div
              className={
                'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
              }
            >
              <img src={StaffIcon} alt='StaffIcon' />
              <h5>
                Ավելացրեք նոր աշխատակցի, որպեսզի հետևեք անձնական տեղեկատվությանը
                և ընթացիկ թարմացումներին
              </h5>
            </div>
            <Popup
              trigger={<button className='welcome-btn'>Ավելացնել</button>}
              position='top center'
              onOpen={() => setPopUpOpen(true)}
              onClose={() => setPopUpOpen(false)}
            >
              {(close) => <AddStaffPopUp darkMode={darkMode} close={close} />}
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
