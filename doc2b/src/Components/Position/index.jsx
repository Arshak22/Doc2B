import { React } from 'react';
import './style.css';
import { useGlobalContext } from "../../Context/Context";
import Popup from 'reactjs-popup';
import AddPositionPopUp from '../AddPositionPopUp';
import { NavLink } from "react-router-dom";
import { ROUTE_NAMES } from "../../Routes";

import { ImCross } from "react-icons/im";

import PositionIcon from "../../assets/Icons/PositionIcon.png";

export default function Position({ currentItems, currentPage }) {
    const {darkMode, setPopUpOpen} = useGlobalContext();
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
          <div className='AddStaffMemberBlock AddStaffMobile AddCompany AddPosition'>
            <h3>Ավելացնել<br></br>Պաշտոն</h3>
            <button className='StaffPlusBtn'>+</button>
          </div>}
        position="top center"
        onOpen={()=> setPopUpOpen(true)}
          onClose={() => setPopUpOpen(false)}
        >
        {close => (
          <AddPositionPopUp darkMode={darkMode} close={close}/>
        )}
        </Popup>}
        {currentItems &&
          currentItems.map((item, index) => {
            return (
              <div key={index}>
              {item.id === 0 ?
              <Popup
                trigger={
                  <div className='AddStaffMemberBlock AddCompany AddPosition'>
                    <h3>Ավելացնել<br></br>Պաշտոն</h3>
                    <button className='StaffPlusBtn'>+</button>
                  </div>}
                position="top center"
                onOpen={()=> setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                >
                {close => (
                  <AddPositionPopUp darkMode={darkMode} close={close}/>
                )}
              </Popup> : 
                <div className={'staffMember singlePosition' + (darkMode ? ' darkStaffMember' : '')}>
                  <NavLink to={ROUTE_NAMES.POSITION + '1'}>
                    <img src={PositionIcon} alt="PositionIcon" className='PositionIcon'/>
                    <div className='staffMemberInfo comanyInfo'>
                        <h3 className='positionName'>{truncateText(item.name, 12)}</h3>
                    </div>
                  </NavLink>
                  <div className="three-dots staff-three-dots position-three-dots">
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
