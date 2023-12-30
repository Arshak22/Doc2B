import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import hy from 'date-fns/locale/hy';
import { useGlobalContext } from '../../Context/Context';
import Popup from 'reactjs-popup';
import MyEventCalendar from '../../Components/MyEventCalendar';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import PreLoader from '../../Components/PreLoader';

import NewActivityIcon from '../../assets/Icons/NewActivityIcon.png';
import Document from '../../assets/Images/DocumentLook.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';
import ZipFileIcon from '../../assets/Images/ZipFileIcon.png';

import { GetAllCompanies } from '../../Platform/CompanyRequests';
import { GetNewActivityTree } from '../../Platform/NewActivityRequests';
import { GetTreeTemplatesInfo } from '../../Platform/NewActivityRequests';
import { CreateDocument } from '../../Platform/NewActivityRequests';
import { GetStaffShortList } from '../../Platform/StaffShortListRequests';
import { SearchStaffShortList } from '../../Platform/StaffShortListRequests';

import { ImSearch } from 'react-icons/im';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { ImCheckmark } from 'react-icons/im';
import { ImFolderDownload } from 'react-icons/im';

registerLocale('hy', hy);
setDefaultLocale('hy');

export default function NewActivity() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [loadingCreateDocument, setLoadingCreateDocument] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [parentActivity, setParentActivity] = useState(null);
  const [path, setPath] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState(true);
  const [hasCompanies, setHasCompnaies] = useState(false);

  const [lastSelectedActivity, setLastSelectedActivity] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [selectedStaffID, setSelectedStaffID] = useState(null);

  const [activity, setActivity] = useState([]);
  const [fetchedTemplatesInfo, setFetchedTemplatesInfo] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [finalSelectedTemplates, setFinalSelectedTemplates] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [personInfo, setPersonInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [zipFile, setZipFile] = useState(null);
  const isInitialRender = useRef(true);
  const [finish, setFinish] = useState(false);

  const [staffShortList, setStaffShortList] = useState([]);

  const getCompaniesList = async () => {
    const result = await GetAllCompanies();
    if (result) {
      if (result.data.length > 1) {
        setHasCompnaies(true);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getCompaniesList();
  }, [finish]);

  const getTree = async () => {
    try {
      const result = await GetNewActivityTree();
      setActivity(result.data);
    } catch (e) {}
  };

  useEffect(() => {
    setLoadingCreateDocument(false);
    getTree();
  }, [finish]);

  const GetStaffList = async () => {
    try {
      const result = await GetStaffShortList(localStorage.getItem('companyID'));
      setStaffShortList(result.data);
    } catch (e) {}
  };

  useEffect(() => {
    GetStaffList();
  }, [finish]);

  const handleSearchShortStaffList = async (search) => {
    setInputValue(search);
    try {
      const result = await SearchStaffShortList(
        localStorage.getItem('companyID'),
        search
      );
      setStaffShortList(result.data);
    } catch (error) {}
  };

  const handleSelectStaff = (item) => {
    setSelectedStaffID(item.id);
    setInputValue(item.employer_first_name + ' ' + item.employer_last_name);
  };

  const fetchTemplatesInfo = async () => {
    try {
      const response = await GetTreeTemplatesInfo(
        selectedStaffID,
        localStorage.getItem('companyID'),
        selectedTemplates
      );
      setFinalSelectedTemplates(selectedTemplates);
      const newData = Object.keys(response.data).reduce((acc, key) => {
        acc[key] = response.data[key].value;
        return acc;
      }, {});

      setFetchedTemplatesInfo(response.data);
      setPersonInfo((prevPersonInfo) => ({
        ...prevPersonInfo,
        ...newData,
      }));
      setSelectedDates((prevSelectedDates) => ({
        ...prevSelectedDates,
        ...Object.keys(response.data).reduce((acc, key) => {
          if (response.data[key].type === 'date' && response.data[key].value) {
            acc[key] = parseISO(response.data[key].value);
          }
          return acc;
        }, {}),
      }));
    } catch (error) {}
  };

  const handleTemplatesInfo = () => {
    fetchTemplatesInfo();
  };

  useEffect(() => {
    if (selectedActivity && selectedActivity.templates) {
      const initialCheckboxStates = selectedActivity.templates.map(
        (template) => true
      );
      setCheckboxStates(initialCheckboxStates);

      const initialSelectedTemplates = selectedActivity.templates.map(
        (template) => template.id
      );
      setSelectedTemplates(initialSelectedTemplates);
    }
  }, [selectedActivity, fetchedTemplatesInfo, finish]);

  useEffect(() => {
    const anyCheckboxChecked = checkboxStates.some((state) => state);
    setAreCheckboxesChecked(anyCheckboxChecked);
  }, [checkboxStates, finish]);

  const handleActivityClick = (activity) => {
    setLastSelectedActivity(activity.id);
    setDocumentName(activity.name);
    setParentActivity(selectedActivity);
    setSelectedActivity(activity);
    generatePath(activity.name);
  };

  const handleGoBack = () => {
    if (parentActivity) {
      setPath((prevPath) => prevPath.slice(0, -1));
      setSelectedActivity(parentActivity);
      const newParentActivity = activity.find(
        (item) => item.id === parentActivity.parent
      );
      setParentActivity(newParentActivity);
    } else {
      setSelectedActivity(null);
      setPath([]);
    }
  };

  const handleGoBackToTemplates = () => {
    setFetchedTemplatesInfo(null);
  };

  const handleGoNext = () => {};

  const handleInputChange = (value, key, isDate = false) => {
    let parsedValue = value;

    if (isDate) {
      const parsedDate = new Date(value);
      parsedValue = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
    }

    setPersonInfo((prevPersonInfo) => {
      if (prevPersonInfo[key] !== parsedValue) {
        return {
          ...prevPersonInfo,
          [key]: parsedValue,
        };
      }
      return prevPersonInfo;
    });
  };

  const checkForErrors = () => {
    const newErrors = {};
    Object.keys(personInfo).forEach((key) => {
      const value = personInfo[key];

      if (value === null || value === '') {
        newErrors[key] = true;
      } else {
        newErrors[key] = false;
      }
    });
    setErrors(newErrors);
  };

  useEffect(() => {
    if (!isInitialRender.current) {
      handleSendDocInfo();
    } else {
      isInitialRender.current = false;
    }
  }, [errors]);

  const handleSendDocInfo = async () => {
    setLoadingCreateDocument(true);
    let hasError = false;
    Object.keys(errors).forEach((key) => {
      if (errors[key] === true) {
        hasError = true;
        return;
      }
    });
    if (!hasError) {
      try {
        const data = {
          form_data: personInfo,
          template_ids: finalSelectedTemplates,
          action_id: lastSelectedActivity,
        };
        const response = await CreateDocument(
          localStorage.getItem('companyID'),
          selectedStaffID,
          data
        );
        setLoadingCreateDocument(false);
        console.log(response.data);
        const blob = new Blob([response.data], { type: 'application/zip' });
        setZipFile(blob);
      } catch (error) {}
    }
  };

  const handleClick = () => {
    checkForErrors();
  };

  const handleDownloadZipFile = () => {
    if (zipFile instanceof Blob) {
      const url = window.URL.createObjectURL(zipFile);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${documentName}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const renderActivities = (activities) => {
    return activities.map((activity) => (
      <div
        className={'activityOption' + (darkMode ? ' darkInpt' : '')}
        key={activity.id}
        onClick={() => handleActivityClick(activity)}
      >
        {activity.name}
      </div>
    ));
  };

  const generatePath = (activity) => {
    setPath((prevPath) => [...prevPath, activity]);
  };

  const handleFinish = () => {
    setLoading(true);
    setSelectedActivity(null);
    setParentActivity(null);
    setPath([]);
    setCheckboxStates([]);
    setAreCheckboxesChecked(true);
    setHasCompnaies(true);
    setActivity([]);
    setFetchedTemplatesInfo(null);
    setSelectedTemplates([]);
    setSelectedDates({});
    setPersonInfo({});
    setZipFile(null);
    setFinish(!finish);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const renderActivityOptions = () => {
    if (zipFile) {
      return (
        <div>
          <h3
            className={
              'selected-activity-name' + (darkMode ? ' whiteElement' : '')
            }
          >
            Ձեր փաստաթուղթը
          </h3>
          <div>
            <ul>
              <li
                className={`template zipFileBlock ${
                  darkMode ? ' darkInpt' : ''
                }`}
              >
                <div className='template-name-block'>
                  <img src={ZipFileIcon} alt='ZipFileIcon' />
                  <h5
                    className={darkMode ? 'filename whiteElement' : 'filename'}
                  >
                    {documentName}
                  </h5>
                </div>
                <div className='template-action-btns'>
                  <ImFolderDownload
                    className='look-template'
                    onClick={handleDownloadZipFile}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className='activity-step-buttons'>
            <button className={`prev-btn next-btn`} onClick={handleFinish}>
              Ավարտել
            </button>
          </div>
        </div>
      );
    } else if (!selectedActivity) {
      return renderActivities(activity.slice(0, 3));
    } else if (fetchedTemplatesInfo) {
      const jsxElements = Object.keys(fetchedTemplatesInfo).map((key) => (
        <div className={'templateInfoSection'} key={key}>
          <div>
            {fetchedTemplatesInfo[key].type === 'date' ? (
              <>
                <label htmlFor={key}>{fetchedTemplatesInfo[key].label}</label>
                <DatePicker
                  dateFormat='dd/MM/yyyy'
                  locale='hy'
                  name={key}
                  id={key}
                  placeholderText={'օր/ամիս/տարի'}
                  value={
                    selectedDates[key]
                      ? selectedDates[key]
                      : fetchedTemplatesInfo[key] &&
                        fetchedTemplatesInfo[key].value
                      ? parseISO(fetchedTemplatesInfo[key].value)
                      : ''
                  }
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors[key] ? 'inptError' : ''
                  }`}
                  selected={selectedDates[key]}
                  onChange={(date) => {
                    if (date !== null) {
                      setSelectedDates((prevSelectedDates) => ({
                        ...prevSelectedDates,
                        [key]: date,
                      }));
                      handleInputChange(date, key, true);
                    }
                  }}
                />
              </>
            ) : fetchedTemplatesInfo[key].type === 'choice' ? (
              <div>
                <label htmlFor={key}>{fetchedTemplatesInfo[key].label}</label>
                <select
                  name={key}
                  id={key}
                  defaultValue={fetchedTemplatesInfo[key].choices[0]}
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors[key] ? 'inptError' : ''
                  }`}
                  onChange={(event) =>
                    handleInputChange(event.target.value, key)
                  }
                >
                  {fetchedTemplatesInfo[key].choices.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <>
                <label htmlFor={key}>{fetchedTemplatesInfo[key].label}</label>
                <input
                  type={
                    fetchedTemplatesInfo[key].type === 'integer'
                      ? 'number'
                      : fetchedTemplatesInfo[key].type === 'time'
                      ? 'time'
                      : 'text'
                  }
                  name={key}
                  id={key}
                  defaultValue={fetchedTemplatesInfo[key].value}
                  className={`${darkMode ? 'darkInpt' : ''} ${
                    errors[key] ? 'inptError' : ''
                  }`}
                  onChange={(event) =>
                    handleInputChange(event.target.value, key)
                  }
                />
              </>
            )}
          </div>
        </div>
      ));
      return (
        <>
          <div
            className={
              'info-from-template' +
              (Object.keys(fetchedTemplatesInfo).length <= 7
                ? ' info-from-template-small'
                : '')
            }
          >
            {jsxElements}
          </div>
          <div className='activity-step-buttons'>
            <button className='prev-btn' onClick={handleGoBackToTemplates}>
              <MdKeyboardArrowLeft />
              Նախորդը
            </button>
            {selectedActivity.templates &&
            selectedActivity.templates.length !== 0 ? (
              <button
                className={`prev-btn next-btn create-doc-btn ${
                  areCheckboxesChecked ? '' : 'cant-go-next'
                }`}
                onClick={handleClick}
              >
                Հաստատել
                {!loadingCreateDocument ? <ImCheckmark /> : <div class='circle'></div>}
              </button>
            ) : null}
          </div>
        </>
      );
    } else {
      return (
        <div>
          {selectedActivity && (
            <h3
              className={
                'selected-activity-name' + (darkMode ? ' whiteElement' : '')
              }
            >
              {selectedActivity.name}
            </h3>
          )}
          {selectedActivity.templates &&
          selectedActivity.templates.length === 0 ? (
            renderActivities(selectedActivity.children)
          ) : (
            <div className={'template-list' + (selectedActivity.templates.length < 3 ? ' small-template-list' : '')}>
              <ul>
                {selectedActivity.templates.map((template, index) => (
                  <li
                    key={template.id}
                    className={`template${
                      (!checkboxStates[index] && ' unchecked-template') || ''
                    }${darkMode ? ' darkInpt' : ''}`}
                  >
                    <div className='template-name-block'>
                      <a
                        href={template.pdf}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src={Document} alt='Document' />
                      </a>
                      <a
                        href={template.pdf}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <h5 className={darkMode ? ' whiteElement' : ''}>
                          {template.name}
                        </h5>
                      </a>
                    </div>
                    <div className='template-action-btns'>
                      <input
                        className='template-check'
                        type='checkbox'
                        value='selected'
                        defaultChecked
                        onChange={() =>
                          handleCheckboxChange(index, template.id)
                        }
                      />
                      <a
                        href={template.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <FaEye className='look-template' />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='activity-step-buttons'>
            <button className='prev-btn' onClick={handleGoBack}>
              <MdKeyboardArrowLeft />
              Նախորդը
            </button>
            {selectedActivity.templates &&
            selectedActivity.templates.length !== 0 ? (
              <button
                className={`prev-btn next-btn ${
                  areCheckboxesChecked ? '' : 'cant-go-next'
                }`}
                onClick={() => {
                  if (areCheckboxesChecked) {
                    handleGoNext();
                    handleTemplatesInfo();
                  }
                }}
              >
                Հաջորդը
                <MdKeyboardArrowRight />
              </button>
            ) : null}
          </div>
        </div>
      );
    }
  };

  const handleCheckboxChange = (index, templateId) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
    const updatedSelectedTemplates = [...selectedTemplates];

    if (newCheckboxStates[index]) {
      updatedSelectedTemplates.push(templateId);
    } else {
      const templateIndex = updatedSelectedTemplates.indexOf(templateId);
      if (templateIndex !== -1) {
        updatedSelectedTemplates.splice(templateIndex, 1);
      }
    }
    setSelectedTemplates(updatedSelectedTemplates);
  };

  const renderPath = () => {
    if (selectedActivity) {
      return (
        <div className='activity-path'>
          {path.map((activity, index) => (
            <React.Fragment key={index}>
              <h5 className={darkMode ? ' whiteElement' : ''}>{activity}</h5>
              {index < path.length - 1 && (
                <MdKeyboardArrowRight
                  className={darkMode ? ' whiteElement' : ''}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }
    return <div className='activity-path'></div>;
  };

  return (
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {loading ? (
          <PreLoader />
        ) : hasCompanies ? (
          <>
            <div
              className={
                'contact-us-welcome activityWelcome' +
                (darkMode ? ' darkWelcome' : '')
              }
            >
              <img src={NewActivityIcon} alt='NewActivityIcon' />
              <h3>Կատարել Գործողություն</h3>
            </div>
            {activity.length > 0 ? (
              <>
                <div className='activity-path-search-panel'>
                  {renderPath()}
                  <div className='short-staff-search-bar'>
                    <input
                      type='text'
                      placeholder='Ընտրել աշխատողին'
                      name='Փնտրել'
                      value={inputValue}
                      className={
                        'inpts headerInpt activitySearchBar' +
                        (darkMode ? ' darkInpt' : '')
                      }
                      onChange={(e) =>
                        handleSearchShortStaffList(e.target.value)
                      }
                    />
                    <ImSearch
                      className={
                        'passwordIcon searchIcon activitySearch' +
                        (darkMode ? ' whiteIcon' : '')
                      }
                    />
                    {staffShortList.length > 0 ? (
                      <div
                        className={
                          'staff-short-list' + (darkMode ? ' darkDropDown' : '')
                        }
                      >
                        <ul>
                          {staffShortList.map((item, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  onClick={() => handleSelectStaff(item)}
                                >
                                  {item.position_name ? (
                                    <h3
                                      className={
                                        darkMode ? ' whiteElement' : ''
                                      }
                                    >
                                      {item.position_name}
                                    </h3>
                                  ) : null}
                                  <h3
                                    className={darkMode ? ' whiteElement' : ''}
                                  >
                                    {item.employer_first_name}{' '}
                                    {item.employer_last_name}
                                  </h3>
                                </li>
                                <hr
                                  className={
                                    darkMode
                                      ? 'shortStaffDivider darkLine'
                                      : 'shortStaffDivider'
                                  }
                                />
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='activities-options'>
                  {renderActivityOptions()}
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className='no-staff-content'>
            <div className='welcome-section'>
              <h5>Դուք դեռ չունեք</h5>
              <h3 className={darkMode ? ' whiteElement' : ''}>
                Կազմակերպություն
              </h3>
            </div>
            <div
              className={
                'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
              }
            >
              <img src={CaseIcon} alt='CaseIcon' />
              <h5>
                Ավելացրեք կազմակերպություն, որպեսզի սկսեք ձեր աշխատանքը
                համակարգում
              </h5>
            </div>
            <Popup
              trigger={
                <div>
                  <button className='welcome-btn'>Ավելացնել</button>
                </div>
              }
              position='top center'
              onOpen={() => setPopUpOpen(true)}
              onClose={() => setPopUpOpen(false)}
            >
              {(close) => <AddCompanyPopUp darkMode={darkMode} close={close} />}
            </Popup>
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
