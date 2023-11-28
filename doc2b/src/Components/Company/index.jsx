import { React } from 'react';
import './style.css';
import { useGlobalContext } from "../../Context/Context";
import AddCompanyPopUp from '../AddCompanyPopUp';
import Popup from 'reactjs-popup';
import { NavLink } from "react-router-dom";
import { ROUTE_NAMES } from "../../Routes";

import CaseIcon from "../../assets/Icons/CaseIcon.png";

import { ImCross } from "react-icons/im";

export default function Company({ currentItems, currentPage }) {
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
        <div className='AddStaffMemberBlock AddStaffMobile AddCompany'>
          <h3>Ավելացնել<br></br>Կազմակերպություն</h3>
          <button className='StaffPlusBtn'>+</button>
        </div>}
       position="top center"
       onOpen={()=> setPopUpOpen(true)}
       onClose={() => setPopUpOpen(false)}
      >
     {close => (
        <AddCompanyPopUp darkMode={darkMode} close={close}/>
     )}
     </Popup>}
      {currentItems &&
        currentItems.map((item, index) => {
          return (
            <div key={index}>
            {item.id === 0 ? 
              <Popup
               trigger={
                <div className='AddStaffMemberBlock AddCompany'>
                  <h3>Ավելացնել<br></br>Կազմակերպություն</h3>
                  <button className='StaffPlusBtn'>+</button>
                </div>}
                position="top center"
                onOpen={()=> setPopUpOpen(true)}
                onClose={() => setPopUpOpen(false)}
               >
              {close => (
                <AddCompanyPopUp darkMode={darkMode} close={close}/>
              )}
              </Popup> : 
              <div className={'staffMember singleComany' + (darkMode ? ' darkStaffMember' : '')}>
                <NavLink to={ROUTE_NAMES.COMPANY + '1'}>
                  <img src={CaseIcon} alt="CaseIcon" className='CompanyIcon'/>
                  <div className='staffMemberInfo comanyInfo'>
                    <h3 className='companyHead'>{truncateText(item.head, 15)}</h3>
                    <h3 className='comanyName'>{truncateText(item.name, 14)}</h3>
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
