import React, { useRef, useState } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import { SignInUser } from '../../Platform/SignIn';
import { SignUpUser } from '../../Platform/SignUp';
import { ResetPassword } from '../../Platform/ResetPassword';

//Logos
import Logo from '../../assets/Images/Logo.png';
import LogoWhite from '../../assets/Images/LogoWhite.png';

//Icons
import { FaFacebookF } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

export default function SignIn() {
  const { darkMode } = useGlobalContext();
  const overlayRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const accountFormRef = useRef(null);
  const signinFormRef = useRef(null);
  const SignInBtn = useRef(null);
  const SignUpBtn = useRef(null);

  const [isSignInOpen, setIsSignInOpen] = useState(true);
  const [showSignInPass, setShowSignInPass] = useState(false);
  const [showSignUpPass, setShowSignUpPass] = useState(false);
  const [showReapetPass, setShowReapetPass] = useState(false);

  const [nameLabel, setNameLabel] = useState(false);
  const [surnameLabel, setSurnameLabel] = useState(false);
  const [email1Label, setEmail1Label] = useState(false);
  const [password1Label, setPassword1Label] = useState(false);
  const [password2Label, setPassword2Label] = useState(false);
  const [password3Label, setPassword3Label] = useState(false);
  const [email2Label, setEmail2Label] = useState(false);
  const [telLabel, setTelLabel] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPass, setLoginPass] = useState(null);

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState('');
  const [pass, setPass] = useState(null);
  const [repeatPass, setRepeatPass] = useState(null);

  const [email1Error, setEmail1Error] = useState(null);
  const [pass1Error, setPass1Error] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [surnameError, setSurnameError] = useState(null);
  const [email2Error, setEmail2Error] = useState(null);
  const [telError, setTelError] = useState(null);
  const [pass2Error, setPass2Error] = useState(null);
  const [pass3Error, setPass3Error] = useState(null);

  const [pass2, SetPass2] = useState('');

  const [signUpMailSend, setSignUpMailSend] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPassMailSend, setForgotPassMailSend] = useState(false);

  const openSignUp = () => {
    leftTextRef.current.classList.remove('overlay-text-left-animation-out');
    overlayRef.current.classList.remove('open-sign-in');
    rightTextRef.current.classList.remove('overlay-text-right-animation');

    accountFormRef.current.classList.add('form-left-slide-out');
    rightTextRef.current.classList.add('overlay-text-right-animation-out');
    overlayRef.current.classList.add('open-sign-up');
    leftTextRef.current.classList.add('overlay-text-left-animation');

    setTimeout(() => {
      accountFormRef.current.classList.remove('form-left-slide-in');
      accountFormRef.current.style.visibility = 'hidden';
      SignInBtn.current.style.display = 'none';
      signinFormRef.current.style.display = 'flex';
      accountFormRef.current.classList.remove('form-left-slide-out');
      setIsSignInOpen(false);
    }, 600);

    setTimeout(() => {
      if (SignUpBtn.current) {
        SignUpBtn.current.style.display = 'block';
      }
      signinFormRef.current.classList.add('form-right-slide-in');
    }, 400);
  };

  const openSignIn = () => {
    leftTextRef.current.classList.remove('overlay-text-left-animation');
    overlayRef.current.classList.remove('open-sign-up');
    rightTextRef.current.classList.remove('overlay-text-right-animation-out');

    signinFormRef.current.classList.add('form-right-slide-out');
    leftTextRef.current.classList.add('overlay-text-left-animation-out');
    overlayRef.current.classList.add('open-sign-in');
    rightTextRef.current.classList.add('overlay-text-right-animation');

    setTimeout(() => {
      signinFormRef.current.classList.remove('form-right-slide-in');
      signinFormRef.current.classList.remove('form-right-slide-out');
    }, 600);

    setTimeout(() => {
      setIsSignInOpen(true);
      SignUpBtn.current.style.display = 'none';
    }, 350);

    setTimeout(() => {
      signinFormRef.current.style.display = 'none';
    }, 320);

    setTimeout(() => {
      accountFormRef.current.style.display = 'flex';
      accountFormRef.current.style.visibility = 'visible';
    }, 400);

    setTimeout(() => {
      SignInBtn.current.style.display = 'block';
      accountFormRef.current.classList.add('form-left-slide-in');
    }, 400);
  };

  const openSignUpClicked = () => {
    openSignUp();
  };

  const handleSignInShowPassword = () => {
    setShowSignInPass(!showSignInPass);
  };

  const handleSignUpShowPassword = () => {
    setShowSignUpPass(!showSignUpPass);
  };

  const handleReapeatShowPassword = () => {
    setShowReapetPass(!showReapetPass);
  };

  const upLabel = (e) => {
    e.classList.add('upLabel');
  };

  const chechLabelPass1 = (v) => {
    setLoginPass(v);
    if (v && v !== '') {
      setPass1Error('');
      setPassword1Label(true);
    } else {
      setPass1Error('Դաշտը պարտադիր է');
      setPassword1Label(false);
    }
  };

  const chechLabelEmail1 = (v) => {
    setLoginEmail(v);
    if (v && v !== '') {
      setEmail1Label(true);
      setEmail1Error('');
    } else {
      setEmail1Error('Դաշտը պարտադիր է');
      setEmail1Label(false);
    }
  };

  const chechLabelName = (v) => {
    setName(v);
    if (v && v !== '') {
      setNameError('');
      setNameLabel(true);
    } else {
      setNameError('Դաշտը պարտադիր է');
      setNameLabel(false);
    }
  };

  const chechLabelSurname = (v) => {
    setSurname(v);
    if (v && v !== '') {
      setSurnameError('');
      setSurnameLabel(true);
    } else {
      setSurnameError('Դաշտը պարտադիր է');
      setSurnameLabel(false);
    }
  };

  const chechLabelEmail2 = (v) => {
    setEmail(v);
    if (v && v !== '') {
      setEmail2Error('');
      setEmail2Label(true);
    } else {
      setEmail2Error('Դաշտը պարտադիր է');
      setEmail2Label(false);
    }
  };

  const chechLabelTel = (v) => {
    if (v.startsWith('+')) {
      v = '+' + v.replace(/[^0-9]/g, '');
    } else {
      v = v.replace(/[^0-9]/g, '');
    }
    setTel(v);
    if (v && v !== '') {
      setTelError('');
      setTelLabel(true);
    } else {
      setTelError('Դաշտը պարտադիր է');
      setTelLabel(false);
    }
  };

  const chechLabelPass2 = (v) => {
    setPass(v);
    if (v && v !== '') {
      SetPass2(v);
      setPass2Error('');
      setPassword2Label(true);
    } else {
      setPass2Error('Դաշտը պարտադիր է');
      setPassword2Label(false);
    }
  };

  const chechLabelPass3 = (v) => {
    setRepeatPass(v);
    if (pass2 && v && v !== pass2) {
      setPass3Error('Գաղտնաբառերը չեն համընկնում');
    } else if (v && v !== '') {
      setPass3Error('');
      setPassword3Label(true);
    } else {
      setPass3Error('Դաշտը պարտադիր է');
      setPassword3Label(false);
    }
  };

  const handleLabelClick = () => {
    setIsChecked(!isChecked);
    setAgreed(!isChecked);
  };

  const validateLoginForm = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!loginEmail || loginEmail === '') {
      setEmail1Error('Դաշտը պարտադիր է');
    } else if (!emailPattern.test(loginEmail)) {
      setEmail1Error('Խնդրում ենք մուտքագրել վավեր էլ. հասցե');
    } else {
      setEmail1Error('');
    }
    if (!loginPass || loginPass === '') {
      setPass1Error('Դաշտը պարտադիր է');
    } else {
      setPass1Error('');
    }
  };

  const logIn = async (e) => {
    e.preventDefault();
    validateLoginForm();
    if (email1Error === '' && pass1Error === '') {
      const user = {
        email: loginEmail,
        password: loginPass,
      };
      try {
        const result = await SignInUser(user);
        localStorage.setItem('token', `${result.data.access}`);
        localStorage.setItem('refreshToken', `${result.data.refresh}`);
        localStorage.setItem('logedIn', 'true');
        window.location.reload();
      } catch (error) {
        setPass1Error('Էլ․ հասցեն կամ գաղտնաբառը սխալ են');
      }
    }
  };

  const validateSignUpForm = () => {
    setAgreed(true);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!name || name === '') {
      setNameError('Դաշտը պարտադիր է');
    } else {
      setNameError('');
    }
    if (!surname || surname === '') {
      setSurnameError('Դաշտը պարտադիր է');
    } else {
      setSurnameError('');
    }
    if (!email || email === '') {
      setEmail2Error('Դաշտը պարտադիր է');
    } else if (!emailPattern.test(email)) {
      setEmail2Error('Խնդրում ենք մուտքագրել վավեր էլ. հասցե');
    } else {
      setEmail2Error('');
    }
    if (!tel || tel === '') {
      setTelError('Դաշտը պարտադիր է');
    } else {
      setTelError('');
    }
    if (!pass || pass === '') {
      setPass2Error('Դաշտը պարտադիր է');
    } else {
      setPass2Error('');
    }
    if (repeatPass !== pass) {
      setPass3Error('Գաղտնաբառերը չեն համընկնում');
    } else if (!repeatPass || repeatPass === '') {
      setPass3Error('Դաշտը պարտադիր է');
    } else {
      setPass3Error('');
    }
    setAgreed(isChecked);
  };

  const signUp = async (e) => {
    e.preventDefault();
    validateSignUpForm();

    if (
      nameError === '' &&
      surnameError === '' &&
      email2Error === '' &&
      telError === '' &&
      pass2Error === '' &&
      (pass3Error === '') & isChecked
    ) {
      const newUser = {
        email: email,
        first_name: name,
        last_name: surname,
        password: pass,
        re_password: repeatPass,
        phone_number: tel,
      };
      try {
        await SignUpUser(newUser);
        setSignUpMailSend(true);
      } catch (error) {
        if (error.response && error.response.data.phone_number) {
          setTelError('Այս հեռ․ արդեն օգտագործված է');
        }
        if (error.response && error.response.data.email) {
          setEmail2Error('Այս էլ․ հասցեն արդեն օգտագործված է');
        }
      }
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    validateLoginForm();
    if (email1Error === '') {
      const userReset = {
        email: loginEmail,
      };

      try {
        await ResetPassword(userReset);
        setForgotPassMailSend(true);
      } catch (error) {
        setEmail1Error('Այդպիսի օգտատեր չկա');
      }
    }
  };

  return (
    <>
      <div className='container'>
        <div className='overlay' ref={overlayRef}>
          <div className='sign-in' ref={leftTextRef}>
            <h1>Արդեն ունե՞ք հաշիվ</h1>
            <p>
              Համակարգ մուտք գործելու համար պարզապես սեղմեք ստորև ներկայացված
              կոճակը:
            </p>
            <div className='social-media-buttons'>
              <a
                href='https://www.facebook.com/doc2b.am'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebookF className='icon' />
              </a>
              <a
                href='https://t.me/doc2bam'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTelegramPlane className='icon' />
              </a>
              <a
                href='https://www.linkedin.com/company/doc2bam/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedinIn className='icon' />
              </a>
              <a
                href='https://www.youtube.com/channel/UCbLU-xAW1nc_GsCbEL5JypA'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube className='icon' />
              </a>
            </div>
            <button
              className='switch-button'
              id='slide-right-button'
              onClick={openSignIn}
            >
              Մուտք գործել
            </button>
          </div>
          <div className='sign-up' ref={rightTextRef}>
            <h1>Ցանկանու՞մ եք ստեղծել հաշիվ</h1>
            <p>
              Համակարգում հաշիվ ստեղծելու համար պարզապես լրացրեք անհրաժեշտ
              դաշտերը:
            </p>
            <div className='social-media-buttons'>
              <a
                href='https://www.facebook.com/doc2b.am'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebookF className='icon' />
              </a>
              <a
                href='https://t.me/doc2bam'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTelegramPlane className='icon' />
              </a>
              <a
                href='https://www.linkedin.com/company/doc2bam/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedinIn className='icon' />
              </a>
              <a
                href='https://www.youtube.com/channel/UCbLU-xAW1nc_GsCbEL5JypA'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube className='icon' />
              </a>
            </div>
            <button
              className='switch-button'
              id='slide-left-button'
              onClick={openSignUpClicked}
            >
              ստեղծել հաշիվ
            </button>
          </div>
        </div>
        <div className='form'>
          <div className='logo-block'>
            {darkMode ? (
              <img src={LogoWhite} alt='mainLogo' />
            ) : isSignInOpen ? (
              <img src={Logo} alt='mainLogo' />
            ) : (
              <img src={LogoWhite} alt='mainLogo' />
            )}
          </div>
          <div
            className='sign-in'
            ref={accountFormRef}
            style={{ display: 'flex' }}
          >
            <h1>Մուտք Գործել</h1>
            {!forgotPassword ? (
              <p className={'small' + (darkMode ? ' whiteElement' : '')}>
                Լրացրեք ձեր տվյալները և դարձեք մեր խելացի համակարգի օգտատերերից
                մեկը:
              </p>
            ) : (
              <p className={'small' + (darkMode ? ' whiteElement' : '')}>
                Նշեք ձեր էլ․ հասցեն
              </p>
            )}
            {!forgotPassMailSend ? (
              <form id='sign-in-form'>
                <div className='InputContainer'>
                  <input
                    type='email'
                    name='Email-1'
                    className={
                      'inpts' +
                      (email1Error ? ' errorInpt' : '') +
                      (darkMode ? ' darkInpt' : '')
                    }
                    onChange={(e) => chechLabelEmail1(e.target.value)}
                    autoComplete='email'
                  />
                  <label
                    htmlFor='Email-1'
                    className={
                      'myLabel' +
                      (email1Label ? ' upLabel' : '') +
                      (email1Error ? ' upLabel errorLabel' : '')
                    }
                    onClick={(e) => upLabel(e.target)}
                  >
                    Էլ․ փոստ
                  </label>
                  {email1Error ? (
                    <div>
                      <span className='errorMessage'>{email1Error}</span>
                    </div>
                  ) : null}
                </div>
                {!forgotPassword ? (
                  <>
                    <div className='InputContainer'>
                      <div>
                        <input
                          type={showSignInPass ? 'text' : 'password'}
                          name='Գաղտնաբառ-1'
                          className={
                            'inpts' +
                            (pass1Error ? ' errorInpt' : '') +
                            (darkMode ? ' darkInpt' : '')
                          }
                          onChange={(e) => chechLabelPass1(e.target.value)}
                          autoComplete='current-password'
                        />
                        <label
                          htmlFor='Գաղտնաբառ-1'
                          className={
                            'myLabel' +
                            (password1Label ? ' upLabel' : '') +
                            (pass1Error ? ' upLabel errorLabel' : '')
                          }
                          onClick={(e) => upLabel(e.target)}
                        >
                          Գաղտնաբառ
                        </label>
                        {!showSignInPass ? (
                          <FaEyeSlash
                            className={
                              'passwordIcon' + (pass1Error ? ' errorEye' : '')
                            }
                            onClick={handleSignInShowPassword}
                          />
                        ) : (
                          <FaEye
                            className={
                              'passwordIcon' + (pass1Error ? ' errorEye' : '')
                            }
                            onClick={handleSignInShowPassword}
                          />
                        )}
                        {pass1Error ? (
                          <div>
                            <span className='errorMessage'>{pass1Error}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <p
                      className={
                        'forgot-password' + (darkMode ? ' whiteElement' : '')
                      }
                      onClick={() => setForgotPassword(true)}
                    >
                      Մոռացել եմ գաղտնաբառը
                    </p>
                  </>
                ) : null}
                {!forgotPassword ? (
                  <button
                    className='control-button in'
                    ref={SignInBtn}
                    onClick={logIn}
                  >
                    Մուտք գործել
                  </button>
                ) : (
                  <button
                    className='control-button in'
                    ref={SignInBtn}
                    onClick={resetPassword}
                  >
                    Ուղարկել
                  </button>
                )}
              </form>
            ) : (
              <div>
                <h3
                  className={
                    'verify-mail-send' + (darkMode ? ' whiteElement' : '')
                  }
                >
                  Խնդրում ենք ստուգել ձեր էլ․ հասցեն
                </h3>
              </div>
            )}
          </div>
          <div className='sign-up' ref={signinFormRef}>
            <h1>Ստեղծել Հաշիվ</h1>
            <p className={'small' + (darkMode ? ' whiteElement' : '')}>
              Լրացրեք ձեր տվյալները և դարձեք մեր խելացի համակարգի օգտատերերից
              մեկը:
            </p>
            {!signUpMailSend ? (
              <form id='sign-up-form'>
                <div className='groupedInpts'>
                  <div className='InputContainer'>
                    <input
                      type='text'
                      name='Name'
                      className={
                        'inpts' +
                        (nameError ? ' errorInpt' : '') +
                        (darkMode ? ' darkInpt' : '')
                      }
                      onChange={(e) => chechLabelName(e.target.value)}
                    />
                    <label
                      htmlFor='Name'
                      className={
                        'myLabel' +
                        (nameLabel ? ' upLabel' : '') +
                        (nameError ? ' upLabel errorLabel' : '')
                      }
                      onClick={(e) => upLabel(e.target)}
                    >
                      Անուն
                    </label>
                    {nameError ? (
                      <div>
                        <span className='errorMessage'>{nameError}</span>
                      </div>
                    ) : null}
                  </div>
                  <div className='InputContainer'>
                    <input
                      type='text'
                      name='Ազգանուն'
                      className={
                        'inpts' +
                        (surnameError ? ' errorInpt' : '') +
                        (darkMode ? ' darkInpt' : '')
                      }
                      onChange={(e) => chechLabelSurname(e.target.value)}
                    />
                    <label
                      htmlFor='Ազգանուն'
                      className={
                        'myLabel' +
                        (surnameLabel ? ' upLabel' : '') +
                        (surnameError ? ' upLabel errorLabel' : '')
                      }
                      onClick={(e) => upLabel(e.target)}
                    >
                      Ազգանուն
                    </label>
                    {surnameError ? (
                      <div>
                        <span className='errorMessage'>{surnameError}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='groupedInpts'>
                  <div className='InputContainer'>
                    <input
                      type='email'
                      name='Email-2'
                      className={
                        'inpts' +
                        (email2Error ? ' errorInpt' : '') +
                        (darkMode ? ' darkInpt' : '')
                      }
                      onChange={(e) => chechLabelEmail2(e.target.value)}
                    />
                    <label
                      htmlFor='Email-2'
                      className={
                        'myLabel' +
                        (email2Label ? ' upLabel' : '') +
                        (email2Error ? ' upLabel errorLabel' : '')
                      }
                      onClick={(e) => upLabel(e.target)}
                    >
                      Էլ․ փոստ
                    </label>
                    {email2Error ? (
                      <div>
                        <span className='errorMessage'>{email2Error}</span>
                      </div>
                    ) : null}
                  </div>
                  <div className='InputContainer'>
                    <input
                      type='tel'
                      name='Հեռ․'
                      className={
                        'inpts' +
                        (telError ? ' errorInpt' : '') +
                        (darkMode ? ' darkInpt' : '')
                      }
                      value={tel}
                      onChange={(e) => chechLabelTel(e.target.value)}
                      autoComplete={tel}
                    />
                    <label
                      htmlFor='Հեռ․'
                      className={
                        'myLabel' +
                        (telLabel ? ' upLabel' : '') +
                        (telError ? ' upLabel errorLabel' : '')
                      }
                      onClick={(e) => upLabel(e.target)}
                    >
                      Հեռ․
                    </label>
                    {telError ? (
                      <div>
                        <span className='errorMessage'>{telError}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='groupedInpts'>
                  <div className='InputContainer'>
                    <div>
                      <input
                        type={showSignUpPass ? 'text' : 'password'}
                        name='Գաղտնաբառ-2'
                        className={
                          'inpts' +
                          (pass2Error ? ' errorInpt' : '') +
                          (darkMode ? ' darkInpt' : '')
                        }
                        onChange={(e) => chechLabelPass2(e.target.value)}
                        autoComplete='new-password'
                      />
                      <label
                        htmlFor='Գաղտնաբառ-2'
                        className={
                          'myLabel' +
                          (password2Label ? ' upLabel' : '') +
                          (pass2Error ? ' upLabel errorLabel' : '')
                        }
                        onClick={(e) => upLabel(e.target)}
                      >
                        Գաղտնաբառ
                      </label>
                      {!showSignUpPass ? (
                        <FaEyeSlash
                          className={
                            'passwordIcon' + (pass2Error ? ' errorEye' : '')
                          }
                          onClick={handleSignUpShowPassword}
                        />
                      ) : (
                        <FaEye
                          className={
                            'passwordIcon' + (pass2Error ? ' errorEye' : '')
                          }
                          onClick={handleSignUpShowPassword}
                        />
                      )}
                      {pass2Error ? (
                        <div>
                          <span className='errorMessage'>{pass2Error}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='InputContainer'>
                    <div>
                      <input
                        type={showReapetPass ? 'text' : 'password'}
                        className={
                          'inpts' +
                          (pass3Error ? ' errorInpt' : '') +
                          (darkMode ? ' darkInpt' : '')
                        }
                        onChange={(e) => chechLabelPass3(e.target.value)}
                        autoComplete='current-password'
                      />
                      <label
                        htmlFor='Գաղտնաբառ-1'
                        className={
                          'myLabel' +
                          (password3Label ? ' upLabel' : '') +
                          (pass3Error ? ' upLabel errorLabel' : '')
                        }
                        onClick={(e) => upLabel(e.target)}
                      >
                        Կրկնեք գաղտնաբառը
                      </label>
                      {!showReapetPass ? (
                        <FaEyeSlash
                          className={
                            'passwordIcon' + (pass3Error ? ' errorEye' : '')
                          }
                          onClick={handleReapeatShowPassword}
                        />
                      ) : (
                        <FaEye
                          className={
                            'passwordIcon' + (pass3Error ? ' errorEye' : '')
                          }
                          onClick={handleReapeatShowPassword}
                        />
                      )}
                      {pass3Error ? (
                        <div>
                          <span className='errorMessage'>{pass3Error}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className='agree'>
                  <input
                    type='checkbox'
                    name='պայմաններ'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label
                    htmlFor='պայմաններ'
                    className={
                      !agreed
                        ? 'notAgree'
                        : '' + (darkMode ? ' whiteElement' : '')
                    }
                    onClick={handleLabelClick}
                  >
                    Համաձայն եմ ընդհանուր դրույթներին և պայմաններին
                  </label>
                </div>
                <button
                  className='control-button up'
                  ref={SignUpBtn}
                  onClick={signUp}
                >
                  Ստեղծել հաշիվ
                </button>
              </form>
            ) : (
              <div>
                <h3
                  className={
                    'verify-mail-send' + (darkMode ? ' whiteElement' : '')
                  }
                >
                  Խնդրում ենք ակտիվացնել ձեր էջն էլ․ հասցեին ուղարկված նամակից
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mobileLogIn'>
        <div className='logo-block'>
          {darkMode ? (
            <img src={LogoWhite} alt='mainLogo' />
          ) : (
            <img src={Logo} alt='mainLogo' />
          )}
        </div>
        {isSignInOpen ? (
          <h1 className='mainTitle'>Մուտք Գործել</h1>
        ) : (
          <h1 className='mainTitle'>Ստեղծել Հաշիվ</h1>
        )}
        {isSignInOpen ? (
          forgotPassword ? (
            <p className={'small' + (darkMode ? ' whiteElement' : '')}>
              Նշեք ձեր էլ․ հասցեն
            </p>
          ) : (
            <p className={'small' + (darkMode ? ' whiteElement' : '')}>
              Լրացրեք ձեր տվյալները և դարձեք մեր խելացի համակարգի օգտատերերից
              մեկը:
            </p>
          )
        ) : (
          <p className={'small' + (darkMode ? ' whiteElement' : '')}>
            Լրացրեք ձեր տվյալները և դարձեք մեր խելացի համակարգի օգտատերերից
            մեկը:
          </p>
        )}
        {isSignInOpen ? (
          !forgotPassMailSend ? (
            <form id='sign-in-form sign-in-form-2'>
              <div className='InputContainer'>
                <input
                  type='email'
                  name='Email-1'
                  className={
                    'inpts' +
                    (email1Error ? ' errorInpt' : '') +
                    (darkMode ? ' darkInpt' : '')
                  }
                  onChange={(e) => chechLabelEmail1(e.target.value)}
                  autoComplete='email'
                />
                <label
                  htmlFor='Email-1'
                  className={
                    'myLabel' +
                    (email1Label ? ' upLabel' : '') +
                    (email1Error ? ' upLabel errorLabel' : '')
                  }
                  onClick={(e) => upLabel(e.target)}
                >
                  Էլ․ փոստ
                </label>
                {email1Error ? (
                  <div>
                    <span className='errorMessage'>{email1Error}</span>
                  </div>
                ) : null}
              </div>
              {!forgotPassword ? (
                <>
                  <div className='InputContainer'>
                    <div>
                      <input
                        type={showSignInPass ? 'text' : 'password'}
                        name='Գաղտնաբառ-1'
                        className={
                          'inpts' +
                          (pass1Error ? ' errorInpt' : '') +
                          (darkMode ? ' darkInpt' : '')
                        }
                        onChange={(e) => chechLabelPass1(e.target.value)}
                        autoComplete='current-password'
                      />
                      <label
                        htmlFor='Գաղտնաբառ-1'
                        className={
                          'myLabel' +
                          (password1Label ? ' upLabel' : '') +
                          (pass1Error ? ' upLabel errorLabel' : '')
                        }
                        onClick={(e) => upLabel(e.target)}
                      >
                        Գաղտնաբառ
                      </label>
                      {!showSignInPass ? (
                        <FaEyeSlash
                          className={
                            'passwordIcon' + (pass1Error ? ' errorEye' : '')
                          }
                          onClick={handleSignInShowPassword}
                        />
                      ) : (
                        <FaEye
                          className={
                            'passwordIcon' + (pass1Error ? ' errorEye' : '')
                          }
                          onClick={handleSignInShowPassword}
                        />
                      )}
                      {pass1Error ? (
                        <div>
                          <span className='errorMessage'>{pass1Error}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <p
                    className={
                      'forgot-password' + (darkMode ? ' whiteElement' : '')
                    }
                    onClick={() => setForgotPassword(true)}
                  >
                    Մոռացել եմ գաղտնաբառը
                  </p>
                </>
              ) : null}
              {!forgotPassword ? (
                <button
                  className='control-button in'
                  ref={SignInBtn}
                  onClick={logIn}
                >
                  Մուտք գործել
                </button>
              ) : (
                <button
                  className='control-button in'
                  ref={SignInBtn}
                  onClick={resetPassword}
                >
                  Ուղարկել
                </button>
              )}
            </form>
          ) : (
            <div>
              <h3
                className={
                  'verify-mail-send' + (darkMode ? ' whiteElement' : '')
                }
              >
                Խնդրում ենք ստուգել ձեր էլ․ հասցեն
              </h3>
            </div>
          )
        ) : !signUpMailSend ? (
          <form id='sign-up-form'>
            <div className='groupedInpts'>
              <div className='InputContainer'>
                <input
                  type='text'
                  name='Name'
                  className={
                    'inpts' +
                    (nameError ? ' errorInpt' : '') +
                    (darkMode ? ' darkInpt' : '')
                  }
                  onChange={(e) => chechLabelName(e.target.value)}
                />
                <label
                  htmlFor='Name'
                  className={
                    'myLabel' +
                    (nameLabel ? ' upLabel' : '') +
                    (nameError ? ' upLabel errorLabel' : '')
                  }
                  onClick={(e) => upLabel(e.target)}
                >
                  Անուն
                </label>
                {nameError ? (
                  <div>
                    <span className='errorMessage'>{nameError}</span>
                  </div>
                ) : null}
              </div>
              <div className='InputContainer'>
                <input
                  type='text'
                  name='Ազգանուն'
                  className={
                    'inpts' +
                    (surnameError ? ' errorInpt' : '') +
                    (darkMode ? ' darkInpt' : '')
                  }
                  onChange={(e) => chechLabelSurname(e.target.value)}
                />
                <label
                  htmlFor='Ազգանուն'
                  className={
                    'myLabel' +
                    (surnameLabel ? ' upLabel' : '') +
                    (surnameError ? ' upLabel errorLabel' : '')
                  }
                  onClick={(e) => upLabel(e.target)}
                >
                  Ազգանուն
                </label>
                {surnameError ? (
                  <div>
                    <span className='errorMessage'>{surnameError}</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='groupedInpts'>
              <div className='InputContainer'>
                <input
                  type='email'
                  name='Email-2'
                  className={
                    'inpts' +
                    (email2Error ? ' errorInpt' : '') +
                    (darkMode ? ' darkInpt' : '')
                  }
                  onChange={(e) => chechLabelEmail2(e.target.value)}
                />
                <label
                  htmlFor='Email-2'
                  className={
                    'myLabel' +
                    (email2Label ? ' upLabel' : '') +
                    (email2Error ? ' upLabel errorLabel' : '')
                  }
                  onClick={(e) => upLabel(e.target)}
                >
                  Էլ․ փոստ
                </label>
                {email2Error ? (
                  <div>
                    <span className='errorMessage'>{email2Error}</span>
                  </div>
                ) : null}
              </div>
              <div className='InputContainer'>
                <input
                  type='tel'
                  name='Հեռ․'
                  className={
                    'inpts' +
                    (telError ? ' errorInpt' : '') +
                    (darkMode ? ' darkInpt' : '')
                  }
                  value={tel}
                  onChange={(e) => chechLabelTel(e.target.value)}
                  autoComplete={tel}
                />
                <label
                  htmlFor='Հեռ․'
                  className={
                    'myLabel' +
                    (telLabel ? ' upLabel' : '') +
                    (telError ? ' upLabel errorLabel' : '')
                  }
                  onClick={(e) => upLabel(e.target)}
                >
                  Հեռ․
                </label>
                {telError ? (
                  <div>
                    <span className='errorMessage'>{telError}</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='groupedInpts'>
              <div className='InputContainer'>
                <div>
                  <input
                    type={showSignUpPass ? 'text' : 'password'}
                    name='Գաղտնաբառ-2'
                    className={
                      'inpts' +
                      (pass2Error ? ' errorInpt' : '') +
                      (darkMode ? ' darkInpt' : '')
                    }
                    onChange={(e) => chechLabelPass2(e.target.value)}
                    autoComplete='new-password'
                  />
                  <label
                    htmlFor='Գաղտնաբառ-2'
                    className={
                      'myLabel' +
                      (password2Label ? ' upLabel' : '') +
                      (pass2Error ? ' upLabel errorLabel' : '')
                    }
                    onClick={(e) => upLabel(e.target)}
                  >
                    Գաղտնաբառ
                  </label>
                  {!showSignUpPass ? (
                    <FaEyeSlash
                      className={
                        'passwordIcon' + (pass2Error ? ' errorEye' : '')
                      }
                      onClick={handleSignUpShowPassword}
                    />
                  ) : (
                    <FaEye
                      className={
                        'passwordIcon' + (pass2Error ? ' errorEye' : '')
                      }
                      onClick={handleSignUpShowPassword}
                    />
                  )}
                  {pass2Error ? (
                    <div>
                      <span className='errorMessage'>{pass2Error}</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='InputContainer'>
                <div>
                  <input
                    type={showReapetPass ? 'text' : 'password'}
                    className={
                      'inpts' +
                      (pass3Error ? ' errorInpt' : '') +
                      (darkMode ? ' darkInpt' : '')
                    }
                    onChange={(e) => chechLabelPass3(e.target.value)}
                    autoComplete='current-password'
                  />
                  <label
                    htmlFor='Գաղտնաբառ-1'
                    className={
                      'myLabel' +
                      (password3Label ? ' upLabel' : '') +
                      (pass3Error ? ' upLabel errorLabel' : '')
                    }
                    onClick={(e) => upLabel(e.target)}
                  >
                    Կրկնեք գաղտնաբառը
                  </label>
                  {!showReapetPass ? (
                    <FaEyeSlash
                      className={
                        'passwordIcon' + (pass3Error ? ' errorEye' : '')
                      }
                      onClick={handleReapeatShowPassword}
                    />
                  ) : (
                    <FaEye
                      className={
                        'passwordIcon' + (pass3Error ? ' errorEye' : '')
                      }
                      onClick={handleReapeatShowPassword}
                    />
                  )}
                  {pass3Error ? (
                    <div>
                      <span className='errorMessage'>{pass3Error}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='agree'>
              <input
                type='checkbox'
                name='պայմաններ'
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label
                htmlFor='պայմաններ'
                className={
                  !agreed ? 'notAgree' : '' + (darkMode ? ' whiteElement' : '')
                }
                onClick={handleLabelClick}
              >
                Համաձայն եմ ընդհանուր դրույթներին և պայմաններին
              </label>
            </div>
            <button
              className='control-button up'
              ref={SignUpBtn}
              onClick={signUp}
            >
              Ստեղծել հաշիվ
            </button>
          </form>
        ) : (
          <div>
            <h3
              className={'verify-mail-send' + (darkMode ? ' whiteElement' : '')}
            >
              Խնդրում ենք ակտիվացնել ձեր էջն էլ․ հասցեին ուղարկված նամակից
            </h3>
          </div>
        )}
        <div className='sign-up'>
          {isSignInOpen ? (
            <h1>Ցանկանու՞մ եք ստեղծել հաշիվ</h1>
          ) : (
            <h1>Արդեն ունե՞ք հաշիվ</h1>
          )}
          {isSignInOpen ? (
            <p>
              Համակարգում հաշիվ ստեղծելու համար պարզապես լրացրեք անհրաժեշտ
              դաշտերը:
            </p>
          ) : (
            <p>
              Համակարգ մուտք գործելու համար պարզապես սեղմեք ստորև ներկայացված
              կոճակը:
            </p>
          )}
          <div className='social-media-buttons'>
            <a
              href='https://www.facebook.com/doc2b.am'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebookF className='icon' />
            </a>
            <a
              href='https://t.me/doc2bam'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTelegramPlane className='icon' />
            </a>
            <a
              href='https://www.linkedin.com/company/doc2bam/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedinIn className='icon' />
            </a>
            <a
              href='https://www.youtube.com/channel/UCbLU-xAW1nc_GsCbEL5JypA'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaYoutube className='icon' />
            </a>
          </div>
          {isSignInOpen ? (
            <button
              className='switch-button'
              id='slide-left-button'
              onClick={openSignUpClicked}
            >
              ստեղծել հաշիվ
            </button>
          ) : (
            <button
              className='switch-button'
              id='slide-right-button'
              onClick={openSignIn}
            >
              Մուտք գործել
            </button>
          )}
        </div>
      </div>
    </>
  );
}
