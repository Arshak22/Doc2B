import React from 'react';
import Popup from 'reactjs-popup';
import { useGlobalContext } from "../../Context/Context";
import AddStaffPopUp from '../AddStaffPopUp';
import { NavLink } from "react-router-dom";
import { ROUTE_NAMES } from "../../Routes";
import './style.css';

import StaffAvatar from "../../assets/Images/StaffAvatar.png";

import { ImCross } from "react-icons/im";

export default function StaffMember({ currentItems, currentPage }) {
    const {setPopUpOpen, darkMode} = useGlobalContext();
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
          return text;
      } else {
          return text.substring(0, maxLength - 2) + '..';
      }
    };

    return (
      <div className='staffList'>
        {currentPage === 0 ? null :
          <Popup
            trigger={
            <div className='AddStaffMemberBlock AddStaffMobile'>
              <h3>Ավելացնել<br></br>Աշխատակից</h3>
              <button className='StaffPlusBtn'>+</button>
            </div>}
           position="top center"
           onOpen={()=> setPopUpOpen(true)}
            onClose={() => setPopUpOpen(false)}
            >
           {close => (
             <AddStaffPopUp darkMode={darkMode} close={close}/>
           )}
          </Popup>}
        {currentItems &&
          currentItems.map((item, index) => {
            let nameParts, firstName, lastName;
            if (item.name) {
              nameParts = item.name.split(' ');
              firstName = nameParts[0];
              lastName = nameParts.slice(1).join(' ');
            }
            return (
              <div key={index}>
              {item.id === 0 ? 
              <Popup
                trigger={
                  <div className='AddStaffMemberBlock'>
                    <h3>Ավելացնել<br></br>Աշխատակից</h3>
                    <button className='StaffPlusBtn'>+</button>
                  </div>}
                  position="top center"
                  onOpen={()=> setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                  >
                  {close => (
                     <AddStaffPopUp darkMode={darkMode} close={close}/>
                  )}
              </Popup>
              : 
                <div className={'staffMember' + (darkMode ? ' darkStaffMember' : '')}>
                   <NavLink to={ROUTE_NAMES.STAFFMEMBER + '1'}><img src={StaffAvatar} alt="staffAvatar" className='staffMemberPic'/></NavLink>
                    <NavLink to={ROUTE_NAMES.STAFFMEMBER + '1'}>
                      <div className='staffMemberInfo'>
                          <h4>{truncateText(item.division, 14)}</h4>
                          <h3>{firstName}</h3>
                          <h3>{lastName}</h3>
                          <h2>{truncateText(item.position, 12)}</h2>
                          <h5 className={item.status === 'admin' ? 'adminStatus' : item.status === 'standart' ? 'standartStatus': 'userStatus'}>{item.status}</h5>
                      </div>
                    </NavLink>
                  <div className="three-dots staff-three-dots">
                      <div className='staff-edit-group-btns pagination-element-action-buttons'>
                        <button className={'delete-element' + (darkMode ? ' dark-delete' : '')}><ImCross /></button>
                      </div>
                  </div>
                </div>}
              </div>
            );
          })
        }
      </div>
    );
}
