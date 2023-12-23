import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import { SendQuestionToSupport } from '../../Platform/ContactUsRequest';

import ContactUsIcon from '../../assets/Icons/ContactUsIcon.png';

import MyEventCalendar from '../../Components/MyEventCalendar';

import { FaFacebookF } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { ImCheckmark } from 'react-icons/im';

export default function ContactUs() {
  const { darkMode } = useGlobalContext();
  const [questionTopic, setQuestionTopic] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionTopicError, setQuestionTopicError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [sended, setSended] = useState(false);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleQuestionTopic = (e) => {
    setQuestionTopic(e);
    setQuestionTopicError(false);
  };

  const handleQuestion = (e) => {
    setQuestion(e);
    setQuestionError(false);
  };

  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substring(0, maxLength - 2) + '..';
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(null);
    const file = e.target.files;
    setSelectedFile(file[0]);
  };

  const handleSend = async () => {
    setQuestionTopicError(false);
    setQuestionError(false);
    if (!questionTopic) {
      setQuestionTopicError(true);
    }
    if (!question) {
      setQuestionError(true);
    }
    if (questionTopic && question) {
      const message = {
        name: questionTopic,
        description: question,
        file: selectedFile,
      };
      try {
        await SendQuestionToSupport(message);
        setSended(true);
        setTimeout(() => {
          setQuestionTopic(null);
          setQuestion(null);
          setSelectedFile(null);
          setSended(false);
        }, 4000);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (sended) {
      const timer = setTimeout(() => {
        setSended(false);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [sended]);

  return (
    <div className='StaffPage '>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        <div
          className={'contact-us-welcome' + (darkMode ? ' darkWelcome' : '')}
        >
          <img src={ContactUsIcon} alt='ContactUsIcon' />
          <h3>Հետադարձ Կապ</h3>
        </div>
        {!sended ? (
          <div
            className={
              'contact-us-form' + (darkMode ? ' dark-contact-us-form' : '')
            }
          >
            <input
              placeholder='Հարցի նպատակը'
              type='text'
              name='QuestionTopic'
              id='QuestionTopic'
              onChange={(e) => handleQuestionTopic(e.target.value)}
            />
            {questionTopicError ? <span>Դաշտը պարտադիր է</span> : null}
            <textarea
              placeholder='Ձեր հարցը'
              name='Question'
              id='Question'
              rows='4'
              onChange={(e) => handleQuestion(e.target.value)}
            ></textarea>
            {questionError ? <span>Դաշտը պարտադիր է</span> : null}
            <div className='contact-form-btn-sec'>
              <input
                type='file'
                id='uploadButton'
                ref={fileInputRef}
                accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                style={{ display: 'none' }}
                multiple
                onChange={handleFileChange}
              />
              {selectedFile ? (
                <button
                  className='contact-us-upload-btn'
                  onClick={handleUploadButtonClick}
                >
                  {truncateFileName(selectedFile.name, 18)}
                  <ImCheckmark />
                </button>
              ) : (
                <button
                  className='contact-us-upload-btn'
                  onClick={handleUploadButtonClick}
                >
                  Ավելացնել ֆայլ
                  <ImAttachment />
                </button>
              )}
              <div>
                <button onClick={handleSend} className='send-form-btn'>
                  Ուղղարկել
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h4
            className={
              'sended-form-message' + (darkMode ? ' whiteElement' : '')
            }
          >
            Ձեր հայտն ուղղարկված է
          </h4>
        )}
        <div className='contact-us-social-media'>
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
          <a href='https://doc2b.am/' target='_blank' rel='noopener noreferrer'>
            <FaGlobe className='icon' />
          </a>
        </div>
        <hr
          className={
            'contact-us-brake' + (darkMode ? ' dark-contact-us-brake' : '')
          }
        />
        <div
          className={
            'contact-information' +
            (darkMode ? ' dark-contact-information' : '')
          }
        >
          <ul>
            <a href='tel:+374 11 700 987'>
              <li className='numbers'>+374 11 700 987</li>
            </a>
            <a href='mailto:info.doc2b@gmail.com'>
              <li className='numbers'>info.doc2b@gmail.com</li>
            </a>
            <a
              href='https://maps.app.goo.gl/UXRtV2E395qdedNu7'
              target='_blank'
              rel='noopener noreferrer'
            >
              <li className='numbers smallAddress'> Նար-Դոս 2 փ․, Երևան</li>
            </a>
          </ul>
        </div>
      </div>
      <div className='groupedSideBlocks'>
        <div className='AddsSection adds_2'></div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
