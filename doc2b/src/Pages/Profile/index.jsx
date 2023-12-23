import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import hy from 'date-fns/locale/hy';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import { GetSingleStaff } from '../../Platform/StaffRequests';
import { UpdateStaffInfo } from '../../Platform/StaffRequests';
import { UpdateUserBasicInfo } from '../../Platform/UserRequests';
import { GetAllCompanies } from '../../Platform/CompanyRequests';
import { ResetPasswordFromProfile } from '../../Platform/ResetPassword';

import MyEventCalendar from '../../Components/MyEventCalendar';
import StaffAvatar from '../../assets/Images/user.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';

import PreLoader from '../../Components/PreLoader';

import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { ImCross } from 'react-icons/im';
import { HiCamera } from 'react-icons/hi';

registerLocale('hy', hy);
setDefaultLocale('hy');

export default function Profile() {
  const { darkMode, userID } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [birthday, setBirthDay] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({
    Name: null,
    Surname: null,
    FathersName: null,
    role: null,
    BOT: null,
    nationality: null,
    sex: null,
    telephone: null,
    email: null,
    country: null,
    city: null,
    address: null,
  });
  const [errors, setErrors] = useState({});
  const [companies, setCompanies] = useState([]);
  const [oldPass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [repeatNewPass, setRepeatNewPass] = useState(null);
  const [passSuccefullyChanged, setPassSuccefullyChanged] = useState(false);
  const [passwordChangError, setPasswordChangeError] = useState('');

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 2) + '..';
    }
  };

  const getCompaniesList = async () => {
    try {
      const result = await GetAllCompanies();
      if (result && result.data.length > 1) {
        const slicedData = result.data.slice(1, 7);
        setCompanies(slicedData);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

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
        }));
      }
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    getMemberInfo(localStorage.getItem('userID'));
  }, [editMode, userID]);

  const parseAddress = (address) => {
    if (address) {
      const words = address.split(' ');
      const country = words[0];
      const city = words[1];
      const restOfAddress = words.slice(2).join(' ');
      return { country, city, address: restOfAddress };
    }
  };

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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
  };

  const handleSubmit = async () => {
    setErrors({});

    const requiredFields = ['Name', 'Surname', 'email'];

    const newInputs = { ...inputs };
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newInputs[field]) {
        newErrors[field] = 'Դաշտը պարտադիր է';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
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
        employer_social_card: member.employer_social_card,
        employer_passport_type: member.employer_passport_type,
        employer_passport: member.employer_passport,
        employer_passport_date_of_issue: member.employer_passport_date_of_issue,
        employer_passport_authority: member.employer_passport_authority,
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
        weekly_working_hours: member.weekly_working_hours,
        weekly_working_days: member.weekly_working_days,
        employer_job_start_day: member.employer_job_start_day,
        employer_job_start_time: member.employer_job_start_time,
        employer_job_end_time: member.employer_job_end_time,
        employer_salary: member.employer_salary,
        employer_salary_currency: member.employer_salary_currency,
        employer_status: inputs.role ? inputs.role : member.employer_status,
        connected: member.connected,
        employer_position: member.employer_position,
        employer_department: member.employer_department,
        employer_sex: inputs.sex ? inputs.sex : member.employer_sex,
        company: localStorage.getItem('companyID'),
      };
      if (inputs.WorkEndDate !== '') {
        NewEmployee.employer_job_end_day = member.employer_job_end_day;
      }
      const newUserInfo = {
        first_name: inputs.Name ? inputs.Name : member.employer_first_name,
        last_name: inputs.Surname ? inputs.Surname : member.employer_last_name,
        phone_number: inputs.telephone
          ? inputs.telephone
          : member.employer_phone_number,
      };
      await UpdateStaffInfo(
        localStorage.getItem('userID'),
        NewEmployee,
        localStorage.getItem('companyID')
      );
      await UpdateUserBasicInfo(newUserInfo);
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
      BOT: null,
      nationality: null,
      sex: null,
      telephone: null,
      email: null,
      country: null,
      city: null,
      address: null,
    };
    setInputs(clearedInputes);
    setSelectedImage(null);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      if (!oldPass || !newPass || !repeatNewPass) {
        setPasswordChangeError('Բոլոր դաշտերը պարտադիր են');
        return;
      }
      if (newPass !== repeatNewPass) {
        setPasswordChangeError('Կրկնեք ճիշտ նոր գաղտնաբառը');
        return;
      }

      const passwords = {
        current_password: oldPass,
        new_password: newPass,
        re_new_password: repeatNewPass,
      };

      await ResetPasswordFromProfile(passwords);
      setPassSuccefullyChanged(true);
      setPasswordChangeError('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPasswordChangeError('Ձեր ներկա գաղտնաբառը սխալ է');
      } else if (error.response && error.response.status === 400) {
        setPasswordChangeError(
          'Նոր գաղտնաբառը շատ է նման էլ․ հասցեն կամ հուսալի չէ'
        );
      }
    }
  };

  return (
    <div className='StaffPage ProfilePage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {loading ? (
          <PreLoader />
        ) : (
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
            {!editMode && companies.length > 0 ? (
              <div
                className={
                  'companies-slider-section' + (darkMode ? ' lightDark' : '')
                }
              >
                <div className='sliderHeaderBlock'>
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    Իմ Կազմակերպությունները
                  </h3>
                  <NavLink to={ROUTE_NAMES.ORGANIZATION}>
                    <button>Դիտել Բոլորը</button>
                  </NavLink>
                </div>
                <div className='slider-smth'>
                  <Slider {...settings}>
                    {companies &&
                      companies.map((company, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              'related-companies' +
                              (darkMode ? ' darkInpt2' : '')
                            }
                          >
                            <img src={CaseIcon} alt='CaseIcon' />
                            <div className='related-company-info'>
                              {truncateText(company.company_name, 14)}
                              {/* <h5
                                style={{
                                  color:
                                    company.status === 'Admin'
                                      ? 'var(--red)'
                                      : company.status === 'Inactive'
                                      ? 'var(--light-green)'
                                      : 'var(--orange)',
                                }}
                              >
                                {company.status}
                              </h5> */}
                            </div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            ) : null}
            {/* <div className='staffInputSec'>
          <div className='email-pass-change-sec'>
            <div className='change-email-pass-block'>
              <label htmlFor='ChangeEmail'>Փոխել էլ․ հասցեն</label>
              <input
                type='email'
                name='ChangeEmail'
                id='ChangeEmail'
                placeholder='Նոր էլ․ հասցե'
                className={darkMode ? ' darkInpt' : ''}
              />
            </div>
            <button className='welcome-btn save-email-pass-change'>
              Հաստատել
            </button>
          </div>
        </div> */}
            <div className='staffInputSec'>
              {!passSuccefullyChanged ? (
                <div>
                  <form className='email-pass-change-sec'>
                    <div className='change-email-pass-block'>
                      <label htmlFor='OldPass'>Փոխել գաղտնաբառը</label>
                      <input
                        type='password'
                        name='OldPass'
                        id='OldPass'
                        placeholder='Գաղտնաբառը'
                        className={darkMode ? ' darkInpt' : ''}
                        autoComplete='current-password'
                        onChange={(e) => setOldPass(e.target.value)}
                      />
                    </div>
                    <div className='change-email-pass-block'>
                      <input
                        type='password'
                        name='NewPass'
                        id='NewPass'
                        placeholder='Նոր գաղտնաբառը'
                        className={darkMode ? ' darkInpt' : ''}
                        autoComplete='new-password'
                        onChange={(e) => setNewPass(e.target.value)}
                      />
                    </div>
                    <div className='change-email-pass-block'>
                      <input
                        type='password'
                        name='RepeatNewPass'
                        id='RepeatNewPass'
                        placeholder=' Կրկնել նոր գաղտնաբառը'
                        className={darkMode ? ' darkInpt' : ''}
                        autoComplete='new-password'
                        onChange={(e) => setRepeatNewPass(e.target.value)}
                      />
                    </div>
                    <button
                      className='welcome-btn save-email-pass-change'
                      onClick={handlePasswordChange}
                    >
                      Հաստատել
                    </button>
                  </form>
                  {passwordChangError ? (
                    <span className='passwordChangeError'>
                      {passwordChangError}
                    </span>
                  ) : null}
                </div>
              ) : (
                <h3
                  className={
                    darkMode
                      ? 'passSuccefullyChanged whiteElement'
                      : 'passSuccefullyChanged'
                  }
                >
                  Գաղտնաբառը հաջողությամբ փոփոխված է
                </h3>
              )}
            </div>
          </>
        )}
      </div>
      <div className='groupedSideBlocks'>
        <div className='AddsSection adds_2'></div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
