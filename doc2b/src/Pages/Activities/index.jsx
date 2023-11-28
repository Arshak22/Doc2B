import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGlobalContext } from "../../Context/Context";
import './style.css';

import DocumentSlider from "../../Components/DocumentsSlider";
import MyEventCalendar from "../../Components/MyEventCalendar";

import Document from "../../assets/Images/DocumentLook.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ImSearch } from "react-icons/im";

export default function Activities() {
    const {darkMode} = useGlobalContext();
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // const [renderOnDelete, setRenderOnDelete] = useState(false);

    // const applications = [];

    const applications = [
        {
          name: "Աշխատակցի ազատման ծանուցում 1",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'Accepted'
        },
        {
          name: "Աշխատակցի ազատման ծանուցում 2",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'Declined'
        },
        {
          name: "Աշխատակցի ազատման ծանուցում 3",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'In Process'
        },
        {
          name: "Աշխատակցի ազատման ծանուցում 4",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'Accepted'
        },
        {
          name: "Աշխատակցի ազատման ծանուցում 5",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'Declined'
        },
        {
          name: "Աշխատակցի ազատման ծանուցում 6",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'In Process'
        },
        {
          name: "Աշխատակցի ազատման ծանուցում 7",
          person: "Անուն Ազգանուն",
          date: "13 Հուլ 2023",
          category: 'Accepted'
        },
        {
            name: "Աշխատակցի ազատման ծանուցում 8",
            person: "Անուն Ազգանուն",
            date: "13 Հուլ 2023",
            category: 'Declined'
        },
          {
            name: "Աշխատակցի ազատման ծանուցում 9",
            person: "Անուն Ազգանուն",
            date: "13 Հուլ 2023",
            category: 'In Process'
          },
          {
            name: "Աշխատակցի ազատման ծանուցում 4",
            person: "Անուն Ազգանուն",
            date: "13 Հուլ 2023",
            category: 'Accepted'
          },
          {
            name: "Աշխատակցի ազատման ծանուցում 10",
            person: "Անուն Ազգանուն",
            date: "13 Հուլ 2023",
            category: 'Declined'
          },
          {
            name: "Աշխատակցի ազատման ծանուցում 11",
            person: "Անուն Ազգանուն",
            date: "13 Հուլ 2023",
            category: 'In Process'
          },
    ];

    const handlePageClick = (event) => {
        // Calculate the new offset based on the selected page
        const newOffset = event.selected * itemsPerPage;
        const endOffset = newOffset + itemsPerPage;
        const current = applications.slice(newOffset, endOffset);
        const count = Math.ceil(applications.length / itemsPerPage);
        setItemOffset(newOffset);
        setPageCount(count);
        setCurrentItems(current);
        setCurrentPage(event.selected);
    };

    const handleCheckboxChange = (event) => {
        const status = event.target.value;
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(s => s !== status));
        } else {
            setSelectedStatus([...selectedStatus, status]);
        }
    };

    useEffect(() => {
        const current = applications.slice(0, itemsPerPage);
        const count = Math.ceil(applications.length / itemsPerPage);
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
                {applications.length > 1 ? 
                <>
                    <div className="InputContainer">
                        <div>
                            
                        </div>
                        <div className='staff-filter-section'>
                            <div className="StatusFilter">
                                <label className={darkMode ? 'whiteElement' : ''}>
                                    <input
                                        type="checkbox"
                                        value="accepted"
                                        checked={selectedStatus.includes("accepted")}
                                        onChange={handleCheckboxChange}
                                    />
                                    Հաստատված
                                </label>
                                <label className={darkMode ? 'whiteElement' : ''}>
                                    <input
                                        type="checkbox"
                                        value="declined"
                                        checked={selectedStatus.includes("declined")}
                                        onChange={handleCheckboxChange}
                                    />
                                    Մերժված
                                </label>
                                <label className={darkMode ? 'whiteElement' : ''}>
                                    <input
                                        type="checkbox"
                                        value="in process"
                                        checked={selectedStatus.includes("in process")}
                                        onChange={handleCheckboxChange}
                                    />
                                    Ընթացքի մեջ
                                </label>
                            </div>
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
                        <DocumentSlider documnets={currentItems} currentPage={currentPage}/>
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
                        <h3 className={darkMode ? ' whiteElement' : ''}>Փաստաթղթեր</h3>
                    </div>
                    <div className={"empty-content-image-block" + (darkMode ? ' darkWelcome' : '')}>
                        <img src={Document} alt="Document"/>
                        <h5>Ավելացրեք փաստաթղթեր, որպեսզի ստուգեք ներբեռնած փաստաթղթերը և ընթացիկ թարմացումները</h5>
                    </div>
                    <div>
                        <button className="welcome-btn">Ավելացնել</button>
                    </div>
                </div>}
            </div>
            <div className="groupedSideBlocks">
                <div className="AddsSection adds_2"></div>
                <MyEventCalendar />
            </div>
    </div>
    );
}