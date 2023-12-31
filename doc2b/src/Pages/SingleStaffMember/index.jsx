import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import hy from 'date-fns/locale/hy';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import MyEventCalendar from '../../Components/MyEventCalendar';
import StaffAvatar from '../../assets/Images/StaffAvatar.png';

import {
  GetSingleStaff,
  DeleteStaff,
  UpdateStaffInfo,
} from '../../Platform/StaffRequests';

import { GetAllPositions } from '../../Platform/PositionRequests';
import { GetAllDepartments } from '../../Platform/DepartmentRequests';
import { SendPassportScan } from '../../Platform/PassportScanRequests';
import { SendIdCardScan } from '../../Platform/IDCardScanRequests';

import PreLoader from '../../Components/PreLoader';

import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { BsInfoLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { HiCamera } from 'react-icons/hi';

registerLocale('hy', hy);
setDefaultLocale('hy');

export default function SingleStaffMember() {
  const { darkMode } = useGlobalContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [documentLoading, setDocumentLoading] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Name: null,
    Surname: null,
    FathersName: null,
    role: null,
    position: null,
    division: null,
    BOT: null,
    nationality: null,
    sex: null,
    telephone: null,
    email: null,
    country: null,
    city: null,
    address: null,
    PassportGivenBy: null,
    PassportGivenDate: null,
    PassportType: null,
    PassportNumber: null,
    SocialNumber: null,
    WorkingDaysWeek: null,
    HoursPerWeek: null,
    WorkStartTime: null,
    WorkEndTime: null,
    WorkStartDate: null,
    WorkEndDate: null,
    salary: null,
    currency: null,
  });
  const [birthday, setBirthDay] = useState(null);
  const [passportDate, setPassportDate] = useState(null);
  const [workStartDate, setWorkStartDate] = useState(null);
  const [workEndDate, setWorkEndDate] = useState(null);
  const [member, setMember] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState('Անձնագիր');
  const [fileUploadError, setFileUploadError] = useState(null);
  const [positions, setPositions] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [errors, setErrors] = useState({});
  const [addNewAccount, setAddNewAccount] = useState(false);

  const fileInputRef = useRef(null);
  const ImageInputRef = useRef(null);

  const getMemberInfo = async (id) => {
    try {
      const result = await GetSingleStaff(
        id,
        localStorage.getItem('companyID')
      );
      if (result) {
        setMember(result.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setBirthDay(
          result.data.employer_birth_date
            ? parseISO(result.data.employer_birth_date)
            : null
        );
        setPassportDate(
          result.data.employer_passport_date_of_issue
            ? parseISO(result.data.employer_passport_date_of_issue)
            : null
        );
        setWorkStartDate(
          result.data.employer_job_start_day
            ? parseISO(result.data.employer_job_start_day)
            : null
        );
        setWorkEndDate(
          result.data.employer_job_end_day
            ? parseISO(result.data.employer_job_end_day)
            : null
        );
        const Address = result.data.employer_register_address.split(' ');
        setInputs((prevInputs) => ({
          ...prevInputs,
          ...result.data,
          country: Address[0] || '',
          city: Address[1] || '',
          address: Address.slice(2).join(' ') || '',
          Name: result.data.employer_first_name,
          Surname: result.data.employer_last_name,
          email: result.data.employer_email,
          division: result.data.employer_department,
        }));
      }
    } catch (error) {
      navigate('/');
    }
  };

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

  useEffect(() => {
    getMemberInfo(id);
  }, [editMode]);

  const handleInputChange = (e, inputName) => {
    try {
      if (e.target) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [inputName]: e.target.value,
        }));
      } else if (e) {
        const parsedDate = new Date(e);
        const formattedDate = `${parsedDate.getFullYear()}-${(
          parsedDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${parsedDate
          .getDate()
          .toString()
          .padStart(2, '0')}`;

        setInputs((prevInputs) => ({
          ...prevInputs,
          [inputName]: formattedDate,
        }));
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await DeleteStaff(id, localStorage.getItem('companyID'));
      setDeleteError('Աշխատողը հաջողությամբ ջնջված է');
    } catch (error) {
      setDeleteError('Դուք չեք կարող ջնջել այս աշխատողին');
    }
  };

  const parseAddress = (address) => {
    if (address) {
      const words = address.split(' ');
      const country = words[0];
      const city = words[1];
      const restOfAddress = words.slice(2).join(' ');
      return { country, city, address: restOfAddress };
    }
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

  const handleEditMode = () => {
    setEditMode(!editMode);
    setSelectedFiles([]);
  };

  const handleFileChange = async (e) => {
    setSelectedFiles([]);
    setFileUploadError(null);
    const files = e.target.files;
    if (files.length === 2) {
      const formData = new FormData();
      formData.append('social_card', files[0]);
      formData.append('passport', files[1]);
      if (selectedRadio === 'Անձնագիր') {
        try {
          setDocumentLoading(true);
          const response = await SendPassportScan(formData);
          setMember((prevInputs) => ({
            ...prevInputs,
            employer_first_name: response.data.data.employer_first_name,
            employer_last_name: response.data.data.employer_last_name,
            employer_middle_name: response.data.data.employer_middle_name,
            employer_birth_date: response.data.data.employer_birth_date,
            employer_sex: response.data.data.employer_sex,
            employer_passport_authority:
              response.data.data.employer_passport_authority,
            employer_passport_date_of_issue:
              response.data.data.employer_passport_date_of_issue,
            employer_passport: response.data.data.employer_passport,
            employer_social_card: response.data.data.employer_social_card,
          }));
          setBirthDay(
            response.data.data.employer_birth_date
              ? parseISO(response.data.data.employer_birth_date)
              : null
          );
          setPassportDate(
            response.data.data.employer_passport_date_of_issue
              ? parseISO(response.data.data.employer_passport_date_of_issue)
              : null
          );
          setInputs((prevInputs) => ({
            ...prevInputs,
            Name: response.data.data.employer_first_name,
            Surname: response.data.data.employer_last_name,
            FathersName: response.data.data.employer_middle_name,
            sex: response.data.data.employer_sex,
            BOT: response.data.data.employer_birth_date,
            PassportGivenBy: response.data.data.employer_passport_authority,
            PassportGivenDate:
              response.data.data.employer_passport_date_of_issue,
            PassportNumber: response.data.data.employer_passport,
            SocialNumber: response.data.data.employer_social_card,
          }));
          setSelectedFiles(files);
          setFileUploadError(null);
          setTimeout(() => {
            setDocumentLoading(false);
          }, 500);
        } catch (error) {
          setDocumentLoading(false);
          setFileUploadError('Ներբեռնել լավ որակի ֆայլ');
        }
      } else if (selectedRadio === 'քարտ') {
        try {
          setDocumentLoading(true);
          const response = await SendIdCardScan(formData);
          setMember((prevInputs) => ({
            ...prevInputs,
            employer_first_name: response.data.data.employer_first_name,
            employer_last_name: response.data.data.employer_last_name,
            employer_middle_name: response.data.data.employer_middle_name,
            employer_sex: response.data.data.employer_sex,
            employer_nationality: response.data.data.employer_nationality,
            employer_birth_date: response.data.data.employer_birth_date,
            employer_passport_authority:
              response.data.data.employer_passport_authority,
            employer_passport_date_of_issue:
              response.data.data.employer_passport_date_of_issue,
            employer_passport: response.data.data.employer_passport,
            employer_social_card: response.data.data.employer_social_card,
          }));
          setBirthDay(
            response.data.data.employer_birth_date
              ? parseISO(response.data.data.employer_birth_date)
              : null
          );
          setPassportDate(
            response.data.data.employer_passport_date_of_issue
              ? parseISO(response.data.data.employer_passport_date_of_issue)
              : null
          );
          setInputs((prevInputs) => ({
            ...prevInputs,
            Name: response.data.data.employer_first_name,
            Surname: response.data.data.employer_last_name,
            FathersName: response.data.data.employer_middle_name,
            sex: response.data.data.employer_sex,
            BOT: response.data.data.employer_birth_date,
            nationality: response.data.data.employer_nationality,
            PassportGivenBy: response.data.data.employer_passport_authority,
            PassportGivenDate:
              response.data.data.employer_passport_date_of_issue,
            PassportNumber: response.data.data.employer_passport,
            SocialNumber: response.data.data.employer_social_card,
          }));
          setSelectedFiles(files);
          setFileUploadError(null);
          setTimeout(() => {
            setDocumentLoading(false);
          }, 500);
        } catch (error) {
          setFileUploadError('Ներբեռնել լավ որակի ֆայլ');
          setDocumentLoading(false);
        }
      }
    } else {
      setDocumentLoading(false);
      setFileUploadError('Ներբեռնել 2 ֆայլ');
    }
  };

  useEffect(() => {}, [documentLoading]);

  const handleSubmit = async () => {
    setErrors({});
    setFileUploadError('');

    const requiredFields = ['Name', 'Surname', 'division', 'email'];

    const newInputs = { ...inputs };
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newInputs[field]) {
        newErrors[field] = 'Դաշտը պարտադիր է';
      }
    });

    if (Object.keys(newErrors).length > 0 || fileUploadError) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const NewEmployee = {
        employer_image: selectedImage ? selectedImage : member.employer_image,
        employer_first_name: inputs.Name
          ? inputs.Name
          : member.employer_first_name,
        employer_last_name: inputs.Surname
          ? inputs.Surname
          : member.employer_last_name,
        employer_middle_name: inputs.FathersName
          ? inputs.FathersName
          : member.employer_middle_name,
        employer_birth_date: inputs.BOT
          ? inputs.BOT
          : member.employer_birth_date,
        employer_social_card: inputs.SocialNumber
          ? inputs.SocialNumber
          : member.employer_social_card,
        employer_passport_type: inputs.PassportType
          ? inputs.PassportType
          : member.employer_passport_type,
        employer_passport: inputs.PassportNumber
          ? inputs.PassportNumber
          : member.employer_passport,
        employer_passport_date_of_issue: inputs.PassportGivenDate
          ? inputs.PassportGivenDate
          : member.employer_passport_date_of_issue,
        employer_passport_authority: inputs.PassportGivenBy
          ? inputs.PassportGivenBy
          : member.employer_passport_authority,
        employer_register_address:
          inputs.country && inputs.city && inputs.address
            ? `${inputs.country} ${inputs.city} ${inputs.address}`
            : member.employer_register_address,
        employer_phone_number: inputs.telephone
          ? inputs.telephone
          : member.employer_phone_number,
        employer_email: inputs.email ? inputs.email : member.employer_email,
        employer_nationality: inputs.nationality
          ? inputs.nationality
          : member.employer_nationality,
        weekly_working_hours: inputs.HoursPerWeek
          ? inputs.HoursPerWeek
          : member.weekly_working_hours,
        weekly_working_days: inputs.WorkingDaysWeek
          ? inputs.WorkingDaysWeek
          : member.weekly_working_days,
        employer_job_start_day: inputs.WorkStartDate
          ? inputs.WorkStartDate
          : member.employer_job_start_day,
        employer_job_start_time: inputs.WorkStartTime
          ? inputs.WorkStartTime
          : member.employer_job_start_time,
        employer_job_end_time: inputs.WorkEndTime
          ? inputs.WorkEndTime
          : member.employer_job_end_time,
        employer_salary: inputs.salary ? inputs.salary : member.employer_salary,
        employer_salary_currency: inputs.currency
          ? inputs.currency
          : member.employer_salary_currency,
        employer_status: inputs.role ? inputs.role : member.employer_status,
        connected: addNewAccount ? true : false,
        employer_position: inputs.position
          ? inputs.position
          : member.employer_position,
        employer_department: inputs.division
          ? inputs.division
          : member.employer_department,
        employer_sex: inputs.sex ? inputs.sex : member.employer_sex,
        company: localStorage.getItem('companyID'),
      };
      if (inputs.WorkEndDate !== '') {
        NewEmployee.employer_job_end_day = inputs.WorkEndDate;
      }
      await UpdateStaffInfo(id, NewEmployee, localStorage.getItem('companyID'));
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setSelectedFiles([]);
      setEditMode(false);
      setSelectedImage(null);
    }
  };

  const closeEdit = () => {
    setEditMode(false);
    const clearedInputes = {
      Name: null,
      Surname: null,
      FathersName: null,
      role: null,
      position: null,
      division: null,
      BOT: null,
      nationality: null,
      sex: null,
      telephone: null,
      email: null,
      country: null,
      city: null,
      address: null,
      PassportGivenBy: null,
      PassportGivenDate: null,
      PassportType: null,
      PassportNumber: null,
      SocialNumber: null,
      WorkingDaysWeek: null,
      HoursPerWeek: null,
      WorkStartTime: null,
      WorkEndTime: null,
      WorkStartDate: null,
      WorkEndDate: null,
      salary: null,
      currency: null,
    };
    setInputs(clearedInputes);
    setSelectedImage(null);
  };

  return (
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {loading ? (
          <PreLoader />
        ) : !openDelete ? (
          <>
            <div className='singleStaffRow'>
              <div className='singleStaffNameSection'>
                {editMode ? (
                  <div
                    className='userAvatar StaffAvatarEdit'
                    style={
                      selectedImage
                        ? {
                            backgroundImage: `url(${selectedImage})`,
                            backgroundSize: 'cover',
                          }
                        : member && member.employer_image
                        ? {
                            backgroundImage: `url(${member.employer_image})`,
                            backgroundSize: 'cover',
                          }
                        : {
                            backgroundImage: `url(${StaffAvatar})`,
                            backgroundSize: '50%',
                          }
                    }
                  >
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
                  <div
                    className='userAvatar'
                    style={
                      member && member.employer_image
                        ? {
                            backgroundImage: `url(${member.employer_image})`,
                            backgroundSize: 'cover',
                          }
                        : {
                            backgroundImage: `url(${StaffAvatar})`,
                            backgroundSize: '50%',
                          }
                    }
                  ></div>
                )}
                <div>
                  {!editMode ? (
                    <h2
                      className={
                        'singleStaffName' + (darkMode ? ' whiteElement' : '')
                      }
                    >
                      {member.employer_first_name} {member.employer_last_name}{' '}
                      {member.employer_middle_name}
                    </h2>
                  ) : (
                    <div className='staffInputSec NameInptSec'>
                      <div>
                        <label htmlFor='Name'>Անուն</label>
                        <input
                          type='text'
                          name='Name'
                          id='Name'
                          defaultValue={
                            inputs.Name
                              ? inputs.Name
                              : member.employer_first_name
                          }
                          value={
                            inputs.Name
                              ? inputs.Name
                              : member.employer_first_name
                          }
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
                          defaultValue={
                            inputs.Surname
                              ? inputs.Surname
                              : member.employer_last_name
                          }
                          value={
                            inputs.Surname
                              ? inputs.Surname
                              : member.employer_last_name
                          }
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
                          defaultValue={
                            inputs.FathersName
                              ? inputs.FathersName
                              : member.employer_middle_name
                          }
                          value={
                            inputs.FathersName
                              ? inputs.FathersName
                              : member.employer_middle_name
                          }
                          className={`${darkMode ? 'darkInpt' : ''} ${
                            errors.FathersName ? 'inptError' : ''
                          }`}
                          onChange={(e) => handleInputChange(e, 'FathersName')}
                        />
                      </div>
                      <div className='mySwitchSection'>
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
                  )}
                  {!editMode ? (
                    <h3
                      className={
                        'singleStaffStatus' +
                        (member &&
                        member.employer_status &&
                        member.employer_status === 'Admin'
                          ? ' adminStatus'
                          : member.employer_status === 'Standard'
                          ? ' standartStatus'
                          : ' inactiveStatus')
                      }
                    >
                      {member.employer_status}
                    </h3>
                  ) : (
                    <div className='singleStaffRow staffRowEdit'>
                      <div className='staffInputSec RoleInptSec'>
                        <label htmlFor='Role'>Դերը</label>
                        <select
                          name='Role'
                          id='Role'
                          defaultValue={member.employer_status}
                          className={`${darkMode ? 'darkInpt' : ''} ${
                            errors.role ? 'inptError' : ''
                          }`}
                          onChange={(e) => handleInputChange(e, 'role')}
                        >
                          <option value='Admin'>Admin</option>
                          <option value='Standard'>Standard</option>
                          <option value='Inactive'>Inactive</option>
                        </select>
                      </div>
                      <div className='staffInputSec editStaffInputSec'>
                        <label htmlFor='Position'>Պաշտոն</label>
                        <select
                          name='Position'
                          id='Position'
                          defaultValue={member.position_name}
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
                          defaultValue={member.department_name}
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
                    <button className='save-staff-edit' onClick={handleSubmit}>
                      <ImCheckmark />
                    </button>
                    <button className='cancel-staff-edit' onClick={closeEdit}>
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
                    {member.position_name}
                  </h3>
                ) : null}
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {member.department_name}
                  </h3>
                ) : null}
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
                    {member && member.employer_birth_date
                      ? member.employer_birth_date
                      : '-'}
                  </h3>
                ) : (
                  <DatePicker
                    dateFormat='dd/MM/yyyy'
                    locale='hy'
                    name='BirthDate'
                    id='BirthDate'
                    placeholderText='օր/ամիս/տարի'
                    value={birthday}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.BOT ? 'inptError' : ''
                    }`}
                    selected={birthday}
                    onChange={(date) => {
                      handleInputChange(date, 'BOT');
                      setBirthDay(date);
                    }}
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
                    {member && member.employer_nationality
                      ? member.employer_nationality
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='Nationality'
                    id='Nationality'
                    defaultValue={member.employer_nationality}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.nationality ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'nationality')}
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
                    {member && member.employer_sex ? member.employer_sex : '-'}
                  </h3>
                ) : (
                  <select
                    name='Sex'
                    id='Sex'
                    defaultValue={inputs.sex ? inputs.sex : member.employer_sex}
                    value={inputs.sex ? inputs.sex : member.employer_sex}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.sex ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'sex')}
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
                  <a href={'tel:' + member.employer_phone_number}>
                    <h3
                      className={'numbers' + (darkMode ? ' whiteElement' : '')}
                    >
                      {member && member.employer_phone_number
                        ? member.employer_phone_number
                        : '-'}
                    </h3>
                  </a>
                ) : (
                  <input
                    type='tel'
                    name='Telephone'
                    id='Telephone'
                    defaultValue={member.employer_phone_number}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.telephone ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'telephone')}
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
                  <a href={'mailto:' + member.employer_email}>
                    <h3
                      className={'numbers' + (darkMode ? ' whiteElement' : '')}
                    >
                      {member && member.employer_email
                        ? member.employer_email
                        : '-'}
                    </h3>
                  </a>
                ) : (
                  <input
                    type='email'
                    name='Email'
                    id='Email'
                    defaultValue={member.employer_email}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.email ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'email')}
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
                    {member.employer_register_address === 'null null null'
                      ? '-'
                      : parseAddress(member.employer_register_address).country}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='Country'
                    id='Country'
                    defaultValue={
                      member.employer_register_address === 'null null null'
                        ? null
                        : parseAddress(member.employer_register_address).country
                    }
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.country ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'country')}
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
                    {member.employer_register_address === 'null null null'
                      ? '-'
                      : parseAddress(member.employer_register_address).city}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='City'
                    id='City'
                    defaultValue={
                      member.employer_register_address === 'null null null'
                        ? null
                        : parseAddress(member.employer_register_address).city
                    }
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.city ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'city')}
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
                    {member.employer_register_address === 'null null null'
                      ? '-'
                      : parseAddress(member.employer_register_address).address}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='Address'
                    id='Address'
                    defaultValue={
                      member.employer_register_address === 'null null null'
                        ? null
                        : parseAddress(member.employer_register_address).address
                    }
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.address ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'address')}
                  />
                )}
              </div>
            </div>
            <div className='singleStaffRow InputsRow'>
              <div
                className={
                  'staffInputSec narrowInputSec' +
                  (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='PassportGivenBy'>
                  Ում կողմից է տրված անձնագիրը
                </label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {member && member.employer_passport_authority
                      ? member.employer_passport_authority
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='PassportGivenBy'
                    id='PassportGivenBy'
                    defaultValue={
                      inputs.PassportGivenBy
                        ? inputs.PassportGivenBy
                        : member.employer_passport_authority
                    }
                    value={
                      inputs.PassportGivenBy
                        ? inputs.PassportGivenBy
                        : member.employer_passport_authority
                    }
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.PassportGivenBy ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'PassportGivenBy')}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec narrowInputSec' +
                  (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='PassportGivenDate'>Տրման ամսաթիվ</label>
                {!editMode ? (
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {member && member.employer_passport_date_of_issue
                      ? member.employer_passport_date_of_issue
                      : '-'}
                  </h3>
                ) : (
                  <DatePicker
                    dateFormat='dd/MM/yyyy'
                    locale='hy'
                    name='PassportGivenDate'
                    id='PassportGivenDate'
                    placeholderText='օր/ամիս/տարի'
                    value={passportDate}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.PassportGivenDate ? 'inptError' : ''
                    }`}
                    selected={passportDate}
                    onChange={(date) => {
                      handleInputChange(date, 'PassportGivenDate');
                      setPassportDate(date);
                    }}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec narrowInputSec' +
                  (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='PassportNumber'>Անձնագրի համարը</label>
                {!editMode ? (
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {member && member.employer_passport
                      ? member.employer_passport
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='PassportNumber'
                    id='PassportNumber'
                    defaultValue={
                      inputs.PassportNumber
                        ? inputs.PassportNumber
                        : member.employer_passport
                    }
                    value={
                      inputs.PassportNumber
                        ? inputs.PassportNumber
                        : member.employer_passport
                    }
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.PassportNumber ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'PassportNumber')}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec narrowInputSec' +
                  (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='SocialNumber'>Սոց․ քարտի համարը</label>
                {!editMode ? (
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {member && member.employer_social_card
                      ? member.employer_social_card
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='SocialNumber'
                    id='SocialNumber'
                    defaultValue={
                      inputs.SocialNumber
                        ? inputs.SocialNumber
                        : member.employer_social_card
                    }
                    value={
                      inputs.SocialNumber
                        ? inputs.SocialNumber
                        : member.employer_social_card
                    }
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.SocialNumber ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'SocialNumber')}
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
                    {member && member.weekly_working_days
                      ? member.weekly_working_days
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='number'
                    name='WorkingDaysWeek'
                    id='WorkingDaysWeek'
                    min={1}
                    max={7}
                    defaultValue={member.weekly_working_days}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.WorkingDaysWeek ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'WorkingDaysWeek')}
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
                    {member && member.weekly_working_hours
                      ? member.weekly_working_hours
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='number'
                    name='HoursPerWeek'
                    id='HoursPerWeek'
                    min={1}
                    defaultValue={member.weekly_working_hours}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.HoursPerWeek ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'HoursPerWeek')}
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
                    {member && member.employer_job_start_time
                      ? member.employer_job_start_time
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='time'
                    name='WorkStartTime'
                    id='WorkingDaysWeek'
                    defaultValue={member.employer_job_start_time}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.WorkStartTime ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'WorkStartTime')}
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
                    {member && member.employer_job_end_time
                      ? member.employer_job_end_time
                      : '-'}
                  </h3>
                ) : (
                  <input
                    type='time'
                    name='WorkEndTime'
                    id='HoursPerWeek'
                    defaultValue={member.employer_job_end_time}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.WorkEndTime ? 'inptError' : ''
                    }`}
                    onChange={(e) => handleInputChange(e, 'WorkEndTime')}
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
                    {member && member.employer_job_start_day
                      ? member.employer_job_start_day
                      : '-'}
                  </h3>
                ) : (
                  <DatePicker
                    dateFormat='dd/MM/yyyy'
                    locale='hy'
                    name='WorkStartDate'
                    id='WorkStartDate'
                    placeholderText='օր/ամիս/տարի'
                    value={workStartDate}
                    className={`${darkMode ? 'darkInpt' : ''} ${
                      errors.WorkStartDate ? 'inptError' : ''
                    }`}
                    selected={workStartDate}
                    onChange={(date) => {
                      handleInputChange(date, 'WorkStartDate');
                      setWorkStartDate(date);
                    }}
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
                    {member && member.employer_job_end_day
                      ? member.employer_job_end_day
                      : '-'}
                  </h3>
                ) : (
                  <DatePicker
                    dateFormat='dd/MM/yyyy'
                    locale='hy'
                    name='WorkEndDate'
                    id='WorkEndDate'
                    placeholderText='օր/ամիս/տարի'
                    value={workEndDate}
                    className={`${darkMode ? 'darkInpt' : ''}`}
                    selected={workEndDate}
                    onChange={(date) => {
                      handleInputChange(date, 'WorkEndDate');
                      setWorkEndDate(date);
                    }}
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
                    {member && member.employer_salary
                      ? member.employer_salary
                      : '-'}{' '}
                    {member.employer_salary_currency}
                  </h3>
                ) : (
                  <div>
                    <input
                      type='number'
                      name='Salary'
                      id='Salary'
                      min={10000}
                      defaultValue={member.employer_salary}
                      className={`${darkMode ? 'darkInpt' : ''} ${
                        errors.salary ? 'inptError' : ''
                      }`}
                      onChange={(e) => handleInputChange(e, 'salary')}
                    />
                    <select
                      name='Currency'
                      id='Currency'
                      defaultValue={member.employer_salary_currency}
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
                      accept='.pdf, .jpg, .png, .jpeg, .webp'
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
                            {!documentLoading ? (
                              <BsFillCloudUploadFill />
                            ) : (
                              <div class='circle'></div>
                            )}
                          </button>
                        ) : (
                          <button
                            className='edit-upload-btn'
                            onClick={handleUploadButtonClick}
                          >
                            {selectedFiles[0].name}
                            {!documentLoading ? (
                              <BsFillCloudUploadFill />
                            ) : (
                              <div class='circle'></div>
                            )}
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
                          {!documentLoading ? (
                            <BsFillCloudUploadFill />
                          ) : (
                            <div class='circle'></div>
                          )}
                        </button>
                      ) : (
                        <button
                          className='edit-upload-btn'
                          onClick={handleUploadButtonClick}
                        >
                          Ներբեռնել ID Քարտ
                          {!documentLoading ? (
                            <BsFillCloudUploadFill />
                          ) : (
                            <div class='circle'></div>
                          )}
                        </button>
                      )
                    ) : (
                      <button
                        className='edit-upload-btn upload-error-btn'
                        onClick={handleUploadButtonClick}
                      >
                        {fileUploadError}
                        {!documentLoading ? (
                          <ImCross />
                        ) : (
                          <div class='circle'></div>
                        )}
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
                        Անձնագրային տվյալների ճիշտ լրացման համար հետևեք նշված
                        քայլերին. Անհրաժեշտ է կցել՝ Անձնագրի հիմնական (2-3)
                        էջերի լուսանկարները/սկանավորած տարբերակները + ՀԾՀ (սոց
                        քարտը) 2 ֆայլով, կամ նույնականացման քարտի (ID քարտ)
                        առջևի (դիմանկարով կողմի լուսանկարը/սկանը) և հետևի էջերը
                        2 ֆայլով։ Խնդրում ենք ուշադիր լինել, որպեսզի փաստաթղթի
                        եզրերը ամբողջությամբ տեսանելի լինեն լուսանկարներում:
                        Վերբեռնելիս համոզվեք, որ դրանք համապատասխանում են
                        հետևյալ չափանիշներին`JPG, PNG կամ PDF և չեն գերազանցում
                        15 MB-ը: Զգուշացնում ենք, որ ֆայլերը պետք է կցել միասին
                        (2 ֆայլ)։ Մեկ ֆայլ կցելու դեպքում համակրգը չի կարող
                        ճանաչել Ձեր քայլերը։
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
            {editMode ? (
              <div>
                <button
                  className='delete-button'
                  onClick={() => setOpenDelete(true)}
                >
                  Ջնջել
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className='delete-confirm-section'>
            <h3 className={darkMode ? ' whiteElement' : ''}>
              {!deleteError
                ? 'Ցանկանու՞մ եք ջնջել տվյալ աշխատողին'
                : deleteError}
            </h3>
            {!deleteError ? (
              <div>
                <button className='save-staff-edit' onClick={handleDelete}>
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
          </div>
        )}
      </div>
      <div className='groupedSideBlocks'>
        <div className='AddsSection adds_2'></div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
