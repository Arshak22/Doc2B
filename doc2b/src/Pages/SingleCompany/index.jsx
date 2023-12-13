import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import MyEventCalendar from '../../Components/MyEventCalendar';
import CompanyAvatar from '../../assets/Images/CompanyAvatar.png';

import PreLoader from '../../Components/PreLoader';

import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { ImCross } from 'react-icons/im';
import { HiCamera } from 'react-icons/hi';

import {
  GetSingleCompany,
  UpdateCompanyInfo,
  DeleteCompnay,
} from '../../Platform/CompanyRequests';

export default function SingleComany() {
  const { darkMode } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState({
    company_image: '',
    company_name: '',
    company_director_first_name: '',
    company_director_last_name: '',
    company_director_middle_name: '',
    company_director_position: '',
    company_type: '',
    company_tax_code: '',
    company_phone_number: '',
    company_mail: '',
    company_gov_register: '',
    company_gov_register_address: '',
    company_live_address: '',
    legalCountry: '',
    legalCity: '',
    legalAddress: '',
    businessCountry: '',
    businessCity: '',
    businessAddress: '',
  });

  const [company, setCompany] = useState({});

  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDirectorPositionOption, setDirectorPositionOption] =
    useState('');
  const [selectedLegalTypeOption, setSelectedLegalTypeOption] = useState('');

  const ImageInputRef = useRef(null);

  const getCompanyInfo = async (id) => {
    try {
      const result = await GetSingleCompany(id);
      if (result) {
        setCompany(result.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        const govRegisterAddressWords =
          result.data.company_gov_register_address.split(' ');
        setInputs((prevInputs) => ({
          ...prevInputs,
          ...result.data,
          legalCountry: govRegisterAddressWords[0] || '',
          legalCity: govRegisterAddressWords[1] || '',
          legalAddress: govRegisterAddressWords.slice(2).join(' ') || '',
        }));

        // Extracting information from company_live_address
        const liveAddressWords = result.data.company_live_address.split(' ');
        setInputs((prevInputs) => ({
          ...prevInputs,
          ...result.data,
          businessCountry: liveAddressWords[0] || '',
          businessCity: liveAddressWords[1] || '',
          businessAddress: liveAddressWords.slice(2).join(' ') || '',
        }));
      }
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    getCompanyInfo(id);
  }, [editMode]);

  const handleInputChange = (e, inputName) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: e.target.value,
    }));
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
    setSelectedLegalTypeOption('');
    setDirectorPositionOption('');
  };

  const handleDirectorPositionOptionChange = (e) => {
    const value = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      company_director_position: value,
    }));
    setDirectorPositionOption(value);
  };

  const handleLegalTypeOptionChange = (e) => {
    const value = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      company_type: value,
    }));
    setSelectedLegalTypeOption(value);
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

  const handleSubmit = async () => {
    const company = {
      company_name: inputs.company_name,
      company_director_first_name: inputs.company_director_first_name,
      company_director_last_name: inputs.company_director_last_name,
      company_director_middle_name: inputs.company_director_middle_name,
      company_director_position: inputs.company_director_position,
      company_type: inputs.company_type,
      company_tax_code: inputs.company_tax_code,
      company_phone_number: inputs.company_phone_number,
      company_mail: inputs.company_mail,
      company_gov_register: inputs.company_gov_register,
      company_gov_register_address: `${inputs.legalCountry} ${inputs.legalCity} ${inputs.legalAddress}`,
      company_live_address: `${inputs.businessCountry} ${inputs.businessCity} ${inputs.businessAddress}`,
      company_image: selectedImage ? selectedImage : inputs.company_image,
    };
    try {
      await UpdateCompanyInfo(id, company);
      setEditMode(false);
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await DeleteCompnay(id);
      setDeleteError('Կազմակերպությունը հաջողությամբ ջնջված է');
    } catch (error) {
      setDeleteError('Դուք չեք կարող ջնջել այս կազմակերպությունը');
    }
  };

  const closeEdit = () => {
    setEditMode(false);
    const clearedInputes = {
      company_image: '',
      company_name: '',
      company_director_first_name: '',
      company_director_last_name: '',
      company_director_middle_name: '',
      company_director_position: '',
      company_type: '',
      company_tax_code: '',
      company_phone_number: '',
      company_mail: '',
      company_gov_register: '',
      company_gov_register_address: '',
      company_live_address: '',
      legalCountry: '',
      legalCity: '',
      legalAddress: '',
      businessCountry: '',
      businessCity: '',
      businessAddress: '',
    };
    setInputs(clearedInputes);
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
                      company && company.company_image
                        ? {
                            backgroundImage: `url(${company.company_image})`,
                            backgroundSize: 'contain',
                          }
                        : {
                            backgroundImage: `url(${CompanyAvatar})`,
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
                      company && company.company_image
                        ? {
                            backgroundImage: `url(${company.company_image})`,
                            backgroundSize: 'contain',
                          }
                        : {
                            backgroundImage: `url(${CompanyAvatar})`,
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
                      {company.company_name}
                    </h2>
                  ) : (
                    <div className='staffInputSec NameInptSec'>
                      <div>
                        <label htmlFor='CompanyName'>
                          Կազմակերպության անվանում
                        </label>
                        <input
                          type='text'
                          name='CompanyName'
                          id='CompanyName'
                          defaultValue={company.company_name}
                          className={darkMode ? ' darkInpt' : ''}
                          onChange={(e) => handleInputChange(e, 'company_name')}
                        />
                      </div>
                    </div>
                  )}
                  <div className='singleStaffRow InputsRow DirectorSec'>
                    <div
                      className={
                        'staffInputSec DirectorNameSec' +
                        (editMode ? ' editStaffInputSec' : '')
                      }
                    >
                      <label
                        htmlFor='DirectorName'
                        className={editMode ? 'companyLeaderLabel' : null}
                      >
                        Կազմակերպության ղեկավար
                      </label>
                      {!editMode ? (
                        <h3 className={darkMode ? ' whiteElement' : ''}>
                          {company.company_director_first_name}{' '}
                          {company.company_director_last_name}{' '}
                          {company.company_director_middle_name}
                        </h3>
                      ) : (
                        <div className='staffInputSec NameInptSec'>
                          <div>
                            <label htmlFor='Name'>Անուն</label>
                            <input
                              type='text'
                              name='Name'
                              id='Name'
                              defaultValue={company.company_director_first_name}
                              className={darkMode ? ' darkInpt' : ''}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  'company_director_first_name'
                                )
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor='Surname'>Ազգանուն</label>
                            <input
                              type='text'
                              name='Surname'
                              id='Surname'
                              defaultValue={company.company_director_last_name}
                              className={darkMode ? ' darkInpt' : ''}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  'company_director_last_name'
                                )
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor='FatersName'>Հայրանուն</label>
                            <input
                              type='text'
                              name='FatersName'
                              id='FatersName'
                              defaultValue={
                                company.company_director_middle_name
                              }
                              className={darkMode ? ' darkInpt' : ''}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  'company_director_middle_name'
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={
                        'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                      }
                    >
                      <label htmlFor='DirectorPosition'>Ղեկավարի պաշտոնը</label>
                      {!editMode ? (
                        <h3 className={darkMode ? ' whiteElement' : ''}>
                          {company.company_director_position}
                        </h3>
                      ) : (
                        <div className='staffInputSec RoleInptSec'>
                          <select
                            name='DirectorPosition'
                            id='DirectorPosition'
                            onChange={handleDirectorPositionOptionChange}
                            defaultValue={company.company_director_position}
                            className={darkMode ? ' darkInpt' : ''}
                          >
                            <option value='Տնօրեն'>Տնօրեն</option>
                            <option value='Նախագահ'>Նախագահ</option>
                            <option value='Հիմնադիր'>Հիմնադիր</option>
                            <option value='Այլ'>Այլ</option>
                          </select>
                        </div>
                      )}
                      {selectedDirectorPositionOption === 'Այլ' && editMode && (
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
                            className={darkMode ? ' darkInpt' : ''}
                            onChange={(e) =>
                              handleInputChange(e, 'company_director_position')
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
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
                    <button
                      className='cancel-staff-edit'
                      onClick={closeEdit}
                    >
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
                <label htmlFor='HVHHNumber'>ՀՎՀՀ</label>
                {!editMode ? (
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {company.company_tax_code}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='HVHHNumber'
                    id='HVHHNumber'
                    defaultValue={company.company_tax_code}
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'company_tax_code')}
                  />
                )}
              </div>
            </div>
            <h2 className='labelLike'>Գործունեության հասցե</h2>
            <div className='singleStaffRow InputsRow AddresswithHeadline'>
              <div
                className={
                  'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='BusinessCountry'>Երկիր</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_live_address &&
                      parseAddress(company.company_live_address).country}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='BusinessCountry'
                    id='BusinessCountry'
                    defaultValue={
                      parseAddress(company.company_live_address).country
                    }
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'businessCountry')}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='BusinessCity'>Քաղաք</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_live_address &&
                      parseAddress(company.company_live_address).city}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='BusinessCity'
                    id='BusinessCity'
                    defaultValue={
                      parseAddress(company.company_live_address).city
                    }
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'businessCity')}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='BusinessAddress'>Հասցե</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_live_address &&
                      parseAddress(company.company_live_address).address}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='BusinessAddress'
                    id='BusinessAddress'
                    defaultValue={
                      parseAddress(company.company_live_address).address
                    }
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'businessAddress')}
                  />
                )}
              </div>
            </div>
            <h2 className='labelLike'>Իրավաբանական հասցե</h2>
            <div className='singleStaffRow InputsRow AddresswithHeadline'>
              <div
                className={
                  'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='LegalCountry'>Երկիր</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_gov_register_address &&
                      parseAddress(company.company_gov_register_address)
                        .country}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='LegalCountry'
                    id='LegalCountry'
                    defaultValue={
                      parseAddress(company.company_gov_register_address).country
                    }
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'legalCountry')}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='LegalCity'>Քաղաք</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_gov_register_address &&
                      parseAddress(company.company_gov_register_address).city}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='LegalCity'
                    id='LegalCity'
                    defaultValue={
                      parseAddress(company.company_gov_register_address).city
                    }
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'legalCity')}
                  />
                )}
              </div>
              <div
                className={
                  'staffInputSec' + (editMode ? ' editStaffInputSec' : '')
                }
              >
                <label htmlFor='LegalAddress'>Հասցե</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_gov_register_address &&
                      parseAddress(company.company_gov_register_address)
                        .address}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='LegalAddress'
                    id='LegalAddress'
                    defaultValue={
                      parseAddress(company.company_gov_register_address).address
                    }
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'legalAddress')}
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
                <label htmlFor='Telephone'>Հեռ․</label>
                {!editMode ? (
                  <a href={'tel:' + company.company_phone_number}>
                    <h3
                      className={'numbers' + (darkMode ? ' whiteElement' : '')}
                    >
                      {company.company_phone_number}
                    </h3>
                  </a>
                ) : (
                  <input
                    type='tel'
                    name='Telephone'
                    id='Telephone'
                    defaultValue={company.company_phone_number}
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) =>
                      handleInputChange(e, 'company_phone_number')
                    }
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
                  <a href={'mailto:' + company.company_mail}>
                    <h3
                      className={'numbers' + (darkMode ? ' whiteElement' : '')}
                    >
                      {company.company_mail}
                    </h3>
                  </a>
                ) : (
                  <input
                    type='email'
                    name='Email'
                    id='Email'
                    defaultValue={company.company_mail}
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'company_mail')}
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
                <label htmlFor='PetRegisterNumber'>
                  Պետ Ռեգիստրի գրանցման համար
                </label>
                {!editMode ? (
                  <h3 className={'numbers' + (darkMode ? ' whiteElement' : '')}>
                    {company.company_gov_register}
                  </h3>
                ) : (
                  <input
                    type='text'
                    name='PetRegisterNumber'
                    id='PetRegisterNumber'
                    defaultValue={company.company_gov_register}
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) =>
                      handleInputChange(e, 'company_gov_register')
                    }
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
                <label htmlFor='LegalType'>Կազմակերպաիրավական տեսակը</label>
                {!editMode ? (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {company.company_type}
                  </h3>
                ) : (
                  <div className='staffInputSec RoleInptSec'>
                    <select
                      name='LegalType'
                      id='LegalType'
                      onChange={handleLegalTypeOptionChange}
                      defaultValue={company.company_type}
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
                )}
              </div>
              {selectedLegalTypeOption === 'Այլ' && editMode && (
                <div className={'staffInputSec editStaffInputSec'}>
                  <label htmlFor='OtherLegalType'>Նշել տեսակը</label>
                  <input
                    type='text'
                    name='OtherLegalType'
                    id='OtherLegalType'
                    className={darkMode ? ' darkInpt' : ''}
                    onChange={(e) => handleInputChange(e, 'company_type')}
                  />
                </div>
              )}
              {editMode ? (
                <div style={{ position: 'relative', top: '7px' }}>
                  <button
                    className='delete-button'
                    onClick={() => setOpenDelete(true)}
                  >
                    Ջնջել
                  </button>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <div className='delete-confirm-section'>
            <h3 className={darkMode ? ' whiteElement' : ''}>
              {!deleteError
                ? 'Ցանկանու՞մ եք ջնջել տվյալ կազմակերպությունը'
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
