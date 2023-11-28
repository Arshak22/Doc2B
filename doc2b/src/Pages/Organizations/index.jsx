import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from "../../Context/Context";
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import Popup from 'reactjs-popup';
import './style.css';

import MyEventCalendar from "../../Components/MyEventCalendar";
import Company from '../../Components/Company';

import CaseIcon from "../../assets/Icons/CaseIcon.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ImSearch } from "react-icons/im";

export default function Organization() {
    const {darkMode, setPopUpOpen} = useGlobalContext();
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(0);
    // const [renderOnDelete, setRenderOnDelete] = useState(false);

    // const companies = [];
    const companies = [
        {
           "id": 0
        },
        {
            "id": 1,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 2,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 3,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 4,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 5,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 6,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 7,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 8,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 9,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 10,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 11,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 12,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 13,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 14,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 15,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 16,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 17,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 18,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 19,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 20,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 21,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 22,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 23,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        },
        {
            "id": 24,
            "name": 'Team2B',
            'head': 'Ա. Ազգանուն'
        }
    ];

    const handlePageClick = (event) => {
        // Calculate the new offset based on the selected page
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
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.querySelectorAll(".page-item .page-link").forEach(item => {
                item.style.backgroundColor = '#262626';
                item.style.border = '1px solid #393939';
                item.style.color = '#ffffff';
            }) 
        } else {
            document.querySelectorAll(".page-item .page-link").forEach(item => {
                item.style.backgroundColor = '#F5F7FA';
                item.style.border = '1px solid #d6d6d6';
                item.style.color = '#000000';
            }) 
        }
    }, [darkMode, currentItems, currentPage]);

    return (
        <div className="StaffPage">
            <div className={"LeftBlockSection" + (darkMode ? ' Dark' : '')}>
                {companies.length > 1 ? 
                <>
                    <div className="InputContainer">
                        <Popup
                            trigger={
                            <div>
                                {currentPage > 0 ? <button className='secondary-add-staff-btn secondary-add-comany-btn'>Ավելացնել Կազմակերպություն <span>+</span></button> : null}
                            </div>}
                            position="top center"
                            onOpen={()=> setPopUpOpen(true)}
                            onClose={() => setPopUpOpen(false)}
                            >
                            {close => (
                                <AddCompanyPopUp darkMode={darkMode} close={close}/>
                            )}
                        </Popup>
                        <div className='staff-filter-section'>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Փնտրել"
                                    name="Փնտրել"
                                    className={"inpts headerInpt" + (darkMode ? ' darkInpt' : '')}
                                />
                                <ImSearch className={"passwordIcon searchIcon" + (darkMode ? ' whiteIcon' : '')} />
                            </div>
                        </div>
                    </div>
                    <>
                        <Company currentItems={currentItems} currentPage={currentPage} />
                        <ReactPaginate
                            nextLabel={<IoIosArrowForward className="paginationArrows"/>}
                            previousLabel={<IoIosArrowBack className="paginationArrows"/>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}/>
                    </> 
                </> : 
                <div className='no-staff-content'>
                    <div className="welcome-section">
                        <h5>Դուք դեռ չունեք</h5>
                        <h3 className={darkMode ? ' whiteElement' : ''}>Կազմակերպություն</h3>
                    </div>
                    <div className={"empty-content-image-block" + (darkMode ? ' darkWelcome' : '')}>
                        <img src={CaseIcon} alt="CaseIcon"/>
                        <h5>Ավելացրեք կազմակերպություն, որպեսզի սկսեք ձեր աշխատանքը համակարգում</h5>
                    </div>
                    <Popup
                        trigger={
                            <div>
                                <button className="welcome-btn">Ավելացնել</button>
                            </div>}
                        position="top center"
                        onOpen={()=> setPopUpOpen(true)}
                        onClose={() => setPopUpOpen(false)}
                        >
                        {close => (
                            <AddCompanyPopUp darkMode={darkMode} close={close}/>
                        )}
                    </Popup>
                </div>}
            </div>
            <div className="groupedSideBlocks">
                <div className="AddsSection adds_2"></div>
                <MyEventCalendar />
            </div>
        </div>
    );
}