import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Context/Context';
import { ROUTE_NAMES } from '../../Routes';
import './style.css';

import { GetBasicUserInfo } from '../../Platform/UserInfoRequests';
import { RefreshTokenRequest } from '../../Platform/RefreshToken';
import { SendTimeZone } from '../../Platform/TimeZoneRequest';

import Logo from '../../assets/Images/Logo.png';
import LogoWhite from '../../assets/Images/LogoWhite.png';

import AddDocIcon from '../../assets/Images/AddDocIcon.png';
import User from '../../assets/Images/user.png';

import MobileBottomMenu from '../../assets/Images/bottomMenuBG.png';
import MobileBottomMenuBlack from '../../assets/Images/bottomMenuBG2.png';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ImSearch } from 'react-icons/im';
import { FiBell } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa6';
import { BsFillSunFill } from 'react-icons/bs';
import { BsMoonStarsFill } from 'react-icons/bs';

//mobile icons
import Main_1 from '../../assets/Icons/main-1.png';
import Main_2 from '../../assets/Icons/main-2.png';
import Company_1 from '../../assets/Icons/company-1.png';
import Company_2 from '../../assets/Icons/company-2.png';
import Calendar_1 from '../../assets/Icons/calendar-1.png';
import Calendar_2 from '../../assets/Icons/calendar-2.png';
import MenuBars from '../../assets/Icons/menu.png';
import SeacrhIcon from '../../assets/Icons/search.png';
import Bell from '../../assets/Icons/bell.png';
import menuX from '../../assets/Icons/X.png';

//mobileBlackIcons
import Main_3 from '../../assets/Icons/main-3.png';
import Company_3 from '../../assets/Icons/company-3.png';
import Calendar_3 from '../../assets/Icons/calendar-3.png';
import MenuBars_2 from '../../assets/Icons/menu-2.png';
import SeacrhIcon_2 from '../../assets/Icons/search-2.png';
import Bell_2 from '../../assets/Icons/bell-2.png';
import menuX_2 from '../../assets/Icons/X-2.png';

import SignIn from '../../Components/SignIn';
import EmailActivatedPage from '../EmailActivatedPage';
import ConfirmNewPassword from '../ConfirmNewPassword';

export default function Layout() {
  const pathParts = window.location.pathname.split('/');

  const trimmedEmailRoute = ROUTE_NAMES.ACTIVATEDEMAIL.replace(/^\/|\/$/g, '');
  const isEmailActivatedPage = pathParts[1].startsWith(trimmedEmailRoute);

  const trimmedResetPasswordRoute = ROUTE_NAMES.RESETPASSWORD.replace(
    /^\/|\/$/g,
    ''
  );
  const isResetPasswordPage = pathParts[1].startsWith(
    trimmedResetPasswordRoute
  );

  const navigate = useNavigate();
  const location = useLocation();
  const {
    popUpOpen,
    setPopUpOpen,
    darkMode,
    setDarkMode,
    companyID,
    setCompanyID,
    setUserID,
  } = useGlobalContext();
  const isLoggedIn = localStorage.getItem('logedIn') === 'true';
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [CompDropdownOpen, setCompDropdownOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Կազմակերպություն');
  const [showTexekatu, setShowTexekatu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const currentPathRef = useRef(location.pathname);

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setTimeZone = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        await SendTimeZone(JSON.stringify({ timezone: timezone }));
      } catch (error) {}
    };
    setTimeZone();
  }, []);

  const sendNotificationRead = (notification) => {
    if (socket) {
      const jsonNotification = JSON.stringify(notification);
      socket.send(jsonNotification);
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://192.168.88.3:8002/ws/notify/?token=${localStorage.getItem('token')}`
    );
    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newSocket.onmessage = (event) => {
      setNotificationCount(JSON.parse(event.data).count_false_status);
      setNotifications(JSON.parse(event.data).data);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location]);

  const handleClickMobileCalendar = (to) => {
    const currentPath = currentPathRef.current;

    if (currentPath.includes(to)) {
      navigate(-1);
    } else {
      navigate(ROUTE_NAMES.CALENDAR);
    }
  };

  const getBasicUserInfo = async () => {
    try {
      const result = await GetBasicUserInfo();
      if (result) {
        setFirstName(result.data.user_info.first_name.charAt(0) + '.');
        setLastName(result.data.user_info.last_name);
        setOptions(result.data.companies);
        if (result.data.companies[0] && localStorage.getItem('token')) {
          if (localStorage.getItem('companyID')) {
            result.data.companies.forEach((item) => {
              if (item.id == localStorage.getItem('companyID')) {
                setSelectedOption(item.company_name);
                setCompanyID('companyID', item.id);
                localStorage.setItem('userID', item.employer_id);
                setUserID('userID', item.employer_id);
                setUserAvatar(item.employer_image);
              }
            });
          } else {
            setSelectedOption(result.data.companies[0].company_name);
            localStorage.setItem('companyID', result.data.companies[0].id);
            setCompanyID('companyID', result.data.companies[0].id);
            setUserAvatar(result.data.companies[0].employer_image);
          }
        }
      }
    } catch (error) {
      if (
        error.response.data &&
        error.response.data.detail ===
          'Given token not valid for any token type' &&
        error.response.data.code === 'token_not_valid'
      ) {
        try {
          const result = await RefreshTokenRequest({
            refresh: localStorage.getItem('refreshToken'),
          });
          window.location.reload();
          localStorage.setItem('token', result.data.access);
        } catch (error) {}
      }
    }
  };

  useEffect(() => {
    getBasicUserInfo();
  }, [companyID]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileCompDropdown = () => {
    setCompDropdownOpen(!CompDropdownOpen);
  };

  const showMobileSearch = () => {
    setMobileSearch(!mobileSearch);
  };

  const showMobileSideMenu = () => {
    setSideMenu(!sideMenu);
  };

  const handleOptionClick = (newCompanyID, option) => {
    setSelectedOption(option);
    if (localStorage.getItem('companyID')) {
      localStorage.setItem('companyID', newCompanyID);
      setCompanyID(newCompanyID);
    }
    setDropdownOpen(false);
    setCompDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleTexekatuMenu = () => {
    setShowTexekatu(!showTexekatu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('inpts') &&
        !event.target.classList.contains('dropdownIcon')
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('logOut') &&
        !event.target.classList.contains('userAvatarImage') &&
        !event.target.classList.contains('userName') &&
        !event.target.classList.contains('profileDropDownIcon') &&
        !event.target.classList.contains('themePanel') &&
        !event.target.classList.contains('themeChange')
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('notificationBell') &&
        !event.target.classList.contains('notification-list') &&
        !event.target.classList.contains('notification-count-number') &&
        !event.target.classList.contains('notification') &&
        !event.target.closest('.notification') &&
        !event.target.closest('.AddPopUp')
      ) {
        setPopUpOpen(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setPopUpOpen, popUpOpen]);

  useEffect(() => {
    if (options && options[1]) {
      setSelectedOption(options[1].company_name);
    }
    const handleScroll = () => {
      setMobileSearch(false);
      setUserDropdownOpen(false);
      setSideMenu(false);
      setCompDropdownOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileSearch(false);
    setUserDropdownOpen(false);
    setSideMenu(false);
    setCompDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    darkMode
      ? (document.getElementsByTagName('body')[0].style = 'background: #1d1d1d')
      : (document.getElementsByTagName('body')[0].style =
          'background: #ffffff');
  }, [darkMode]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setPopUpOpen(!popUpOpen);
  };

  const goToProfile = () => {
    navigate(ROUTE_NAMES.PROFILE);
  };

  const logOut = () => {
    localStorage.removeItem('logedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('companyID');
    navigate(ROUTE_NAMES.HOME);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className='profileContainer'>
            <div className='sideBar'>
              <div className='rowspan'>
                <div className='mainLogo'>
                  <NavLink to={ROUTE_NAMES.HOME}>
                    {darkMode ? (
                      <img src={LogoWhite} alt='mainLogo' />
                    ) : (
                      <img src={Logo} alt='mainLogo' />
                    )}
                  </NavLink>
                </div>
                <NavLink
                  to={ROUTE_NAMES.HOME}
                  className={({ isActive }) =>
                    isActive
                      ? 'navItem activeNav'
                      : 'navItem' + (darkMode ? ' whiteNav' : '')
                  }
                >
                  <h3 className='menuBtn'>Գլխավոր</h3>
                </NavLink>
                <NavLink
                  to={ROUTE_NAMES.STAFF}
                  className={({ isActive }) =>
                    isActive
                      ? 'navItem activeNav'
                      : 'navItem' + (darkMode ? ' whiteNav' : '')
                  }
                >
                  <h3 className='menuBtn'>Ստաֆ</h3>
                </NavLink>
                <NavLink
                  to={ROUTE_NAMES.ORGANIZATION}
                  className={({ isActive }) =>
                    isActive
                      ? 'navItem activeNav'
                      : 'navItem' + (darkMode ? ' whiteNav' : '')
                  }
                >
                  <h3 className='menuBtn'>Կազմակերպություններ</h3>
                </NavLink>
                <div className='open-info-block'>
                  <h3 className={'menuBtn' + (darkMode ? ' whiteNav' : '')}>
                    Տեղեկատու{' '}
                    <MdKeyboardArrowRight className='menuArrowRight' />
                  </h3>
                  <div
                    className={
                      'open-info' + (darkMode ? ' dark-open-info' : '')
                    }
                  >
                    <NavLink
                      to={ROUTE_NAMES.POSITIONS}
                      className={({ isActive }) =>
                        isActive
                          ? 'navItem'
                          : 'navItem' + (darkMode ? ' whiteNav' : '')
                      }
                    >
                      <h3 className='menuBtn'>Պաշտոններ</h3>
                    </NavLink>
                    <NavLink
                      to={ROUTE_NAMES.DIVISION}
                      className={({ isActive }) =>
                        isActive
                          ? 'navItem'
                          : 'navItem' + (darkMode ? ' whiteNav' : '')
                      }
                    >
                      <h3 className='menuBtn'>Ստորաբաժանումներ</h3>
                    </NavLink>
                  </div>
                </div>
                <NavLink
                  to={ROUTE_NAMES.ACTIVITES}
                  className={({ isActive }) =>
                    isActive
                      ? 'navItem activeNav'
                      : 'navItem' + (darkMode ? ' whiteNav' : '')
                  }
                >
                  <h3 className='menuBtn'>Գործողություններ</h3>
                </NavLink>
                <NavLink
                  to={ROUTE_NAMES.CONTACTUS}
                  className={({ isActive }) =>
                    isActive
                      ? 'navItem activeNav'
                      : 'navItem' + (darkMode ? ' whiteNav' : '')
                  }
                >
                  <h3 className='menuBtn'>Հետադարձ Կապ</h3>
                </NavLink>
                <NavLink to={ROUTE_NAMES.NEWACTIVITY}>
                  <div className='addDocSection'>
                    <h3>
                      Կատարել
                      <br />
                      գործողություն
                    </h3>
                    <button>+</button>
                    <img
                      src={AddDocIcon}
                      alt='AddDocIcon'
                      className='AddDocIcon'
                    />
                  </div>
                </NavLink>
              </div>
            </div>
            <div className='profileRCol'>
              <div className='profileHeader'>
                <div className='InputContainer'>
                  <div>
                    <input
                      type='text'
                      value={selectedOption}
                      readOnly={true}
                      onCopy={(e) => e.preventDefault()}
                      style={{ userSelect: 'none' }}
                      name='Կազմակերպություն'
                      className={`inpts headerInpt companySelect 
                      ${
                        selectedOption !== 'Կազմակերպություն' ? 'selected' : ''
                      } ${darkMode ? ' darkInpt' : ''}`}
                      onClick={toggleDropdown}
                      ref={dropdownRef}
                    />
                    <MdKeyboardArrowDown
                      className={`passwordIcon dropdownIcon 
                      ${selectedOption !== 'Կազմակերպություն' ? 'open' : ''} ${
                        darkMode ? ' whiteIcon' : ''
                      }`}
                      onClick={toggleDropdown}
                    />
                    {dropdownOpen && options && options.length > 1 ? (
                      <div
                        className={
                          'CompanyDropdownOptions' +
                          (darkMode ? ' darkDropDown' : '')
                        }
                        ref={dropdownRef}
                      >
                        {options.map((option, index) => (
                          <div
                            key={index}
                            className='CompanyDropdownOption'
                            onClick={() =>
                              handleOptionClick(option.id, option.company_name)
                            }
                          >
                            {option.company_name}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='groupedHeaderSec'>
                  <div className='InputContainer'>
                    <div>
                      <input
                        type='text'
                        placeholder='Փնտրել'
                        name='Փնտրել'
                        className={
                          'inpts headerInpt' + (darkMode ? ' darkInpt' : '')
                        }
                      />
                      <ImSearch
                        className={
                          'passwordIcon searchIcon' +
                          (darkMode ? ' whiteIcon' : '')
                        }
                      />
                    </div>
                  </div>
                  <div
                    className='notification-sec'
                    ref={notificationDropdownRef}
                  >
                    <FiBell
                      className={
                        'notificationBell' +
                        (showNotifications ? ' activeNotificationBell' : '') +
                        (darkMode ? ' whiteElement' : '')
                      }
                      onClick={toggleNotifications}
                    />
                    {notificationCount !== 0 ? (
                      <span
                        className='notification-count-number'
                        onClick={toggleNotifications}
                      >
                        {notificationCount}
                      </span>
                    ) : null}
                    {showNotifications && (
                      <div
                        className={
                          'notification-list' +
                          (notifications.length < 0
                            ? ' empty-notification-list'
                            : '') +
                          (darkMode ? ' darkDropDown' : '')
                        }
                      >
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => {
                            return (
                              <div
                                key={index}
                                className='notification'
                                onClick={() =>
                                  sendNotificationRead({
                                    id: notification.id,
                                    status: !notification.status,
                                  })
                                }
                              >
                                <h3
                                  className={
                                    !notification.status
                                      ? 'not-read-message'
                                      : ''
                                  }
                                >
                                  {!notification.company_id
                                    ? 'Իրադարձություն'
                                    : 'Գործառույթ'}
                                  : {notification.name}
                                </h3>
                                <h5
                                  className={
                                    !notification.status
                                      ? 'not-read-message'
                                      : ''
                                  }
                                >
                                  {notification.description}
                                </h5>
                                <h5>{notification.time_since_creation}</h5>
                                <hr className={darkMode ? ' darkLine' : ''} />
                                {!notification.status ? (
                                  <div className='not-read'></div>
                                ) : null}
                              </div>
                            );
                          })
                        ) : (
                          <div className='emptynotification'>
                            <h4>Դուք դեռ չունեք ծանուցումներ</h4>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className='userBlock'>
                    <div className='userAvatar'>
                      <img
                        src={userAvatar ? userAvatar : User}
                        alt='user'
                        className='userAvatarImage'
                        onClick={toggleUserDropdown}
                        ref={userDropdownRef}
                      />
                    </div>
                    <h2
                      className={'userName' + (darkMode ? ' whiteElement' : '')}
                      onClick={toggleUserDropdown}
                      ref={userDropdownRef}
                    >
                      {firstName} {lastName}
                    </h2>
                    <MdKeyboardArrowDown
                      className={
                        'profileDropDownIcon' +
                        (darkMode ? ' whiteElement' : '')
                      }
                      onClick={toggleUserDropdown}
                    />
                    {userDropdownOpen && (
                      <div
                        className={
                          'UserDropdown' + (darkMode ? ' darkDropDown' : '')
                        }
                      >
                        <div className='logOut' onClick={goToProfile}>
                          <FaUser /> Օգտատեր
                        </div>
                        <div
                          className={
                            'logOut themePanel' + (darkMode ? ' darkPanel' : '')
                          }
                        >
                          <h3
                            className={
                              'themeChange' +
                              (!darkMode ? ' activeTheme lightTheme' : '')
                            }
                            onClick={() => setDarkMode(false)}
                          >
                            <BsFillSunFill
                              style={{ width: '18px', height: '18px' }}
                            />{' '}
                            Light
                          </h3>
                          <h3
                            className={
                              'themeChange' +
                              (darkMode ? ' activeTheme darkTheme' : '')
                            }
                            onClick={() => setDarkMode(true)}
                          >
                            <BsMoonStarsFill /> Dark
                          </h3>
                        </div>
                        <div className='logOut' onClick={logOut}>
                          <ImExit /> Դուրս գալ
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={
                  'mobile-top-menu' + (darkMode ? ' Dark MobileMenu' : '')
                }
              >
                <div className='mainLogo mobileLogo'>
                  <NavLink to={ROUTE_NAMES.HOME}>
                    {!darkMode ? (
                      <img src={Logo} alt='mainLogo' />
                    ) : (
                      <img src={LogoWhite} alt='mainLogo' />
                    )}
                  </NavLink>
                </div>
                <div className='groupedHeaderSec'>
                  <div className='InputContainer'>
                    <div>
                      <img
                        src={!darkMode ? SeacrhIcon : SeacrhIcon_2}
                        alt='mobileSearch'
                        className='mobileSearchIcon'
                        onClick={showMobileSearch}
                      />
                      {mobileSearch ? (
                        <input
                          type='text'
                          placeholder='Փնտրել'
                          name='Փնտրել'
                          className={
                            'inpts headerInpt mobileSearch' +
                            (darkMode ? ' darkInpt' : '')
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                  <div
                    className='notification-sec'
                    ref={notificationDropdownRef}
                  >
                    <img
                      src={!darkMode ? Bell : Bell_2}
                      alt='bell'
                      className='mobileSearchIcon mobileBellIcon'
                      onClick={toggleNotifications}
                    />
                    {notificationCount !== 0 ? (
                      <span
                        className='notification-count-number mobile-notification-count'
                        onClick={toggleNotifications}
                      >
                        {notificationCount}
                      </span>
                    ) : null}
                    {showNotifications && (
                      <div
                        className={
                          'notification-list mobile-notification-list' +
                          (notifications.length < 0
                            ? ' empty-notification-list'
                            : '') +
                          (darkMode ? ' darkDropDown' : '')
                        }
                      >
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => {
                            return (
                              <div
                                key={index}
                                className='notification'
                                onClick={() =>
                                  sendNotificationRead({
                                    id: notification.id,
                                    status: !notification.status,
                                  })
                                }
                              >
                                <h3
                                  className={
                                    !notification.status
                                      ? 'not-read-message'
                                      : ''
                                  }
                                >
                                  {!notification.company_id
                                    ? 'Իրադարձություն'
                                    : 'Գործառույթ'}
                                  : {notification.name}
                                </h3>
                                <h5
                                  className={
                                    !notification.status
                                      ? 'not-read-message'
                                      : ''
                                  }
                                >
                                  {notification.description}
                                </h5>
                                <h5>{notification.time_since_creation}</h5>
                                <hr />
                                {!notification.status ? (
                                  <div className='not-read'></div>
                                ) : null}
                              </div>
                            );
                          })
                        ) : (
                          <div className='emptynotification'>
                            <h4>Դուք դեռ չունեք ծանուցումներ</h4>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className='userBlock'>
                    <div className='userAvatar' onClick={toggleUserDropdown}>
                      <img src={userAvatar ? userAvatar : User} alt='user' />
                    </div>
                  </div>
                  {userDropdownOpen && (
                    <div
                      className={
                        'UserDropdown' + (darkMode ? ' darkDropDown' : '')
                      }
                    >
                      <div className='logOut' onClick={goToProfile}>
                        <FaUser /> Օգտատեր
                      </div>
                      <div
                        className={
                          'logOut themePanel' + (darkMode ? ' darkPanel' : '')
                        }
                      >
                        <h3
                          className={
                            'themeChange' +
                            (!darkMode ? ' activeTheme lightTheme' : '')
                          }
                          onClick={() => setDarkMode(false)}
                        >
                          <BsFillSunFill
                            style={{ width: '18px', height: '18px' }}
                          />{' '}
                          Light
                        </h3>
                        <h3
                          className={
                            'themeChange' +
                            (darkMode ? ' activeTheme darkTheme' : '')
                          }
                          onClick={() => setDarkMode(true)}
                        >
                          <BsMoonStarsFill /> Dark
                        </h3>
                      </div>
                      <div className='logOut' onClick={logOut}>
                        <ImExit /> Դուրս գալ
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className='mobile-bottom-menu'
                style={
                  darkMode
                    ? { backgroundImage: `url(${MobileBottomMenuBlack})` }
                    : { backgroundImage: `url(${MobileBottomMenu})` }
                }
              >
                <button
                  className='plusBtn'
                  onClick={() => navigate(ROUTE_NAMES.NEWACTIVITY)}
                >
                  <FaPlus />
                </button>
                <div className='bottom-menu-grouped-tabs'>
                  <div>
                    <NavLink to={ROUTE_NAMES.HOME}>
                      {({ isActive }) =>
                        isActive ? (
                          <>
                            <img src={Main_2} alt='Main' />
                            <h5
                              className={
                                'tab-menu-headline' +
                                (darkMode ? ' whiteElement' : '')
                              }
                            >
                              Գլխավոր
                            </h5>
                          </>
                        ) : (
                          <>
                            <img src={!darkMode ? Main_1 : Main_3} alt='Main' />
                            <h5
                              className={
                                'tab-menu-headline-hidden' +
                                (darkMode ? ' whiteElement' : '')
                              }
                            >
                              Գլխավոր
                            </h5>
                          </>
                        )
                      }
                    </NavLink>
                  </div>
                  <div>
                    {!CompDropdownOpen ? (
                      <div className='mobileCompanyDropDownDiv'>
                        <img
                          src={!darkMode ? Company_1 : Company_3}
                          alt='Company'
                          onClick={toggleMobileCompDropdown}
                        />
                        <h5 className={darkMode ? ' whiteElement' : ''}>
                          {selectedOption}
                        </h5>
                      </div>
                    ) : (
                      <div className='mobileCompanyDropDownDiv'>
                        <img
                          src={Company_2}
                          alt='Company'
                          onClick={toggleMobileCompDropdown}
                        />
                        <h5
                          className={
                            'tab-menu-headline' +
                            (darkMode ? ' whiteElement' : '')
                          }
                        >
                          {selectedOption}
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
                <div className='bottom-menu-grouped-tabs'>
                  <div>
                    <NavLink
                      to={ROUTE_NAMES.CALENDAR}
                      onClick={() =>
                        handleClickMobileCalendar(ROUTE_NAMES.CALENDAR)
                      }
                    >
                      {({ isActive }) =>
                        isActive ? (
                          <>
                            <img src={Calendar_2} alt='Calendar' />
                            <h5
                              className={
                                'tab-menu-headline' +
                                (darkMode ? ' whiteElement' : '')
                              }
                            >
                              Օրացույց
                            </h5>
                          </>
                        ) : (
                          <>
                            <img
                              src={!darkMode ? Calendar_1 : Calendar_3}
                              alt='Calendar'
                            />
                            <h5
                              className={
                                'tab-menu-headline-hidden' +
                                (darkMode ? ' whiteElement' : '')
                              }
                            >
                              Օրացույց
                            </h5>
                          </>
                        )
                      }
                    </NavLink>
                  </div>
                  <div>
                    {sideMenu ? (
                      <img
                        src={!darkMode ? menuX : menuX_2}
                        alt='menuBars'
                        className='mobile-menu-bars'
                        onClick={showMobileSideMenu}
                      />
                    ) : (
                      <img
                        src={!darkMode ? MenuBars : MenuBars_2}
                        alt='menuBars'
                        className='mobile-menu-bars'
                        onClick={showMobileSideMenu}
                      />
                    )}
                  </div>
                </div>
              </div>
              {sideMenu ? (
                <div
                  className={
                    'mobileSideMenu moveLeft' +
                    (darkMode ? ' darkDropDown' : '')
                  }
                >
                  <NavLink
                    to={ROUTE_NAMES.STAFF}
                    className={({ isActive }) =>
                      isActive
                        ? 'navItem activeNav'
                        : 'navItem' + (darkMode ? ' whiteElement' : '')
                    }
                  >
                    <h3 className='menuBtn'>Ստաֆ</h3>
                  </NavLink>
                  <NavLink
                    to={ROUTE_NAMES.ORGANIZATION}
                    className={({ isActive }) =>
                      isActive
                        ? 'navItem activeNav'
                        : 'navItem' + (darkMode ? ' whiteElement' : '')
                    }
                  >
                    <h3 className='menuBtn'>Կազմակերպություններ</h3>
                  </NavLink>
                  <h3
                    className={'menuBtn' + (darkMode ? ' whiteElement' : '')}
                    onClick={toggleTexekatuMenu}
                  >
                    Տեղեկատու
                    <MdKeyboardArrowDown className='small-arrow' />
                  </h3>
                  <div
                    className={
                      !showTexekatu
                        ? 'texekatu-menu'
                        : 'texekatu-menu showTexekatu'
                    }
                  >
                    <NavLink
                      to={ROUTE_NAMES.POSITIONS}
                      className={({ isActive }) =>
                        isActive
                          ? 'navItem activeNav'
                          : 'navItem' + (darkMode ? ' whiteElement' : '')
                      }
                    >
                      <h3 className='menuBtn'>Պաշտոններ</h3>
                    </NavLink>
                    <NavLink
                      to={ROUTE_NAMES.DIVISION}
                      className={({ isActive }) =>
                        isActive
                          ? 'navItem activeNav'
                          : 'navItem' + (darkMode ? ' whiteElement' : '')
                      }
                    >
                      <h3 className='menuBtn'>Ստորաբաժանումներ</h3>
                    </NavLink>
                  </div>
                  <NavLink
                    to={ROUTE_NAMES.ACTIVITES}
                    className={({ isActive }) =>
                      isActive
                        ? 'navItem activeNav'
                        : 'navItem' + (darkMode ? ' whiteElement' : '')
                    }
                  >
                    <h3 className='menuBtn'>Գործողություններ</h3>
                  </NavLink>
                  <NavLink
                    to={ROUTE_NAMES.CONTACTUS}
                    className={({ isActive }) =>
                      isActive
                        ? 'navItem activeNav'
                        : 'navItem' + (darkMode ? ' whiteElement' : '')
                    }
                  >
                    <h3 className='menuBtn'>Հետադարձ Կապ</h3>
                  </NavLink>
                </div>
              ) : (
                <div
                  className={
                    'mobileSideMenu' + (darkMode ? ' darkDropDown' : '')
                  }
                >
                  <NavLink
                    to={ROUTE_NAMES.STAFF}
                    className={({ isActive }) =>
                      isActive ? 'navItem activeNav' : 'navItem'
                    }
                  >
                    <h3 className='menuBtn'>Ստաֆ</h3>
                  </NavLink>
                  <NavLink
                    to={ROUTE_NAMES.ORGANIZATION}
                    className={({ isActive }) =>
                      isActive ? 'navItem activeNav' : 'navItem'
                    }
                  >
                    <h3 className='menuBtn'>Կազմակերպություններ</h3>
                  </NavLink>
                  <h3 className='menuBtn' onClick={toggleTexekatuMenu}>
                    Տեղեկատու
                    <MdKeyboardArrowDown className='small-arrow' />
                  </h3>
                  <div
                    className={
                      !showTexekatu
                        ? 'texekatu-menu'
                        : 'texekatu-menu showTexekatu'
                    }
                  >
                    <NavLink
                      to={ROUTE_NAMES.POSITIONS}
                      className={({ isActive }) =>
                        isActive ? 'navItem' : 'navItem'
                      }
                    >
                      <h3 className='menuBtn'>Պաշտոններ</h3>
                    </NavLink>
                    <NavLink
                      to={ROUTE_NAMES.DIVISION}
                      className={({ isActive }) =>
                        isActive ? 'navItem' : 'navItem'
                      }
                    >
                      <h3 className='menuBtn'>Ստորաբաժանումներ</h3>
                    </NavLink>
                  </div>
                  <NavLink
                    to={ROUTE_NAMES.ACTIVITES}
                    className={({ isActive }) =>
                      isActive ? 'navItem activeNav' : 'navItem'
                    }
                  >
                    <h3 className='menuBtn'>Գործողություններ</h3>
                  </NavLink>
                  <NavLink
                    to={ROUTE_NAMES.CONTACTUS}
                    className={({ isActive }) =>
                      isActive ? 'navItem activeNav' : 'navItem'
                    }
                  >
                    <h3 className='menuBtn'>Հետադարձ Կապ</h3>
                  </NavLink>
                </div>
              )}
              {CompDropdownOpen && options && options.length > 1 ? (
                <div
                  className={
                    'CompanyDropdownOptions moveRight' +
                    (darkMode ? ' darkDropDown' : '')
                  }
                  ref={dropdownRef}
                >
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className='CompanyDropdownOption'
                      onClick={() =>
                        handleOptionClick(option.id, option.company_name)
                      }
                    >
                      {option.company_name}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={
                    'CompanyDropdownOptions mobileComp' +
                    (darkMode ? ' darkDropDown' : '')
                  }
                  ref={dropdownRef}
                >
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className='CompanyDropdownOption'
                      onClick={() =>
                        handleOptionClick(option.id, option.company_name)
                      }
                    >
                      {option.company_name}
                    </div>
                  ))}
                </div>
              )}
              <div
                className={
                  'profileInfoSection' +
                  (popUpOpen ? ' popup-open' : '') +
                  (darkMode ? ' lightDark' : '')
                }
              >
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : isEmailActivatedPage ? (
        <EmailActivatedPage />
      ) : isResetPasswordPage ? (
        <ConfirmNewPassword />
      ) : (
        <SignIn />
      )}
    </>
  );
}
