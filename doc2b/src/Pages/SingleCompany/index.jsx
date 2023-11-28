import React, { useEffect, useState, useRef  } from 'react';
import './style.css';
import { useGlobalContext } from "../../Context/Context";

import MyEventCalendar from "../../Components/MyEventCalendar";
import CompanyAvatar from "../../assets/Images/CompanyAvatar.png";

import { AiFillEdit } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { HiCamera } from 'react-icons/hi';

export default function SingleComany() {
    const {darkMode} = useGlobalContext();
    let company = {
        name: 'Team2B',
        first_name: 'Անուն',
        last_name: 'Ազգանուն',
        fathers_name: 'Հայրանուն',
        position: 'Տնօրեն',
        HVHH: '1251866',
        tel: '+374-95-555-555',
        email: 'test@gmail.com',
        business_country: 'Հայաստան',
        business_city: 'Երևան',
        business_address: 'Արամ Խաչատրյան փողոց, 33/2, բն․ 49',
        legal_country: 'Հայաստան',
        legal_city: 'Երևան',
        legal_address: 'Արամ Խաչատրյան փողոց, 33/2, բն․ 49',
        register_number: '6532320',
        legal_type: 'AFGHAN'
    };
    const [editMode, setEditMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDirectorPositionOption, setDirectorPositionOption] = useState('');
    const [selectedLegalTypeOption, setSelectedLegalTypeOption] = useState('');

    const ImageInputRef = useRef(null);

    const handleUploadImageClick = () => {
        ImageInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditMode = () => {
        setEditMode(!editMode);
        setSelectedLegalTypeOption('');
        setDirectorPositionOption('');
    };

    const avatarStyle = {
        backgroundImage: selectedImage ? `url(${selectedImage})` : `url(${CompanyAvatar})`,
        backgroundSize: selectedImage ? 'cover' : '50%',
    };

    const handleDirectorPositionOptionChange = (e) => {
        setDirectorPositionOption(e.target.value);
    };

    const handleLegalTypeOptionChange = (e) => {
        setSelectedLegalTypeOption(e.target.value);
    };
    
    return (
        <div className="StaffPage">
            <div className={"LeftBlockSection" + (darkMode ? ' Dark' : '')}>
                <div className='singleStaffRow'>
                    <div className='singleStaffNameSection'>
                    {editMode ? (
                <div className="userAvatar StaffAvatarEdit" style={avatarStyle}>
                    <div className='uploadStaffAvatarSec' onClick={handleUploadImageClick}>
                        <div>
                            <HiCamera/>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="UploadImageInput"
                        ref={ImageInputRef}
                        accept=".jpg, .jpeg, .png"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>
            ) : (
                <div className="userAvatar" style={avatarStyle}>
                </div>
            )}
                        <div>
                            {!editMode ?
                                <h2 className={'singleStaffName' + (darkMode ? ' whiteElement' : '')}>{company.name}</h2> :
                                <div className='staffInputSec NameInptSec'>
                                    <div>
                                        <label htmlFor="CompanyName">Կազմակերպության անվանում</label>
                                        <input type="text" name="CompanyName" id="CompanyName" defaultValue={company.name} className={darkMode ? ' darkInpt' : ''}/>
                                    </div>
                                </div>
                            }
                            <div className='singleStaffRow InputsRow DirectorSec'>
                                <div className={'staffInputSec DirectorNameSec' + (editMode ? ' editStaffInputSec' : '')}>
                                    <label htmlFor="DirectorName">Կազմակերպության ղեկավար</label>
                                    {!editMode ?
                                        <h3 className={(darkMode ? ' whiteElement' : '')}>{company.first_name} {company.last_name} {company.fathers_name}</h3> :
                                        <div className='staffInputSec NameInptSec'>
                                            <div>
                                                <label htmlFor="Name">Անուն</label>
                                                <input type="text" name="Name" id="Name" defaultValue={company.first_name} className={darkMode ? ' darkInpt' : ''}/>
                                            </div>
                                            <div>
                                                <label htmlFor="Surname">Ազգանուն</label>
                                                <input type="text" name="Surname" id="Surname" defaultValue={company.last_name} className={darkMode ? ' darkInpt' : ''}/>
                                            </div>
                                            <div>
                                                <label htmlFor="FatersName">Հայրանուն</label>
                                                <input type="text" name="FatersName" id="FatersName" defaultValue={company.fathers_name} className={darkMode ? ' darkInpt' : ''}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                                    <label htmlFor="DirectorPosition">Ղեկավարի պաշտոնը</label>
                                    {!editMode ?
                                        <h3 className={(darkMode ? ' whiteElement' : '')}>{company.position}</h3> :
                                        <div className='staffInputSec RoleInptSec'>
                                            <select name="DirectorPosition" id="DirectorPosition" onChange={handleDirectorPositionOptionChange} defaultValue={company.position} className={darkMode ? ' darkInpt' : ''}>
                                                <option value="Տնօրեն">Տնօրեն</option>
                                                <option value="Նախագահ">Նախագահ</option>
                                                <option value="Հիմնադիր">Հիմնադիր</option>
                                                <option value="Այլ">Այլ</option>
                                            </select>
                                        </div>
                                    }
                                    {(selectedDirectorPositionOption === 'Այլ' && editMode) && (
                                        <div className={'staffInputSec editStaffInputSec otherInputSec'}>
                                            <label htmlFor="OtherPosition">Նշել պաշտոնը</label>
                                            <input type="text" name="OtherPosition" id="OtherPosition" className={darkMode ? ' darkInpt' : ''}/>
                                        </div>
                                    )}
                                </div>  
                            </div> 
                        </div>
                    </div>
                    <div>
                        {!editMode ?
                            <button className="welcome-btn staff-edit-button" onClick={handleEditMode}>Խմբագրել <AiFillEdit/></button> :
                            <div className='staff-edit-group-btns'>
                                <button className='save-staff-edit' onClick={handleEditMode}><ImCheckmark/></button>
                                <button className='cancel-staff-edit' onClick={handleEditMode}><ImCross /></button>
                            </div>
                        }
                    </div>
                </div>
                <div className='singleStaffRow InputsRow'>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="HVHHNumber">ՀՎՀՀ</label>
                        {!editMode ?
                            <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>{company.HVHH}</h3> :
                            <input type="text" name="HVHHNumber" id="HVHHNumber" defaultValue={company.HVHH} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                </div>
                <h2 className='labelLike'>Գործունեության հասցե</h2>
                <div className='singleStaffRow InputsRow AddresswithHeadline'>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="BusinessCountry">Երկիր</label>
                        {!editMode ?
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.business_country}</h3> :
                            <input type="text" name="BusinessCountry" id="BusinessCountry" defaultValue={company.business_country} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="BusinessCity">Քաղաք</label>
                        {!editMode ? 
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.business_city}</h3> :
                            <input type="text" name="BusinessCity" id="BusinessCity" defaultValue={company.business_city} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="BusinessAddress">Հասցե</label>
                        {!editMode ? 
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.business_address}</h3> :
                            <input type="text" name="BusinessAddress" id="BusinessAddress" defaultValue={company.business_address} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                </div>
                <h2 className='labelLike'>Իրավաբանական հասցե</h2>
                <div className='singleStaffRow InputsRow AddresswithHeadline'>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="LegalCountry">Երկիր</label>
                        {!editMode ?
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.legal_country}</h3> :
                            <input type="text" name="LegalCountry" id="LegalCountry" defaultValue={company.legal_country} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="LegalCity">Քաղաք</label>
                        {!editMode ? 
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.legal_city}</h3> :
                            <input type="text" name="LegalCity" id="LegalCity" defaultValue={company.legal_city} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="LegalAddress">Հասցե</label>
                        {!editMode ? 
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.legal_address}</h3> :
                            <input type="text" name="LegalAddress" id="LegalAddress" defaultValue={company.legal_address} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                </div>
                <div className='singleStaffRow InputsRow'>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="Telephone">Հեռ․</label>
                        {!editMode ? 
                            <a href={"tel:" + company.tel}><h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>{company.tel}</h3></a> :
                            <input type="tel" name="Telephone" id="Telephone" defaultValue={company.tel} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="Email">Էլ․ հասցե</label>
                        {!editMode ? 
                             <a href={'mailto:' + company.email}><h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>{company.email}</h3></a> :
                            <input type="email" name="Email" id="Email" defaultValue={company.email} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                </div>
                <div className='singleStaffRow InputsRow'>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="PetRegisterNumber">Պետ Ռեգիստրի գրանցման համար</label>
                        {!editMode ?
                            <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>{company.register_number}</h3> :
                            <input type="text" name="PetRegisterNumber" id="PetRegisterNumber" defaultValue={company.register_number} className={darkMode ? ' darkInpt' : ''}/>
                        }
                    </div>
                </div>
                <div className='singleStaffRow InputsRow'>
                    <div className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}>
                        <label htmlFor="LegalType">Կազմակերպաիրավական տեսակը</label>
                        {!editMode ?
                            <h3 className={(darkMode ? ' whiteElement' : '')}>{company.legal_type}</h3> :
                            <div className='staffInputSec RoleInptSec'>
                                <select name="LegalType" id="LegalType" onChange={handleLegalTypeOptionChange} defaultValue={company.legal_type} className={darkMode ? ' darkInpt' : ''}>
                                    <option value="ՍՊԸ ">ՍՊԸ</option>
                                    <option value="ԱՁ">ԱՁ</option>
                                    <option value="ՓԲԸ">ՓԲԸ</option>
                                    <option value="ՀՈԱԿ">ՀՈԱԿ</option>
                                    <option value="ՊՈԱԿ">ՊՈԱԿ</option>
                                    <option value="ԲԲԸ">ԲԲԸ</option>
                                    <option value="Հիմնադրամ">Հիմնադրամ</option>
                                    <option value="ՀԿ">ՀԿ</option>
                                    <option value="Այլ">Այլ</option>
                                </select>
                            </div>
                        }
                    </div>
                    {(selectedLegalTypeOption === 'Այլ' && editMode) && (
                        <div className={'staffInputSec editStaffInputSec'}>
                            <label htmlFor="OtherLegalType">Նշել տեսակը</label>
                            <input type="text" name="OtherLegalType" id="OtherLegalType" className={darkMode ? ' darkInpt' : ''}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="groupedSideBlocks">
                <div className="AddsSection adds_2"></div>
                <MyEventCalendar />
            </div>
        </div>
    );
}