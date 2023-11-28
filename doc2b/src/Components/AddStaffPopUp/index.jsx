import {React, useState, useRef} from 'react';

import StaffAvatar from "../../assets/Images/StaffAvatar.png";

import { RxCross2 } from "react-icons/rx";
import { HiCamera } from 'react-icons/hi';
import { ImCheckmark } from "react-icons/im";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { BsInfoLg } from "react-icons/bs";

export default function AddStaffPopUp({ darkMode, close }) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileUploadError, setFileUploadError] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState("Անձնագիր");
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef(null);
    const ImageInputRef = useRef(null);

    const avatarStyle = {
        backgroundImage: selectedImage ? `url(${selectedImage})` : `url(${StaffAvatar})`,
        backgroundSize: selectedImage ? 'cover' : '50%',
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
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
  
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length === 2) {
            setSelectedFiles(files);
            setFileUploadError(null);
        } else {
            setFileUploadError('Ներբեռնել 2 ֆայլ');
        }
    };

    return (
        <div className={"AddPopUp" + (darkMode ? ' Dark DarkPopUp' : '')}>
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
                    <div className='staffInputSec RoleInptSec InputsRow popUpUploadRow'>
                    <div className='role-sec'>
                        <label htmlFor="Role">Դերը</label>
                        <select name="Role" id="Role" className={darkMode ? ' darkInpt' : ''}>
                            <option value="Admin">Admin</option>
                            <option value="Standart">Standart</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <div className='upload-doc-sec'>
                        <div className={"chartFilters StaffMemberEditDoc" + (darkMode ? ' darkChartFilters' : '')}>
                            <h2>Ներբեռնել փաստաթուղթ</h2>
                            <div>
                                <input type="radio" id="filterChoice1" name="chartFilter" value="Անձնագիր" defaultChecked={selectedRadio === "Անձնագիր"} onChange={() => setSelectedRadio("Անձնագիր")} />
                                <label htmlFor="filterChoice1" className={(darkMode ? ' whiteElement' : '')}>Անձնագիր</label>

                                <input type="radio" id="filterChoice2" name="chartFilter" value="քարտ" defaultChecked={selectedRadio === "քարտ"} onChange={() => setSelectedRadio("քարտ")} />
                                <label htmlFor="filterChoice2" className={(darkMode ? ' whiteElement' : '')}>ID քարտ</label>
                            </div>
                        </div>
                        <div>
                            <input
                                type="file"
                                id="uploadButton"
                                ref={fileInputRef}
                                accept=".pdf, .doc, .docx"
                                style={{ display: 'none' }}
                                multiple
                                onChange={handleFileChange}
                            />
                            {!fileUploadError ? 
                            selectedFiles.length === 1 ? (
                                selectedRadio === "Անձնագիր" ? (
                                    <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                        {selectedFiles[0].name}<BsFillCloudUploadFill/>
                                    </button>
                                ) : (
                                    <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                        {selectedFiles[0].name}<BsFillCloudUploadFill/>
                                    </button>
                                )
                            ) :
                            selectedFiles.length === 2 ? (
                                selectedRadio === "Անձնագիր" ? (
                                    <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                        Ներբեռնված է<ImCheckmark className='uploadedFileIcon'/>
                                    </button>
                                ) : (
                                    <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                        Ներբեռնված է<ImCheckmark className='uploadedFileIcon'/>
                                    </button>
                                )
                            ) :
                            (selectedRadio === "Անձնագիր" ? (
                                    <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                        Ներբեռնել Անձնագիր<BsFillCloudUploadFill/>
                                    </button>
                                ) : (
                                    <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                        Ներբեռնել ID Քարտ<BsFillCloudUploadFill/>
                                    </button>
                                )
                            ) :
                            <button className='edit-upload-btn' onClick={handleUploadButtonClick}>
                                {fileUploadError}<ImCross/>
                            </button>}
                        </div>
                        <div className='instructions-sec'>
                            <button className='instructionsIcon'><BsInfoLg/></button>
                            <div className={'uploadInstructions' + (darkMode ? ' darkUploadInstructions' : '')}>
                                <p>Անձնագրային տվյալների հաստատման համար անհրաժեշտ է կցել Ձեր անձնագրի հիմնական (2-3) էջերի միասնական լուսանկարը/սկանը կամ նույնականացման քարտի (ID քարտ) դիմանկարով կողմի լուսանկարը/սկանը, ինչպես նաև Ձեր ինքնանկարը (սելֆի)` անձը հաստատող փաստաթղթի կամ նույնականացման քարտի (ID քարտ) դիմանկարով էջը ձեռքում պահած: Խնդրում ենք լինել ուշադիր, որպեսզի լուսանկարներում ամբողջությամբ տեսանելի լինեն փաստաթղթի եզրերը:
                                Լուսանկարները վերբեռնելիս համոզվեք, որ դրանք համապատասխանում են հետևյալ չափանիշներին.
                                Ֆայլը JPG, PNG կամ GIF ձևաչափով է և չի գերազանցում 15 mb-ը:
                                Փաստաթղթի վավերականության ժամկետն անցած չէ։
                                Պատկերը պետք է լինի իրական գույներով, ոչ թե սև-սպիտակ:
                                Սկանը/լուսանկարը պետք է կատարված լինի փաստաթղթի բնօրինակից, չի թույլատրվում որևէ թվային մոնտաժ:</p>
                            </div>
                        </div>
                    </div>
                    </div>                   
                </div>
                </div>
            </div>
            <div className='singleStaffRow'>
                <div className='PositionDivisionSec'>
                <div className='staffInputSec editStaffInputSec'>
                    <label htmlFor="Position">Պաշտոն</label>
                    <select name="Position" id="Position" className={darkMode ? ' darkInpt' : ''}>
                        <option value="Պաշտոն 1">Պաշտոն 1</option>
                        <option value="Պաշտոն 2">Պաշտոն 2</option>
                        <option value="Պաշտոն 3">Պաշտոն 3</option>
                        <option value="Պաշտոն 4">Պաշտոն 4</option>
                    </select>
                </div> 
                <div className='staffInputSec editStaffInputSec'>
                    <label htmlFor="Division">Ստորաբաժանում</label>
                    <select name="Division" id="Division" className={darkMode ? ' darkInpt' : ''}>
                        <option value="Ստորաբաժանում 1">Ստորաբաժանում 1</option>
                        <option value="Ստորաբաժանում 2">Ստորաբաժանում 2</option>
                        <option value="Ստորաբաժանում 3">Ստորաբաժանում 3</option>
                        <option value="Ստորաբաժանում 4">Ստորաբաժանում 4</option>
                    </select>
                </div>
                </div>
            </div>
            <div className='singleStaffRow InputsRow'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="BirthDate">Ծննդյան տարեթիվ</label>
                    <input type="date" name="BirthDate" id="BirthDate" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec' }>
                    <label htmlFor="Nationality">Ազգություն</label>
                    <input type="text" name="Nationality" id="Nationality" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="Sex">Սեռ</label>
                    <select name="Sex" id="Sex" className={darkMode ? ' darkInpt' : ''}>
                        <option value="Արական">Արական</option>
                        <option value="Իգական">Իգական</option>
                    </select>
                </div>
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
                    <label htmlFor="Country">Երկիր</label>
                    <input type="text" name="Country" id="Country" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="City">Քաղաք</label>
                    <input type="text" name="City" id="City" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="Address">Հասցե</label>
                    <input type="text" name="Address" id="Address" className={darkMode ? ' darkInpt' : ''}/>
                </div>
            </div>
            <div className='singleStaffRow InputsRow'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="PassportGivenBy">Ում կողմից է տրված անձնագիրը</label>
                    <input type="text" name="PassportGivenBy" id="PassportGivenBy" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="PassportType">Անձնագրի տեսակը</label>
                    <input type="text" name="PassportType" id="PassportType" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="PassportNumber">Անձնագրի համարը</label>
                    <input type="text" name="PassportNumber" id="PassportNumber" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="SocialNumber">Սոց․ քարտի համարը</label>
                    <input type="text" name="SocialNumber" id="SocialNumber" className={darkMode ? ' darkInpt' : ''}/>
                </div>
            </div>
            <div className='singleStaffRow InputsRow'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="WorkingDaysWeek">Շաբաթական աշխատանքային օրեր</label>
                    <input type="number" name="WorkingDaysWeek" id="WorkingDaysWeek" min={1} max={7} className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="HoursPerWeek">Շաբաթական աշխատաժամանակ</label>
                    <input type="number" name="HoursPerWeek" id="HoursPerWeek" min={1} className={darkMode ? ' darkInpt' : ''}/>
                </div>
            </div>
            <div className='singleStaffRow InputsRow'>
                <div className={'staffInputSec DateInputSec editStaffInputSec'}>
                    <label htmlFor="WorkStartTime">Աշխատանքային օրվա սկիզբ</label>
                    <input type="time" name="WorkingDaysWeek" id="WorkingDaysWeek" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec DateInputSec editStaffInputSec'}>
                <label htmlFor="WorkEndTime">Աշխատանքային օրվա ավարտ</label>
                <input type="time" name="HoursPerWeek" id="HoursPerWeek" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec DateInputSec editStaffInputSec'}>
                    <label htmlFor="WorkStartDate">Աշխատանքի ընդունման օր</label>
                    <input type="date" name="WorkStartDate" id="WorkStartDate" className={darkMode ? ' darkInpt' : ''}/>
                </div>
                <div className={'staffInputSec DateInputSec editStaffInputSec'}>
                    <label htmlFor="WorkEndDate">Աշխատանքի ավարտ</label>
                    <input type="date" name="WorkEndDate" id="WorkEndDate" className={darkMode ? ' darkInpt' : ''}/>
                </div>
            </div>
            <div className='singleStaffRow InputsRow'>
                <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor="Salary">Աշխատավարձի չափ</label>
                    <div>
                        <input type="number" name="Salary" id="Salary" min={10000} className={darkMode ? ' darkInpt' : ''}/>
                        <select name="Currency" id="Currency" className={darkMode ? ' darkInpt' : ''}>
                            <option value="AMD">AMD</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className="welcome-btn">Ավելացնել</button>
                </div>
            </div>
        </div>
    );
};