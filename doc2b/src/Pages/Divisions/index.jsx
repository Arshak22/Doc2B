import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from "../../Context/Context";
import Popup from 'reactjs-popup';
import AddDivisionPopUp from '../../Components/AddDivisionPopUp';
import './style.css';

import MyEventCalendar from "../../Components/MyEventCalendar";
import Division from '../../Components/Division';

import DivisionIcon from "../../assets/Icons/DivisionIcon.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ImSearch } from "react-icons/im";

export default function Divisions() {
    const {darkMode, setPopUpOpen} = useGlobalContext();
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // const [renderOnDelete, setRenderOnDelete] = useState(false);

    const divisions = [
        {
            'id': 0
        },
        {
            'id': 1,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 2,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 3,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 4,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 5,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 6,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 7,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 8,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 9,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 10,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 11,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 12,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 13,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 14,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 15,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 9,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 10,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 11,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 12,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 13,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 14,
            'name': 'Ստորաբաժանում'
        },
        {
            'id': 15,
            'name': 'Ստորաբաժանում'
        }
    ];

    const handlePageClick = (event) => {
        // Calculate the new offset based on the selected page
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
                {divisions.length > 1 ? 
                <>
                    <div className="InputContainer">
                        <Popup
                            trigger={
                            <div>
                                {currentPage > 0 ? <button className='secondary-add-staff-btn'>Ավելացնել Ստորաբաժանում <span>+</span></button> : null}
                            </div>}
                            position="top center"
                            onOpen={()=> setPopUpOpen(true)}
                            onClose={() => setPopUpOpen(false)}
                            >
                            {close => (
                                <AddDivisionPopUp darkMode={darkMode} close={close}/>
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
                        <Division currentItems={currentItems} currentPage={currentPage} />
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
                        <h3 className={darkMode ? ' whiteElement' : ''}>Ստորաբաժանումներ</h3>
                    </div>
                    <div className={"empty-content-image-block" + (darkMode ? ' darkWelcome' : '')}>
                        <img src={DivisionIcon} alt="DivisionIcon"/>
                        <h5>Ավելացրեք Ստորաբաժանումներ, և կարգավորեք դրանք համակարգում</h5>
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
                            <AddDivisionPopUp darkMode={darkMode} close={close}/>
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