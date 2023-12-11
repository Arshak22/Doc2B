import { React, useState, useRef } from 'react';

import StaffAvatar from '../../assets/Images/StaffAvatar.png';

import { RxCross2 } from 'react-icons/rx';
import { HiCamera } from 'react-icons/hi';

import { AddNewCompany } from '../../Platform/CompanyRequests';

export default function AddCompanyPopUp({ darkMode, close }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({
    companyName: null,
    directorName: null,
    directorSurname: null,
    directorFathersName: null,
    directorPositionOption: 'Տնօրեն',
    otherDirectorPosition: null,
    HVHHNumber: null,
    businessCountry: null,
    businessCity: null,
    businessAddress: null,
    legalCountry: null,
    legalCity: null,
    legalAddress: null,
    telephone: null,
    email: null,
    petRegisterNumber: null,
    legalTypeOption: 'ՍՊԸ',
    otherLegalType: null,
  });

  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  const ImageInputRef = useRef(null);

  const avatarStyle = {
    backgroundImage: selectedImage
      ? `url(${selectedImage})`
      : `url(${StaffAvatar})`,
    backgroundSize: selectedImage ? 'contain' : '50%',
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

  const handleInputChange = (e, inputName) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: e.target.value,
    }));
  };

  const handleDirectorPositionOptionChange = (e) => {
    const value = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      directorPositionOption: value,
      otherDirectorPosition:
        value === 'Այլ' ? prevInputs.otherDirectorPosition : '',
    }));
  };

  const handleLegalTypeOptionChange = (e) => {
    const value = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      legalTypeOption: value,
      otherLegalType: value === 'Այլ' ? prevInputs.otherLegalType : '',
    }));
  };

  const handleSubmit = async () => {
    setErrors({});

    const requiredFields = [
      'companyName',
      'directorName',
      'directorSurname',
      'directorFathersName',
      'HVHHNumber',
      // 'businessCountry',
      // 'businessCity',
      // 'businessAddress',
      // 'legalCountry',
      // 'legalCity',
      // 'legalAddress',
      // 'telephone',
      // 'email',
      'petRegisterNumber',
    ];

    const newInputs = { ...inputs };
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newInputs[field]) {
        newErrors[field] = 'Դաշտը պարտադիր է';
      }
    });

    if (
      newInputs.directorPositionOption === 'Այլ' &&
      !newInputs.otherDirectorPosition
    ) {
      newErrors.otherDirectorPosition = 'Դաշտը պարտադիր է';
    }

    if (newInputs.legalTypeOption === 'Այլ' && !newInputs.otherLegalType) {
      newErrors.otherLegalType = 'Դաշտը պարտադիր է';
    }

    const isValidHVHHNumber =
      /^\d+$/.test(newInputs.HVHHNumber) && newInputs.HVHHNumber.length >= 8;
    if (!isValidHVHHNumber) {
      newErrors.HVHHNumber = '8 թիվ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const company = {
        company_name: newInputs.companyName,
        company_director_first_name: newInputs.directorName,
        company_director_last_name: newInputs.directorSurname,
        company_director_middle_name: newInputs.directorFathersName,
        company_director_position: newInputs.otherDirectorPosition
          ? newInputs.otherDirectorPosition
          : newInputs.directorPositionOption,
        company_type: newInputs.otherLegalType
          ? newInputs.otherLegalType
          : newInputs.legalTypeOption,
        company_tax_code: newInputs.HVHHNumber,
        company_phone_number: newInputs.telephone,
        company_mail: newInputs.email,
        company_gov_register: newInputs.petRegisterNumber,
        company_gov_register_address: (newInputs.legalCountry && newInputs.legalCity && newInputs.legalAddress) ? `${newInputs.legalCountry} ${newInputs.legalCity} ${newInputs.legalAddress}` : null,
        company_live_address: `${newInputs.businessCountry} ${newInputs.businessCity} ${newInputs.businessAddress}`,
        company_image: selectedImage,
      };
      await AddNewCompany(company);
      setSubmited(true);
      setSelectedImage(null);
    }
  };

  return (
    <div
      className={
        'AddPopUp AddCompanyPopUp' + (darkMode ? ' Dark DarkPopUp' : '')
      }
    >
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
                    <label htmlFor='CompanyName'>
                      Կազմակերպության անվանում
                    </label>
                    <input
                      type='text'
                      name='CompanyName'
                      id='CompanyName'
                      className={`${darkMode ? 'darkInpt' : ''} ${
                        errors.companyName ? 'inptError' : ''
                      }`}
                      onChange={(e) => handleInputChange(e, 'companyName')}
                    />
                  </div>
                </div>
                <div className='singleStaffRow InputsRow DirectorSec'>
                  <div
                    className={
                      'staffInputSec DirectorNameSec editStaffInputSec'
                    }
                  >
                    <label htmlFor='DirectorName'>
                      Կազմակերպության ղեկավար
                    </label>
                    <div className='staffInputSec NameInptSec'>
                      <div>
                        <label htmlFor='Name'>Անուն</label>
                        <input
                          type='text'
                          name='Name'
                          id='Name'
                          className={`${darkMode ? 'darkInpt' : ''} ${
                            errors.directorName ? 'inptError' : ''
                          }`}
                          onChange={(e) => handleInputChange(e, 'directorName')}
                        />
                      </div>
                      <div>
                        <label htmlFor='Surname'>Ազգանուն</label>
                        <input
                          type='text'
                          name='Surname'
                          id='Surname'
                          className={`${darkMode ? 'darkInpt' : ''} ${
                            errors.directorSurname ? 'inptError' : ''
                          }`}
                          onChange={(e) =>
                            handleInputChange(e, 'directorSurname')
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor='FatersName'>Հայրանուն</label>
                        <input
                          type='text'
                          name='FatersName'
                          id='FatersName'
                          className={`${darkMode ? 'darkInpt' : ''} ${
                            errors.directorFathersName ? 'inptError' : ''
                          }`}
                          onChange={(e) =>
                            handleInputChange(e, 'directorFathersName')
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={'staffInputSec editStaffInputSec'}>
                    <label htmlFor='DirectorPosition'>Ղեկավարի պաշտոնը</label>
                    <div className='staffInputSec RoleInptSec'>
                      <select
                        name='DirectorPosition'
                        id='DirectorPosition'
                        onChange={handleDirectorPositionOptionChange}
                        className={darkMode ? ' darkInpt' : ''}
                      >
                        <option value='Տնօրեն'>Տնօրեն</option>
                        <option value='Նախագահ'>Նախագահ</option>
                        <option value='Հիմնադիր'>Հիմնադիր</option>
                        <option value='Այլ'>Այլ</option>
                      </select>
                    </div>

                    {inputs.directorPositionOption === 'Այլ' && (
                      <div
                        className={
                          'staffInputSec editStaffInputSec otherInputSec'
                        }
                      >
                        <label htmlFor='OtherPosition'>Նշել պաշտոնը</label>
                        <input
                          type='text'
                          name='OtherPosition'
                          id='OtherPosition'
                          className={`${darkMode ? 'darkInpt' : ''} ${
                            errors.otherDirectorPosition ? 'inptError' : ''
                          }`}
                          onChange={(e) =>
                            handleInputChange(e, 'otherDirectorPosition')
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='HVHHNumber'>ՀՎՀՀ</label>
              <input
                type='text'
                name='HVHHNumber'
                id='HVHHNumber'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.HVHHNumber ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'HVHHNumber')}
              />
            </div>
          </div>
          <h2 className='labelLike'>Գործունեության հասցե</h2>
          <div className='singleStaffRow InputsRow AddresswithHeadline'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='BusinessCountry'>Երկիր</label>
              <input
                type='text'
                name='BusinessCountry'
                id='BusinessCountry'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.businessCountry ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'businessCountry')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='BusinessCity'>Քաղաք</label>
              <input
                type='text'
                name='BusinessCity'
                id='BusinessCity'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.businessCity ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'businessCity')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='BusinessAddress'>Հասցե</label>
              <input
                type='text'
                name='BusinessAddress'
                id='BusinessAddress'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.businessAddress ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'businessAddress')}
              />
            </div>
          </div>
          <h2 className='labelLike'>Իրավաբանական հասցե</h2>
          <div className='singleStaffRow InputsRow AddresswithHeadline'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='LegalCountry'>Երկիր</label>
              <input
                type='text'
                name='LegalCountry'
                id='LegalCountry'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.legalCountry ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'legalCountry')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='LegalCity'>Քաղաք</label>
              <input
                type='text'
                name='LegalCity'
                id='LegalCity'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.legalCity ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'legalCity')}
              />
            </div>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='LegalAddress'>Հասցե</label>
              <input
                type='text'
                name='LegalAddress'
                id='LegalAddress'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.legalAddress ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'legalAddress')}
              />
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
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
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='PetRegisterNumber'>
                Պետ Ռեգիստրի գրանցման համար
              </label>
              <input
                type='text'
                name='PetRegisterNumber'
                id='PetRegisterNumber'
                className={`${darkMode ? 'darkInpt' : ''} ${
                  errors.petRegisterNumber ? 'inptError' : ''
                }`}
                onChange={(e) => handleInputChange(e, 'petRegisterNumber')}
              />
            </div>
          </div>
          <div className='singleStaffRow InputsRow'>
            <div className={'staffInputSec editStaffInputSec'}>
              <label htmlFor='LegalType'>Կազմակերպաիրավական տեսակը</label>
              <div className='staffInputSec RoleInptSec'>
                <select
                  name='LegalType'
                  id='LegalType'
                  onChange={handleLegalTypeOptionChange}
                  className={darkMode ? ' darkInpt' : ''}
                >
                  <option value='ՍՊԸ '>ՍՊԸ</option>
                  <option value='ԱՁ'>ԱՁ</option>
                  <option value='ՓԲԸ'>ՓԲԸ</option>
                  <option value='ՀՈԱԿ'>ՀՈԱԿ</option>
                  <option value='ՊՈԱԿ'>ՊՈԱԿ</option>
                  <option value='ԲԲԸ'>ԲԲԸ</option>
                  <option value='Հիմնադրամ'>Հիմնադրամ</option>
                  <option value='ՀԿ'>ՀԿ</option>
                  <option value='Այլ'>Այլ</option>
                </select>
              </div>
            </div>
            {inputs.legalTypeOption === 'Այլ' && (
              <div className={'staffInputSec editStaffInputSec'}>
                <label htmlFor='OtherLegalType'>Նշել տեսակը</label>
                <input
                  type='text'
                  name='OtherLegalType'
                  id='OtherLegalType'
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors.otherLegalType ? 'inptError' : ''
                  }`}
                  onChange={(e) => handleInputChange(e, 'otherLegalType')}
                />
              </div>
            )}
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
          Կազմակերպությունն ավելացված է
        </h3>
      )}
    </div>
  );
}
