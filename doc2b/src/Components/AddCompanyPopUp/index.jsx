import {React, useState, useRef} from 'react';

import StaffAvatar from "../../assets/Images/StaffAvatar.png";

import { RxCross2 } from "react-icons/rx";
import { HiCamera } from 'react-icons/hi';

export default function AddCompanyPopUp({ darkMode, close }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDirectorPositionOption, setDirectorPositionOption] = useState('');
    const [selectedLegalTypeOption, setSelectedLegalTypeOption] = useState('');

    const ImageInputRef = useRef(null);

    const avatarStyle = {
        backgroundImage: selectedImage ? `url(${selectedImage})` : `url(${StaffAvatar})`,
        backgroundSize: selectedImage ? 'cover' : '50%',
    };
  
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

    const handleDirectorPositionOptionChange = (e) => {
        setDirectorPositionOption(e.target.value);
    };
    
    const handleLegalTypeOptionChange = (e) => {
        setSelectedLegalTypeOption(e.target.value);
    };

    return (
        <div className={"AddPopUp AddCompanyPopUp" + (darkMode ? ' Dark DarkPopUp' : '')}>
            <button className={'event-closeBtn' + (darkMode ? ' whiteX' : '')} onClick={close}><RxCross2/></button>
            <div className='singleStaffRow'>
            <div className='singleStaffNameSection'>
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
                <div>
                <div className='staffInputSec NameInptSec'>
                    <div>
                        <label htmlFor="CompanyName">Կազմակերպության անվանում</label>
                        <input type="text" name="CompanyName" id="CompanyName" className={darkMode ? ' darkInpt' : ''}/>
                    </div>
                </div>
                <div className='singleStaffRow InputsRow DirectorSec'>
                    <div className={'staffInputSec DirectorNameSec editStaffInputSec'}>
                        <label htmlFor="DirectorName">Կազմակերպության ղեկավար</label>
                            <div className='staffInputSec NameInptSec'>
                                <div>
                                    <label htmlFor="Name">Անուն</label>
                                    <input type="text" name="Name" id="Name" className={darkMode ? ' darkInpt' : ''}/>
                                </div>
                                <div>
                                    <label htmlFor="Surname">Ազգանուն</label>
                                    <input type="text" name="Surname" id="Surname" className={darkMode ? ' darkInpt' : ''}/>
                                </div>
                                <div>
                                    <label htmlFor="FatersName">Հայրանուն</label>
                                    <input type="text" name="FatersName" id="FatersName" className={darkMode ? ' darkInpt' : ''}/>
                                </div>
                            </div>
                    </div>
                    <div className={'staffInputSec editStaffInputSec'}>
                        <label htmlFor="DirectorPosition">Ղեկավարի պաշտոնը</label>
                            <div className='staffInputSec RoleInptSec'>
                                <select name="DirectorPosition" id="DirectorPosition" onChange={handleDirectorPositionOptionChange} className={darkMode ? ' darkInpt' : ''}>
                                    <option value="Տնօրեն">Տնօրեն</option>
                                    <option value="Նախագահ">Նախագահ</option>
                                    <option value="Հիմնադիր">Հիմնադիր</option>
                                    <option value="Այլ">Այլ</option>
                                </select>
                            </div>
                        {(selectedDirectorPositionOption === 'Այլ') && (
                            <div className={'staffInputSec editStaffInputSec otherInputSec'}>
                                <label htmlFor="OtherPosition">Նշել պաշտոնը</label>
                                <input type="text" name="OtherPosition" id="OtherPosition" className={darkMode ? ' darkInpt' : ''}/>
                            </div>
                        )}
                    </div>  
                </div> 
                </div>
            </div>
            </div>
            <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
                <label htmlFor="HVHHNumber">ՀՎՀՀ</label>
                <input type="text" name="HVHHNumber" id="HVHHNumber" className={darkMode ? ' darkInpt' : ''}/>
            </div>
            </div>
            <h2 className='labelLike'>Գործունեության հասցե</h2>
            <div className='singleStaffRow InputsRow AddresswithHeadline'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="BusinessCountry">Երկիր</label>
                    <input type="text" name="BusinessCountry" id="BusinessCountry" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="BusinessCity">Քաղաք</label>
                    <input type="text" name="BusinessCity" id="BusinessCity" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="BusinessAddress">Հասցե</label>
                    <input type="text" name="BusinessAddress" id="BusinessAddress" className={darkMode ? ' darkInpt' : ''}/>
                </div>
            </div>
            <h2 className='labelLike'>Իրավաբանական հասցե</h2>
            <div className='singleStaffRow InputsRow AddresswithHeadline'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="LegalCountry">Երկիր</label>
                    <input type="text" name="LegalCountry" id="LegalCountry" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="LegalCity">Քաղաք</label>
                    <input type="text" name="LegalCity" id="LegalCity" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="LegalAddress">Հասցե</label>
                    <input type="text" name="LegalAddress" id="LegalAddress" className={darkMode ? ' darkInpt' : ''}/>
                </div>
            </div>
            <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
                <label htmlFor="Telephone">Հեռ․</label>
                <input type="tel" name="Telephone" id="Telephone" className={darkMode ? ' darkInpt' : ''}/>
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
                <label htmlFor="Email">Էլ․ հասցե</label>
                <input type="email" name="Email" id="Email" className={darkMode ? ' darkInpt' : ''}/>
            </div>
            </div>
            <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
                <label htmlFor="PetRegisterNumber">Պետ Ռեգիստրի գրանցման համար</label>
                <input type="text" name="PetRegisterNumber" id="PetRegisterNumber" className={darkMode ? ' darkInpt' : ''}/>
            </div>
            </div>
            <div className='singleStaffRow InputsRow'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="LegalType">Կազմակերպաիրավական տեսակը</label>
                    <div className='staffInputSec RoleInptSec'>
                        <select name="LegalType" id="LegalType" onChange={handleLegalTypeOptionChange} className={darkMode ? ' darkInpt' : ''}>
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
                </div>
                {(selectedLegalTypeOption === 'Այլ') && (
                    <div className={'staffInputSec editStaffInputSec'}>
                        <label htmlFor="OtherLegalType">Նշել տեսակը</label>
                        <input type="text" name="OtherLegalType" id="OtherLegalType" className={darkMode ? ' darkInpt' : ''}/>
                    </div>
                )}
                <div>
                    <button className="welcome-btn">Ավելացնել</button>
                </div>
            </div>
            
        </div>
    );
};