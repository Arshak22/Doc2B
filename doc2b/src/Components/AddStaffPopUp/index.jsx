import { React, useState, useRef, useEffect } from 'react';
import './style.css';

import StaffAvatar from '../../assets/Images/StaffAvatar.png';

import { AddNewStaff } from '../../Platform/StaffRequests';
import { GetAllPositions } from '../../Platform/PositionRequests';
import { GetAllDepartments } from '../../Platform/DepartmentRequests';

import { RxCross2 } from 'react-icons/rx';
import { HiCamera } from 'react-icons/hi';
import { ImCheckmark } from 'react-icons/im';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { BsInfoLg } from 'react-icons/bs';

export default function AddStaffPopUp({ darkMode, close }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState('Անձնագիր');
  const [selectedImage, setSelectedImage] = useState(null);
  const [submited, setSubmited] = useState(false);
  const [addMeInstead, setAddMeInstead] = useState(false);
  const [addNewAccount, setAddNewAccount] = useState(false);
  const [positions, setPositions] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const [inputs, setInputs] = useState({
    Name: '',
    Surname: '',
    FathersName: '',
    role: 'Admin',
    position: '',
    division: '',
    BOT: '',
    nationality: '',
    sex: 'Արական',
    telephone: '',
    email: '',
    country: '',
    city: '',
    address: '',
    PassportGivenBy: '',
    PassportGivenDate: '',
    PassportType: '',
    PassportNumber: '',
    SocialNumber: '',
    WorkingDaysWeek: '',
    HoursPerWeek: '',
    WorkStartTime: '',
    WorkEndTime: '',
    WorkStartDate: '',
    WorkEndDate: '',
    salary: '',
    currency: 'AMD',
  });

  const getPositionList = async () => {
    const result = await GetAllPositions();
    if (result) {
      setPositions(result.data);
      if (result.data[1]) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          position: result.data[1].id,
        }));
      }
    }
  };

  const getDivisionList = async (id) => {
    const result = await GetAllDepartments(id);
    if (result) {
      setDivisions(result.data);
      if (result.data[1]) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          division: result.data[1].id,
        }));
      }
    }
  };

  useEffect(() => {
    getPositionList();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem('companyID');
    getDivisionList(id);
  }, []);

  useEffect(() => {
    setErrors([]);
  }, [positions, divisions]);

  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const ImageInputRef = useRef(null);

  const avatarStyle = {
    backgroundImage: selectedImage
      ? `url(${selectedImage})`
      : `url(${StaffAvatar})`,
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

  const handleInputChange = (e, inputName) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setErrors({});
    setFileUploadError('');

    const requiredFields = [
      'Name',
      'Surname',
      // 'FathersName',
      // 'position',
      'division',
      // 'BOT',
      // 'nationality',
      // 'sex',
      // 'telephone',
      'email',
      // 'country',
      // 'city',
      // 'address',
      // 'PassportGivenBy',
      // 'PassportGivenDate',
      // 'PassportType',
      // 'PassportNumber',
      // 'SocialNumber',
      // 'WorkingDaysWeek',
      // 'HoursPerWeek',
      // 'WorkStartTime',
      // 'WorkEndTime',
      // 'WorkStartDate',
      // 'salary',
      // 'currency',
    ];

    const newInputs = { ...inputs };
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newInputs[field]) {
        newErrors[field] = 'Դաշտը պարտադիր է';
      }
    });

    // if (selectedFiles.length === 0) {
    //   setFileUploadError('Ներբեռնել 2 ֆայլ');
    // }

    if (Object.keys(newErrors).length > 0 || fileUploadError) {
      setErrors(newErrors);
    } else {
      const employee = {
        employer_image: selectedImage,
        employer_first_name: inputs.Name,
        employer_last_name: inputs.Surname,
        employer_middle_name: inputs.FathersName,
        employer_birth_date: inputs.BOT,
        employer_social_card: inputs.SocialNumber,
        employer_passport_type: inputs.PassportType,
        employer_passport: inputs.PassportNumber,
        employer_passport_date_of_issue: inputs.PassportGivenDate,
        employer_passport_authority: inputs.PassportGivenBy,
        employer_register_address: `${inputs.country} ${inputs.city} ${inputs.address}`,
        employer_phone_number: inputs.telephone,
        employer_email: inputs.email,
        employer_nationality: inputs.nationality,
        weekly_working_hours: inputs.HoursPerWeek,
        weekly_working_days: inputs.WorkingDaysWeek,
        employer_job_start_day: inputs.WorkStartDate,
        employer_job_start_time: inputs.WorkStartTime,
        employer_salary: inputs.salary,
        employer_salary_currency: inputs.currency,
        employer_status: inputs.role,
        connected: addMeInstead || addNewAccount ? true : false,
        employer_position: inputs.position,
        employer_department: inputs.division,
        company: localStorage.getItem('companyID'),
      };
      if (inputs.WorkEndDate !== '') {
        employee.employer_job_end_day = inputs.WorkEndDate;
      }
      console.log(employee);
      await AddNewStaff(employee);
      setSubmited(true);
      setSelectedFiles([]);
      setSelectedImage(null);
    }
  };

  return (
    <div className={'AddPopUp' + (darkMode ? ' Dark DarkPopUp' : '')}>
      <button
        className={'event-closeBtn' + (darkMode ? ' whiteX' : '')}
        onClick={close}
      >
        <RxCross2 />
      </button>
      {!submited ? (
        <>
          <div className='singleStaffRow'>
            <div className='singleStaffNameSection'>
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
              <div>
                <div className='staffInputSec NameInptSec'>
                  <div>
                    <label htmlFor='Name'>Անուն</label>
                    <input
                      type='text'
                      name='Name'
                      id='Name'
                      className={`${darkMode ? 'darkInpt' : ''} ${
                        errors.Name ? 'inptError' : ''
                      }`}
                      onChange={(e) => handleInputChange(e, 'Name')}
                    />
                  </div>
                  <div>
                    <label htmlFor='Surname'>Ազգանուն</label>
                    <input
                      type='text'
                      name='Surname'
                      id='Surname'
                      className={`${darkMode ? 'darkInpt' : ''} ${
                        errors.Surname ? 'inptError' : ''
                      }`}
                      onChange={(e) => handleInputChange(e, 'Surname')}
                    />
                  </div>
                  <div>
                    <label htmlFor='FatersName'>Հայրանուն</label>
                    <input
                      type='text'
                      name='FatersName'
                      id='FatersName'
                      className={`${darkMode ? 'darkInpt' : ''} ${
                        errors.FathersName ? 'inptError' : ''
                      }`}
                      onChange={(e) => handleInputChange(e, 'FathersName')}
                    />
                  </div>
                  <div className='mySwitchSection'>
                    <div>
                      <label htmlFor='AddMe'>Կցել ինձ</label>
                      <input
                        id='AddMe'
                        type='checkbox'
                        className='switch'
                        onChange={() => setAddMeInstead(!addMeInstead)}
                      />
                    </div>
                    <div>
                      <label htmlFor='ConfirmUserAccount'>
                        Ավելացնել օգտահաշիվ
                      </label>
                      <input
                        id='ConfirmUserAccount'
                        type='checkbox'
                        className='switch'
                        onChange={() => setAddNewAccount(!addNewAccount)}
                      />
                    </div>
                  </div>
                </div>
                <div className='staffInputSec RoleInptSec InputsRow popUpUploadRow'>
                  <div className='role-sec'>
                    <label htmlFor='Role'>Դերը</label>
                    <select
                      name='Role'
                      id='Role'
                      className={`${darkMode ? 'darkInpt' : ''} ${
                        errors.role ? 'inptError' : ''
                      }`}
                      onChange={(e) => handleInputChange(e, 'role')}
                    >
                      <option value='Admin'>Admin</option>
                      <option value='Standart'>Standart</option>
                      <option value='Inactive'>Inactive</option>
                    </select>
                  </div>
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
                          className='edit-upload-btn upload-error-btn'
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
                          Անձնագրային տվյալների հաստատման համար անհրաժեշտ է կցել
                          Ձեր անձնագրի հիմնական (2-3) էջերի միասնական
                          լուսանկարը/սկանը կամ նույնականացման քարտի (ID քարտ)
                          դիմանկարով կողմի լուսանկարը/սկանը, ինչպես նաև Ձեր
                          ինքնանկարը (սելֆի)` անձը հաստատող փաստաթղթի կամ
                          նույնականացման քարտի (ID քարտ) դիմանկարով էջը ձեռքում
                          պահած: Խնդրում ենք լինել ուշադիր, որպեսզի
                          լուսանկարներում ամբողջությամբ տեսանելի լինեն փաստաթղթի
                          եզրերը: Լուսանկարները վերբեռնելիս համոզվեք, որ դրանք
                          համապատասխանում են հետևյալ չափանիշներին. Ֆայլը JPG,
                          PNG կամ GIF ձևաչափով է և չի գերազանցում 15 mb-ը:
                          Փաստաթղթի վավերականության ժամկետն անցած չէ։ Պատկերը
                          պետք է լինի իրական գույներով, ոչ թե սև-սպիտակ:
                          Սկանը/լուսանկարը պետք է կատարված լինի փաստաթղթի
                          բնօրինակից, չի թույլատրվում որևէ թվային մոնտաժ:
                        </p>
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
                <label htmlFor='Position'>Պաշտոն</label>
                <select
                  name='Position'
                  id='Position'
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors.position ? 'inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'position')}
                >
                  {positions.slice(1).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='staffInputSec editStaffInputSec'>
                <label htmlFor='Division'>Ստորաբաժանում</label>
                <select
                  name='Division'
                  id='Division'
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors.division ? 'inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'division')}
                >
                  {divisions.slice(1).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='BirthDate'>Ծննդյան տարեթիվ</label>
              <input
                type='date'
                name='BirthDate'
                id='BirthDate'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.BOT ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'BOT')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='Nationality'>Ազգություն</label>
              <input
                type='text'
                name='Nationality'
                id='Nationality'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.nationality ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'nationality')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='Sex'>Սեռ</label>
              <select
                name='Sex'
                id='Sex'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.sex ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'sex')}
              >
                <option value='Արական'>Արական</option>
                <option value='Իգական'>Իգական</option>
              </select>
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='Telephone'>Հեռ․</label>
              <input
                type='tel'
                name='Telephone'
                id='Telephone'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.telephone ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'telephone')}
              />
            </div>
            {!addMeInstead ? (
              <div className={'staffInputSec editStaffInputSec'}>
                <label htmlFor='Email'>Էլ․ հասցե</label>
                <input
                  type='email'
                  name='Email'
                  id='Email'
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors.email ? 'inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
              </div>
            ) : null}
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='Country'>Երկիր</label>
              <input
                type='text'
                name='Country'
                id='Country'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.country ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'country')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='City'>Քաղաք</label>
              <input
                type='text'
                name='City'
                id='City'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.city ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'city')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='Address'>Հասցե</label>
              <input
                type='text'
                name='Address'
                id='Address'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.address ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'address')}
              />
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='PassportGivenBy'>
                Ում կողմից է տրված անձնագիրը
              </label>
              <input
                type='text'
                name='PassportGivenBy'
                id='PassportGivenBy'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.PassportGivenBy ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'PassportGivenBy')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='PassportGivenDate'>Անձնագրի տրման ամսաթիվը</label>
              <input
                type='date'
                name='PassportGivenDate'
                id='PassportGivenDate'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.BOT ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'PassportGivenDate')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='PassportType'>Անձնագրի տեսակը</label>
              <input
                type='text'
                name='PassportType'
                id='PassportType'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.PassportType ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'PassportType')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='PassportNumber'>Անձնագրի համարը</label>
              <input
                type='text'
                name='PassportNumber'
                id='PassportNumber'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.PassportNumber ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'PassportNumber')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='SocialNumber'>Սոց․ քարտի համարը</label>
              <input
                type='text'
                name='SocialNumber'
                id='SocialNumber'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.SocialNumber ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'SocialNumber')}
              />
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='WorkingDaysWeek'>
                Շաբաթական աշխատանքային օրեր
              </label>
              <input
                type='number'
                name='WorkingDaysWeek'
                id='WorkingDaysWeek'
                min={1}
                max={7}
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.WorkingDaysWeek ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'WorkingDaysWeek')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='HoursPerWeek'>Շաբաթական աշխատաժամանակ</label>
              <input
                type='number'
                name='HoursPerWeek'
                id='HoursPerWeek'
                min={1}
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.HoursPerWeek ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'HoursPerWeek')}
              />
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec DateInputSec editStaffInputSec'}>
              <label htmlFor='WorkStartTime'>Աշխատանքային օրվա սկիզբ</label>
              <input
                type='time'
                name='WorkStartTime'
                id='WorkingDaysWeek'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.WorkStartTime ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'WorkStartTime')}
              />
            </div>
            <div className={'staffInputSec DateInputSec editStaffInputSec'}>
              <label htmlFor='WorkEndTime'>Աշխատանքային օրվա ավարտ</label>
              <input
                type='time'
                name='WorkEndTime'
                id='HoursPerWeek'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.WorkEndTime ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'WorkEndTime')}
              />
            </div>
            <div className={'staffInputSec DateInputSec editStaffInputSec'}>
              <label htmlFor='WorkStartDate'>Աշխատանքի ընդունման օր</label>
              <input
                type='date'
                name='WorkStartDate'
                id='WorkStartDate'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.WorkStartDate ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'WorkStartDate')}
              />
            </div>
            <div className={'staffInputSec DateInputSec editStaffInputSec'}>
              <label htmlFor='WorkEndDate'>Աշխատանքի ավարտ</label>
              <input
                type='date'
                name='WorkEndDate'
                id='WorkEndDate'
                className={`${darkMode ? 'darkInpt' : ''}`}
                onChange={(e) => handleInputChange(e, 'WorkEndDate')}
              />
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='Salary'>Աշխատավարձի չափ</label>
              <div>
                <input
                  type='number'
                  name='Salary'
                  id='Salary'
                  min={10000}
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors.salary ? 'inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'salary')}
                />
                <select
                  name='Currency'
                  id='Currency'
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors.currency ? 'inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'currency')}
                >
                  <option value='AMD'>AMD</option>
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='RUB'>RUB</option>
                </select>
              </div>
            </div>
            <div>
              <button className='welcome-btn' onClick={handleSubmit}>
                Ավելացնել
              </button>
            </div>
          </div>
        </>
      ) : (
        <h3
          className={
            'submited-succesfully-popup' + (darkMode ? ' whiteElement' : '')
          }
        >
          Աշխատողն ավելացված է
        </h3>
      )}
    </div>
  );
}
