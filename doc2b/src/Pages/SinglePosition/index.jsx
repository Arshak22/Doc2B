import React, { useEffect, useState, useRef  } from 'react';
import './style.css';
import Popup from 'reactjs-popup';
import AddPositionPopUp from '../../Components/AddPositionPopUp';
import { useGlobalContext } from "../../Context/Context";

import MyEventCalendar from "../../Components/MyEventCalendar";

import { AiFillEdit } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";

export default function SinglePosition() {
    const {darkMode, setPopUpOpen} = useGlobalContext();
    const [editMode, setEditMode] = useState(false);
    
    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const Գործառույթներ = [
        {
            description: 'Մարքեթինգային ռազմավարության նախագծում և մշակում'
        },
        {
            description: 'Գովազդատուների հետ կապերի ուսումնասիրություն'
        },
        {
            description: 'ԶԼՄ-ների, վեբ-կայքերի և այլ գովազդների տեղադրման համար նախատեսված, տեղեկատվական հարթակների վերլուծության իրականացում և ընտրություն'
        },
        {
            description: 'Պաշտոնից բխող այլ պարտականությունների իրականացում'
        },
        {
            description: 'Մարքեթինգային ռազմավարության նախագծում և մշակում'
        },
        {
            description: 'Գովազդատուների հետ կապերի ուսումնասիրություն'
        },
        {
            description: 'ԶԼՄ-ների, վեբ-կայքերի և այլ գովազդների տեղադրման համար նախատեսված, տեղեկատվական հարթակների վերլուծության իրականացում և ընտրություն'
        },
        {
            description: 'Պաշտոնից բխող այլ պարտականությունների իրականացում'
        },
        {
            description: 'Մարքեթինգային ռազմավարության նախագծում և մշակում'
        },
        {
            description: 'Գովազդատուների հետ կապերի ուսումնասիրություն'
        }
    ];

    return (
        <div className='StaffPage'>
            <div className={"LeftBlockSection" + (darkMode ? ' Dark' : '')}>
                <div className='singleStaffRow'>
                    {!editMode ?
                        <h3 className={'SinglePositionName' + (darkMode ? ' whiteElement' : '')}>Պաշտոնի անվանումը</h3> :
                        <div className='staffInputSec NameInptSec'>
                            <div>
                                <label htmlFor="Position">Պաշտոնը</label>
                                <input type="text" name="Position" id="Position" className={darkMode ? ' darkInpt' : ''}/>
                            </div>
                        </div>
                    }
                    <div className='single-position-edit'>
                        {!editMode ?
                            <button className="welcome-btn staff-edit-button" onClick={handleEditMode}>Խմբագրել <AiFillEdit/></button> :
                            <div className='staff-edit-group-btns'>
                                <button className='save-staff-edit' onClick={handleEditMode}><ImCheckmark/></button>
                                <button className='cancel-staff-edit' onClick={handleEditMode}><ImCross /></button>
                            </div>}
                    </div>
                    {!editMode ? 
                    <Popup
                    trigger={
                        <div className='add-gorcaruyt'>
                            <button className='secondary-add-staff-btn secondary-add-gorcaruyt-btn'>Ավելացնել Գործառույթ<span>+</span></button>
                        </div>}
                    position="top center"
                    onOpen={()=> setPopUpOpen(true)}
                    onClose={() => setPopUpOpen(false)}
                    >
                    {close => (
                        <AddPositionPopUp darkMode={darkMode} close={close}/>
                    )}
                    </Popup>
                    : null}
                </div>
                <div className='singleStaffRow'>
                    <h4 className={'allTheStaff' + (darkMode ? ' whiteElement' : '')}>Բոլոր Գործառույթները</h4>
                </div>
                <div className='AllTheStaffSection'>
                    <div className='staff-col'>
                        {Գործառույթներ.slice(0, Math.ceil(Գործառույթներ.length / 2)).map((item, index) => {
                            return (
                                <div key={index} className={'gorcaruyt-block' + (editMode ? ' edit-gorcaruyt' : '') + (darkMode ? ' darkInpt' : '')}>
                                    <h3>Գործառույթ <span className='numbers'>{Գործառույթներ.indexOf(item) + 1}</span></h3>
                                    {!editMode ? <p>{item.description}</p> :
                                    <><textarea name="" id="" rows="2" defaultValue={item.description} className={(darkMode ? ' darkInpt2' : '')}></textarea>
                                    <button className='delete-gorcaruyt'><ImCross/></button></>}
                                </div>
                            );
                        })}
                    </div>
                    <div className='staff-col'>
                        {Գործառույթներ.slice(Math.ceil(Գործառույթներ.length / 2)).map((item, index) => {
                            return (
                                <div key={index} className={'gorcaruyt-block' + (editMode ? ' edit-gorcaruyt' : '') + (darkMode ? ' darkInpt' : '')}>
                                    <h3>Գործառույթ <span className='numbers'>{Գործառույթներ.indexOf(item) + 1}</span></h3>
                                    {!editMode ? <p>{item.description}</p> :
                                    <><textarea name="" id="" rows="2" defaultValue={item.description} className={(darkMode ? ' darkInpt2' : '')}></textarea>
                                    <button className='delete-gorcaruyt'><ImCross/></button></>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="groupedSideBlocks">
                <div className="AddsSection adds_2"></div>
                <MyEventCalendar />
            </div>
        </div>
    );
}