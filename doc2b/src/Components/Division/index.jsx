import { React } from 'react';
import './style.css';
import { useGlobalContext } from "../../Context/Context";
import AddDivisionPopUp from '../AddDivisionPopUp';
import Popup from 'reactjs-popup';

import { ImCross } from "react-icons/im";

import DivisionIcon from "../../assets/Icons/DivisionIcon.png";

export default function Division({ currentItems, currentPage }) {
  const {darkMode, setPopUpOpen} = useGlobalContext();
    return (
      <div className='staffList'>
        {currentPage === 0 ? null :
        <Popup
          trigger={
            <div className='AddStaffMemberBlock AddStaffMobile AddDivision'>
              <h3>Ավելացնել<br></br>Ստորաբաժանում</h3>
              <button className='StaffPlusBtn'>+</button>
            </div>}
          position="top center"
          onOpen={()=> setPopUpOpen(true)}
          onClose={() => setPopUpOpen(false)}
          >
          {close => (
              <AddDivisionPopUp darkMode={darkMode} close={close}/>
          )}
        </Popup>}
        {currentItems &&
          currentItems.map((item, index) => {
            return (
              <div key={index}>
              {item.id === 0 ? 
                <Popup
                trigger={
                  <div  className='AddStaffMemberBlock AddDivision'>
                    <h3>Ավելացնել<br></br>Ստորաբաժանում</h3>
                    <button className='StaffPlusBtn'>+</button>
                  </div> }
                position="top center"
                onOpen={()=> setPopUpOpen(true)}
                onClose={() => setPopUpOpen(false)}
                >
                {close => (
                    <AddDivisionPopUp darkMode={darkMode} close={close}/>
                )}
                </Popup>: 
                <div className={'staffMember singleComany singleDivision' + (darkMode ? ' darkStaffMember' : '')}>
                  <img src={DivisionIcon} alt="DivisionIcon" className='DivisionIcon'/>
                  <div className='staffMemberInfo comanyInfo'>
                      <h3 className='DivisionName'>{item.name}</h3>
                  </div>
                  <div className="three-dots staff-three-dots position-three-dots">
                    <div className='staff-edit-group-btns pagination-element-action-buttons'>
                      <button className={'delete-element' + (darkMode ? ' dark-delete' : '')}><ImCross/></button>
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
