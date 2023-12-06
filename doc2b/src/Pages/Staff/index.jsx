import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
import { useGlobalContext } from '../../Context/Context';
import AddStaffPopUp from '../../Components/AddStaffPopUp';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import './style.css';

import MyEventCalendar from '../../Components/MyEventCalendar';
import StaffMember from '../../Components/StaffMember';
import StaffIcon from '../../assets/Icons/StaffIcon.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { GetAllCompanies } from '../../Platform/CompanyRequests';
import { GetAllStaff } from '../../Platform/StaffRequests';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

export default function Staff() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(9);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasCompanies, setHasCompnaies] = useState(false);

  const [staff, setStaff] = useState([]);
  // const staff = [
  //   {
  //     id: 0,
  //   },
  //   {
  //     id: 1,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 2,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'user',
  //     image: '',
  //   },
  //   {
  //     id: 3,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'standart',
  //     image: '',
  //   },
  //   {
  //     id: 4,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 5,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 6,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'user',
  //     image: '',
  //   },
  //   {
  //     id: 7,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'standart',
  //     image: '',
  //   },
  //   {
  //     id: 8,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 9,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 10,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'user',
  //     image: '',
  //   },
  //   {
  //     id: 11,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'standart',
  //     image: '',
  //   },
  //   {
  //     id: 12,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 13,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 14,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'user',
  //     image: '',
  //   },
  //   {
  //     id: 15,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'standart',
  //     image: '',
  //   },
  //   {
  //     id: 16,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 17,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 18,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'user',
  //     image: '',
  //   },
  //   {
  //     id: 19,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'standart',
  //     image: '',
  //   },
  //   {
  //     id: 20,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 21,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  //   {
  //     id: 22,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'user',
  //     image: '',
  //   },
  //   {
  //     id: 23,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'standart',
  //     image: '',
  //   },
  //   {
  //     id: 24,
  //     name: 'Անուն Ազգանուն',
  //     division: 'Ստորաբաժանում',
  //     position: 'Պաշտոն',
  //     status: 'admin',
  //     image: '',
  //   },
  // ];

  const getStaffList = async (id) => {
    const result = await GetAllStaff(id);
    if (result) {
      console.log(result.data);
      setStaff(result.data);
    }
  };

  const getCompaniesList = async () => {
    const result = await GetAllCompanies();
    if (result) {
      if (result.data.length > 1) {
        setHasCompnaies(true);
      }
    }
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem('companyID');
    getStaffList(id);
  }, []);

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
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  useEffect(() => {
    const current = staff.slice(0, itemsPerPage);
    const count = Math.ceil(staff.length / itemsPerPage);
    setPageCount(count);
    setCurrentItems(current);
  }, [staff]);

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
        {staff.length > 1 ? (
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
                      value='admin'
                      checked={selectedStatus.includes('admin')}
                      onChange={handleCheckboxChange}
                    />
                    Admin
                  </label>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='inactive'
                      checked={selectedStatus.includes('standart')}
                      onChange={handleCheckboxChange}
                    />
                    Standart
                  </label>
                  <label className={darkMode ? 'whiteElement' : ''}>
                    <input
                      type='checkbox'
                      value='standart'
                      checked={selectedStatus.includes('inactive')}
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
              trigger={
                <div>
                  <button className='welcome-btn'>Ավելացնել</button>
                </div>
              }
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
