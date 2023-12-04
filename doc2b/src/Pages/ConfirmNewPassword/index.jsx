import { React, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../Context/Context';

import { ConfirmResetPassword } from '../../Platform/ResetPassword';

import Logo from '../../assets/Images/Logo.png';
import LogoWhite from '../../assets/Images/LogoWhite.png';
import ResetPasswordIcon from '../../assets/Icons/ResetPassIcon.png';

import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

export default function ConfirmNewPassword() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { darkMode } = useGlobalContext();

  const [showSignUpPass, setShowSignUpPass] = useState(false);
  const [showReapetPass, setShowReapetPass] = useState(false);
  const [pass2Error, setPass2Error] = useState(null);
  const [pass3Error, setPass3Error] = useState(null);
  const [password2Label, setPassword2Label] = useState(false);
  const [password3Label, setPassword3Label] = useState(false);

  const [pass, setPass] = useState(null);
  const [pass2, SetPass2] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);

  const [passwordChangedSuccess, setPasswordChangeSuccess] = useState(false);

  const upLabel = (e) => {
    e.classList.add('upLabel');
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

  const handleSignUpShowPassword = () => {
    setShowSignUpPass(!showSignUpPass);
  };

  const handleReapeatShowPassword = () => {
    setShowReapetPass(!showReapetPass);
  };

  const handleResetPass = async (e) => {
    e.preventDefault();

    if (pass2Error || pass2Error == null || pass3Error || pass3Error == null) {
      if (pass2Error || pass2Error == null) {
        setPass2Error('Դաշտը պարտադիր է');
      }
      if (pass3Error || pass3Error == null) {
        setPass3Error('Դաշտը պարտադիր է');
      }
      return; // Return early if there's an error in either condition
    }

    // Continue with the rest of the function if no errors
    const newUser = {
      uid: uid,
      token: token,
      new_password: pass,
      re_new_password: repeatPass,
    };

    try {
      await ConfirmResetPassword(newUser);
      setPasswordChangeSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      setPasswordChangeSuccess(false);
      if (
        error.response.data.new_password[0] ===
        'This password is too short. It must contain at least 8 characters.'
      ) {
        setPass3Error('Գաղտնաբառը պետք է պարունակի ամենաքիչը 8 նշան');
      } else if (
        error.response.data.new_password[0] === 'This password is too common.'
      ) {
        setPass3Error('Գաղտնաբառը շատ հասարակ է');
      } else {
        setPass3Error('Գաղտնաբառը չի կարող պարունակել միայն թվանշաններ');
      }
      console.log(error.response.data.new_password);
    }
  };

  return (
    <div className='resetPassPage'>
      <div className='success-logo-section'>
        <img src={darkMode ? LogoWhite : Logo} alt='MainLogo' />
      </div>
      <div className={'contact-us-welcome' + (darkMode ? ' darkWelcome' : '')}>
        <img src={ResetPasswordIcon} alt='ResetPasswordIcon' />
        <h3>Փոխել Գաղտնաբառը</h3>
      </div>
      {!passwordChangedSuccess ? (
        <div className='reset-pass-inpts-sec'>
          <form id='sign-in-form'>
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
                  Նոր Գաղտնաբառը
                </label>
                {!showSignUpPass ? (
                  <FaEyeSlash
                    className={'passwordIcon' + (pass2Error ? ' errorEye' : '')}
                    onClick={handleSignUpShowPassword}
                  />
                ) : (
                  <FaEye
                    className={'passwordIcon' + (pass2Error ? ' errorEye' : '')}
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
                    className={'passwordIcon' + (pass3Error ? ' errorEye' : '')}
                    onClick={handleReapeatShowPassword}
                  />
                ) : (
                  <FaEye
                    className={'passwordIcon' + (pass3Error ? ' errorEye' : '')}
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
            <button className='control-button in' onClick={handleResetPass}>
              Փոխել
            </button>
          </form>
        </div>
      ) : (
        <h3
          className={'success-changed-pass' + (darkMode ? ' whiteElement' : '')}
        >
          Գաղտնաբառը հաջողությամբ փոփոխված է
        </h3>
      )}
    </div>
  );
}
