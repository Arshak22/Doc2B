import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import hy from 'date-fns/locale/hy';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import MyEventCalendar from '../../Components/MyEventCalendar';
import StaffAvatar from '../../assets/Images/user.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { ImCross } from 'react-icons/im';
import { HiCamera } from 'react-icons/hi';

registerLocale('hy', hy);
setDefaultLocale('hy');

export default function Profile() {
  const { darkMode } = useGlobalContext();
  let profile = {
    first_name: 'Անուն',
    last_name: 'Ազգանուն',
    fathers_name: 'Հայրանուն',
    status: 'Admin',
    nationality: 'Հայ',
    sex: 'Արական',
    tel: '+374-95-555-555',
    email: 'test@gmail.com',
    country: 'Հայաստան',
    city: 'Երևան',
    bod: '16 / 12 / 1999',
    address: 'Արամ Խաչատրյան փողոց, 33/2, բն․ 49',
    companies: [
      {
        name: 'Team2B',
        status: 'Admin',
      },
      {
        name: 'How2B',
        status: 'Standart',
      },
      {
        name: 'Doc2B',
        status: 'User',
      },
      {
        name: 'Train2B',
        status: 'Standart',
      },
      {
        name: 'Relocation2B',
        status: 'Admin',
      },
    ],
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

  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const avatarStyle = {
    backgroundImage: selectedImage
      ? `url(${selectedImage})`
      : `url(${StaffAvatar})`,
    backgroundSize: 'cover',
  };

  return (
    <div className='StaffPage ProfilePage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
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
                  {profile.first_name} {profile.last_name}{' '}
                  {profile.fathers_name}
                </h2>
              ) : (
                <div className='staffInputSec NameInptSec'>
                  <div>
                    <label htmlFor='Name'>Անուն</label>
                    <input
                      type='text'
                      name='Name'
                      id='Name'
                      defaultValue={profile.first_name}
                      className={darkMode ? ' darkInpt' : ''}
                    />
                  </div>
                  <div>
                    <label htmlFor='Surname'>Ազգանուն</label>
                    <input
                      type='text'
                      name='Surname'
                      id='Surname'
                      defaultValue={profile.last_name}
                      className={darkMode ? ' darkInpt' : ''}
                    />
                  </div>
                  <div>
                    <label htmlFor='FatersName'>Հայրանուն</label>
                    <input
                      type='text'
                      name='FatersName'
                      id='FatersName'
                      defaultValue={profile.fathers_name}
                      className={darkMode ? ' darkInpt' : ''}
                    />
                  </div>
                </div>
              )}
              {!editMode ? (
                <h3 className='singleStaffStatus'>{profile.status}</h3>
              ) : (
                <div className='staffInputSec RoleInptSec'>
                  <label htmlFor='Role'>Դերը</label>
                  <select
                    name='Role'
                    id='Role'
                    defaultValue={profile.status}
                    className={darkMode ? ' darkInpt' : ''}
                  >
                    <option value='Admin'>Admin</option>
                    <option value='Standart'>Standart</option>
                    <option value='User'>User</option>
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
                <button className='cancel-staff-edit' onClick={handleEditMode}>
                  <ImCross />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='singleStaffRow InputsRow'>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='BirthDate'>Ծննդյան տարեթիվ</label>
            {!editMode ? (
              <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                {profile.bod}
              </h3>
            ) : (
              <DatePicker
                dateFormat='dd.MM.yyyy'
                locale='hy'
                name='BirthDate'
                id='BirthDate'
                placeholderText='օր/ամիս/տարի'
                value={profile.bod}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='Nationality'>Ազգություն</label>
            {!editMode ? (
              <h3 className={darkMode ? ' whiteElement' : ''}>
                {profile.nationality}
              </h3>
            ) : (
              <input
                type='text'
                name='Nationality'
                id='Nationality'
                defaultValue={profile.nationality}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='Sex'>Սեռ</label>
            {!editMode ? (
              <h3 className={darkMode ? ' whiteElement' : ''}>{profile.sex}</h3>
            ) : (
              <select
                name='Sex'
                id='Sex'
                defaultValue={profile.sex}
                className={darkMode ? ' darkInpt' : ''}
              >
                <option value='Արական'>Արական</option>
                <option value='Իգական'>Իգական</option>
              </select>
            )}
          </div>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='Telephone'>Հեռ․</label>
            {!editMode ? (
              <a href={'tel:' + profile.tel}>
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {profile.tel}
                </h3>
              </a>
            ) : (
              <input
                type='tel'
                name='Telephone'
                id='Telephone'
                defaultValue={profile.tel}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='Email'>Էլ․ հասցե</label>
            {!editMode ? (
              <a href={'mailto:' + profile.email}>
                <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                  {profile.email}
                </h3>
              </a>
            ) : (
              <input
                type='email'
                name='Email'
                id='Email'
                defaultValue={profile.email}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
        </div>
        <div className='singleStaffRow InputsRow'>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='Country'>Երկիր</label>
            {!editMode ? (
              <h3 className={darkMode ? ' whiteElement' : ''}>
                {profile.country}
              </h3>
            ) : (
              <input
                type='text'
                name='Country'
                id='Country'
                defaultValue={profile.country}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='City'>Քաղաք</label>
            {!editMode ? (
              <h3 className={darkMode ? ' whiteElement' : ''}>
                {profile.city}
              </h3>
            ) : (
              <input
                type='text'
                name='City'
                id='City'
                defaultValue={profile.city}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
          <div
            className={'staffInputSec' + (editMode ? ' editStaffInputSec' : '')}
          >
            <label htmlFor='Address'>Հասցե</label>
            {!editMode ? (
              <h3 className={darkMode ? ' whiteElement' : ''}>
                {profile.address}
              </h3>
            ) : (
              <input
                type='text'
                name='Address'
                id='Address'
                defaultValue={profile.address}
                className={darkMode ? ' darkInpt' : ''}
              />
            )}
          </div>
        </div>
        {!editMode ? (
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
                {profile.companies.map((company, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        'related-companies' + (darkMode ? ' darkInpt2' : '')
                      }
                    >
                      <img src={CaseIcon} alt='CaseIcon' />
                      <div className='related-company-info'>
                        <h3>{company.name}</h3>
                        <h5
                          style={{
                            color:
                              company.status === 'Admin'
                                ? 'var(--red)'
                                : company.status === 'User'
                                ? 'var(--light-green)'
                                : 'var(--orange)',
                          }}
                        >
                          {company.status}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        ) : null}
        <div className='staffInputSec'>
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
        </div>
        <div className='staffInputSec'>
          <div>
            <form className='email-pass-change-sec'>
              <div className='change-email-pass-block'>
                <label htmlFor='OldPass'>Փոխել գաղտնաբառը</label>
                <input
                  type='password'
                  name='OldPass'
                  id='OldPass'
                  placeholder='Հին գաղտնաբառը'
                  className={darkMode ? ' darkInpt' : ''}
                  autoComplete='current-password'
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
                />
              </div>
              <button className='welcome-btn save-email-pass-change'>
                Հաստատել
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='groupedSideBlocks'>
        <div className='AddsSection adds_2'></div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
