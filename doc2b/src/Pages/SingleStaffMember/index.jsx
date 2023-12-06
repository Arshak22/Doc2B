import React, { useState, useRef } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import MyEventCalendar from '../../Components/MyEventCalendar';
import StaffAvatar from '../../assets/Images/StaffAvatar.png';

import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { BsInfoLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { HiCamera } from 'react-icons/hi';

export default function SingleStaffMember() {
  const { darkMode } = useGlobalContext();
  let member = {
    first_name: 'Անուն',
    last_name: 'Ազգանուն',
    fathers_name: 'Հայրանուն',
    status: 'Admin',
    position: 'Պաշտոն 1',
    division: 'Ստորաբաժանում 1',
    bod: '16 / 12 / 1999',
    nationality: 'Հայ',
    sex: 'Արական',
    tel: '+374-95-555-555',
    email: 'test@gmail.com',
    country: 'Հայաստան',
    city: 'Երևան',
    address: 'Արամ Խաչատրյան փողոց, 33/2, բն․ 49',
    passportGivenBy: 'ՀԾ 6532320',
    passportType: 'Միջազգային',
    passportNumber: 'A43126521',
    socialNumber: 'A43126521',
    weekWorkingDays: 5,
    weekHours: 40,
    workStartTime: '10:00',
    workEndTime: '18:00',
    workStartDate: '25 / 05 / 2021',
    workEndDate: '16 / 06 / 2022',
    salary: 400000,
    currency: 'AMD',
  };
  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState('Անձնագիր');
  const [fileUploadError, setFileUploadError] = useState(null);

  const fileInputRef = useRef(null);
  const ImageInputRef = useRef(null);

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

  const handleEditMode = () => {
    setEditMode(!editMode);
    setSelectedFiles([]);
  };

  const avatarStyle = {
    backgroundImage: selectedImage
      ? `url(${selectedImage})`
      : `url(${StaffAvatar})`,
    backgroundSize: selectedImage ? 'cover' : '50%',
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
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {!openDelete ? <>
          <div className='singleStaffRow'>
            <div className='singleStaffNameSection'>
              {editMode ? (
                <div className='userAvatar StaffAvatarEdit' style={avatarStyle}>
                  <div
                    className='uploadStaffAvatarSec'
                    onClick={handleUploadImageClick}
                  >
                    <div>
                      <HiCamera />
                    </div>
                  </div>
                  <input
                    type='file'
                    id='UploadImageInput'
                    ref={ImageInputRef}
                    accept='.jpg, .jpeg, .png'
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <div className='userAvatar' style={avatarStyle}></div>
              )}
              <div>
                {!editMode ? (
                  <h2
                    className={
                      'singleStaffName' + (darkMode ? ' whiteElement' : '')
                    }
                  >
                    {member.first_name} {member.last_name} {member.fathers_name}
                  </h2>
                ) : (
                  <div className='staffInputSec NameInptSec'>
                    <div>
                      <label htmlFor='Name'>Անուն</label>
                      <input
                        type='text'
                        name='Name'
                        id='Name'
                        defaultValue={member.first_name}
                        className={darkMode ? ' darkInpt' : ''}
                      />
                    </div>
                    <div>
                      <label htmlFor='Surname'>Ազգանուն</label>
                      <input
                        type='text'
                        name='Surname'
                        id='Surname'
                        defaultValue={member.last_name}
                        className={darkMode ? ' darkInpt' : ''}
                      />
                    </div>
                    <div>
                      <label htmlFor='FatersName'>Հայրանուն</label>
                      <input
                        type='text'
                        name='FatersName'
                        id='FatersName'
                        defaultValue={member.fathers_name}
                        className={darkMode ? ' darkInpt' : ''}
                      />
                    </div>
                  </div>
                )}
                {!editMode ? (
                  <h3 className='singleStaffStatus'>{member.status}</h3>
                ) : (
                  <div className='staffInputSec RoleInptSec'>
                    <label htmlFor='Role'>Դերը</label>
                    <select
                      name='Role'
                      id='Role'
                      defaultValue={member.status}
                      className={darkMode ? ' darkInpt' : ''}
                    >
                      <option value='Admin'>Admin</option>
                      <option value='Standart'>Standart</option>
                      <option value='Inactive'>Inactive</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div>
              {!editMode ? (
                <button
                  className='welcome-btn staff-edit-button'
                  onClick={handleEditMode}
                >
                  Խմբագրել <AiFillEdit />
                </button>
              ) : (
                <div className='staff-edit-group-btns'>
                  <button className='save-staff-edit' onClick={handleEditMode}>
                    <ImCheckmark />
                  </button>
                  <button
                    className='cancel-staff-edit'
                    onClick={() => setOpenDelete(true)}
                  >
                    <ImCross />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='singleStaffRow'>
            <div className='PositionDivisionSec'>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.position}
                </h3>
              ) : (
                <div className='staffInputSec editStaffInputSec'>
                  <label htmlFor='Position'>Պաշտոն</label>
                  <select
                    name='Position'
                    id='Position'
                    defaultValue={member.position}
                    className={darkMode ? ' darkInpt' : ''}
                  >
                    <option value='Պաշտոն 1'>Պաշտոն 1</option>
                    <option value='Պաշտոն 2'>Պաշտոն 2</option>
                    <option value='Պաշտոն 3'>Պաշտոն 3</option>
                    <option value='Պաշտոն 4'>Պաշտոն 4</option>
                  </select>
                </div>
              )}
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.division}
                </h3>
              ) : (
                <div className='staffInputSec editStaffInputSec'>
                  <label htmlFor='Division'>Ստորաբաժանում</label>
                  <select
                    name='Division'
                    id='Division'
                    defaultValue={member.division}
                    className={darkMode ? ' darkInpt' : ''}
                  >
                    <option value='Ստորաբաժանում 1'>Ստորաբաժանում 1</option>
                    <option value='Ստորաբաժանում 2'>Ստորաբաժանում 2</option>
                    <option value='Ստորաբաժանում 3'>Ստորաբաժանում 3</option>
                    <option value='Ստորաբաժանում 4'>Ստորաբաժանում 4</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='BirthDate'>Ծննդյան տարեթիվ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.bod}
                </h3>
              ) : (
                <input
                  type='date'
                  name='BirthDate'
                  id='BirthDate'
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Nationality'>Ազգություն</label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.nationality}
                </h3>
              ) : (
                <input
                  type='text'
                  name='Nationality'
                  id='Nationality'
                  defaultValue={member.nationality}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Sex'>Սեռ</label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.sex}
                </h3>
              ) : (
                <select
                  name='Sex'
                  id='Sex'
                  defaultValue={member.sex}
                  className={darkMode ? ' darkInpt' : ''}
                >
                  <option value='Արական'>Արական</option>
                  <option value='Իգական'>Իգական</option>
                </select>
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Telephone'>Հեռ․</label>
              {!editMode ? (
                <a href={'tel:' + member.tel}>
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {member.tel}
                  </h3>
                </a>
              ) : (
                <input
                  type='tel'
                  name='Telephone'
                  id='Telephone'
                  defaultValue={member.tel}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Email'>Էլ․ հասցե</label>
              {!editMode ? (
                <a href={'mailto:' + member.email}>
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {member.email}
                  </h3>
                </a>
              ) : (
                <input
                  type='email'
                  name='Email'
                  id='Email'
                  defaultValue={member.email}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Country'>Երկիր</label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.country}
                </h3>
              ) : (
                <input
                  type='text'
                  name='Country'
                  id='Country'
                  defaultValue={member.country}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='City'>Քաղաք</label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.city}
                </h3>
              ) : (
                <input
                  type='text'
                  name='City'
                  id='City'
                  defaultValue={member.city}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Address'>Հասցե</label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.address}
                </h3>
              ) : (
                <input
                  type='text'
                  name='Address'
                  id='Address'
                  defaultValue={member.address}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div
              className={
                'staffInputSec narrowInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='PassportGivenBy' >
                Ում կողմից է տրված անձնագիրը
              </label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.passportGivenBy}
                </h3>
              ) : (
                <input
                  type='text'
                  name='PassportGivenBy'
                  id='PassportGivenBy'
                  defaultValue={member.passportGivenBy}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec narrowInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='PassportGivenDate'>Տրման ամսաթիվ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.bod}
                </h3>
              ) : (
                <input
                  type='date'
                  name='PassportGivenDate'
                  id='PassportGivenDate'
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec narrowInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='PassportType'>Անձնագրի տեսակը</label>
              {!editMode ? (
                <h3 className={darkMode ? ' whiteElement' : ''}>
                  {member.passportType}
                </h3>
              ) : (
                <input
                  type='text'
                  name='PassportType'
                  id='PassportType'
                  defaultValue={member.passportType}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec narrowInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='PassportNumber'>Անձնագրի համարը</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.passportNumber}
                </h3>
              ) : (
                <input
                  type='text'
                  name='PassportNumber'
                  id='PassportNumber'
                  defaultValue={member.passportNumber}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec narrowInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='SocialNumber'>Սոց․ քարտի համարը</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.socialNumber}
                </h3>
              ) : (
                <input
                  type='text'
                  name='SocialNumber'
                  id='SocialNumber'
                  defaultValue={member.socialNumber}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='WorkingDaysWeek'>
                Շաբաթական աշխատանքային օրեր
              </label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.weekWorkingDays}
                </h3>
              ) : (
                <input
                  type='number'
                  name='WorkingDaysWeek'
                  id='WorkingDaysWeek'
                  min={1}
                  max={7}
                  defaultValue={member.weekWorkingDays}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='HoursPerWeek'>Շաբաթական աշխատաժամանակ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.weekHours}
                </h3>
              ) : (
                <input
                  type='number'
                  name='HoursPerWeek'
                  id='HoursPerWeek'
                  min={1}
                  defaultValue={member.weekHours}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div
              className={
                'staffInputSec DateInputSec' +
                (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='WorkStartTime'>Աշխատանքային օրվա սկիզբ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.workStartTime}
                </h3>
              ) : (
                <input
                  type='time'
                  name='WorkingDaysWeek'
                  id='WorkingDaysWeek'
                  defaultValue={member.workStartTime}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec DateInputSec' +
                (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='WorkEndTime'>Աշխատանքային օրվա ավարտ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.workEndTime}
                </h3>
              ) : (
                <input
                  type='time'
                  name='HoursPerWeek'
                  id='HoursPerWeek'
                  defaultValue={member.workEndTime}
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec DateInputSec' +
                (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='WorkStartDate'>Աշխատանքի ընդունման օր</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.workStartDate}
                </h3>
              ) : (
                <input
                  type='date'
                  name='WorkStartDate'
                  id='WorkStartDate'
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
            <div
              className={
                'staffInputSec DateInputSec' +
                (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='WorkEndDate'>Աշխատանքի ավարտ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.workEndDate}
                </h3>
              ) : (
                <input
                  type='date'
                  name='WorkEndDate'
                  id='WorkEndDate'
                  className={darkMode ? ' darkInpt' : ''}
                />
              )}
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div
              className={
                'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
              }
            >
              <label htmlFor='Salary'>Աշխատավարձի չափ</label>
              {!editMode ? (
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {member.salary} {member.currency}
                </h3>
              ) : (
                <div>
                  <input
                    type='number'
                    name='Salary'
                    id='Salary'
                    min={10000}
                    defaultValue={member.salary}
                    className={darkMode ? ' darkInpt' : ''}
                  />
                  <select
                    name='Currency'
                    id='Currency'
                    defaultValue={member.currency}
                    className={darkMode ? ' darkInpt' : ''}
                  >
                    <option value='AMD'>AMD</option>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='RUB'>RUB</option>
                  </select>
                </div>
              )}
            </div>
            {editMode ? (
              <div className='upload-doc-sec'>
                <div
                  className={
                    'chartFilters StaffMemberEditDoc' +
                    (darkMode ? ' darkChartFilters' : '')
                  }
                >
                  <h2>Ներբեռնել փաստաթուղթ</h2>
                  <div>
                    <input
                      type='radio'
                      id='filterChoice1'
                      name='chartFilter'
                      value='Անձնագիր'
                      defaultChecked={selectedRadio === 'Անձնագիր'}
                      onChange={() => setSelectedRadio('Անձնագիր')}
                    />
                    <label
                      htmlFor='filterChoice1'
                      className={darkMode ? ' whiteElement' : ''}
                    >
                      Անձնագիր
                    </label>

                    <input
                      type='radio'
                      id='filterChoice2'
                      name='chartFilter'
                      value='քարտ'
                      defaultChecked={selectedRadio === 'քարտ'}
                      onChange={() => setSelectedRadio('քարտ')}
                    />
                    <label
                      htmlFor='filterChoice2'
                      className={darkMode ? ' whiteElement' : ''}
                    >
                      ID քարտ
                    </label>
                  </div>
                </div>
                <div>
                  <input
                    type='file'
                    id='uploadButton'
                    ref={fileInputRef}
                    accept='.pdf, .doc, .docx'
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                  />
                  {!fileUploadError ? (
                    selectedFiles.length === 1 ? (
                      selectedRadio === 'Անձնագիր' ? (
                        <button
                          className='edit-upload-btn'
                          onClick={handleUploadButtonClick}
                        >
                          {selectedFiles[0].name}
                          <BsFillCloudUploadFill />
                        </button>
                      ) : (
                        <button
                          className='edit-upload-btn'
                          onClick={handleUploadButtonClick}
                        >
                          {selectedFiles[0].name}
                          <BsFillCloudUploadFill />
                        </button>
                      )
                    ) : selectedFiles.length === 2 ? (
                      selectedRadio === 'Անձնագիր' ? (
                        <button
                          className='edit-upload-btn'
                          onClick={handleUploadButtonClick}
                        >
                          Ներբեռնված է
                          <ImCheckmark className='uploadedFileIcon' />
                        </button>
                      ) : (
                        <button
                          className='edit-upload-btn'
                          onClick={handleUploadButtonClick}
                        >
                          Ներբեռնված է
                          <ImCheckmark className='uploadedFileIcon' />
                        </button>
                      )
                    ) : selectedRadio === 'Անձնագիր' ? (
                      <button
                        className='edit-upload-btn'
                        onClick={handleUploadButtonClick}
                      >
                        Ներբեռնել Անձնագիր
                        <BsFillCloudUploadFill />
                      </button>
                    ) : (
                      <button
                        className='edit-upload-btn'
                        onClick={handleUploadButtonClick}
                      >
                        Ներբեռնել ID Քարտ
                        <BsFillCloudUploadFill />
                      </button>
                    )
                  ) : (
                    <button
                      className='edit-upload-btn'
                      onClick={handleUploadButtonClick}
                    >
                      {fileUploadError}
                      <ImCross />
                    </button>
                  )}
                </div>
                <div className='instructions-sec'>
                  <button className='instructionsIcon'>
                    <BsInfoLg />
                  </button>
                  <div
                    className={
                      'uploadInstructions' +
                      (darkMode ? ' darkUploadInstructions' : '')
                    }
                  >
                    <p>
                      Անձնագրային տվյալների հաստատման համար անհրաժեշտ է կցել Ձեր
                      անձնագրի հիմնական (2-3) էջերի միասնական լուսանկարը/սկանը
                      կամ նույնականացման քարտի (ID քարտ) դիմանկարով կողմի
                      լուսանկարը/սկանը, ինչպես նաև Ձեր ինքնանկարը (սելֆի)` անձը
                      հաստատող փաստաթղթի կամ նույնականացման քարտի (ID քարտ)
                      դիմանկարով էջը ձեռքում պահած: Խնդրում ենք լինել ուշադիր,
                      որպեսզի լուսանկարներում ամբողջությամբ տեսանելի լինեն
                      փաստաթղթի եզրերը: Լուսանկարները վերբեռնելիս համոզվեք, որ
                      դրանք համապատասխանում են հետևյալ չափանիշներին. Ֆայլը JPG,
                      PNG կամ GIF ձևաչափով է և չի գերազանցում 15 mb-ը: Փաստաթղթի
                      վավերականության ժամկետն անցած չէ։ Պատկերը պետք է լինի
                      իրական գույներով, ոչ թե սև-սպիտակ: Սկանը/լուսանկարը պետք է
                      կատարված լինի փաստաթղթի բնօրինակից, չի թույլատրվում որևէ
                      թվային մոնտաժ:
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {!editMode ? (
            <div className='singleStaffRow InputsRow'>
              <button>Դիտել բոլոր փաստաթղթերը</button>
            </div>
          ) : null}
        </> : 
        <div className='delete-confirm-section'>
        <h3 className={darkMode ? ' whiteElement' : ''}>
          {!deleteError
            ? 'Ցանկանու՞մ եք ջնջել տվյալ աշխատողին'
            : deleteError}
        </h3>
        {!deleteError ? (
          <div>
            <button className='save-staff-edit'>
              Այո
            </button>
            <button
              className='cancel-staff-edit'
              onClick={() => setOpenDelete(false)}
            >
              Ոչ
            </button>
          </div>
        ) : null}
      </div>}
      </div>
      <div className='groupedSideBlocks'>
        <div className='AddsSection adds_2'></div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
