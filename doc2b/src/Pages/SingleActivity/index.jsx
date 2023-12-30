import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useGlobalContext } from '../../Context/Context';

import PreLoader from '../../Components/PreLoader';
import MyEventCalendar from '../../Components/MyEventCalendar';

import {
  GetSingleActivity,
  DeleteActivity,
  DownloadDocuments,
} from '../../Platform/ActivityRequest';

import DocumentIcon from '../../assets/Images/Document.png';
import Document from '../../assets/Images/DocumentLook.png';

import { ImFolderDownload } from 'react-icons/im';
import { ImCross } from 'react-icons/im';

export default function SingleActivity() {
  const { darkMode } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 2) + '..';
    }
  };

  const [activity, setActivity] = useState({});

  // let activity = {
  //   name: 'Գործողության անվանումը',
  //   person: 'Անուն Ազգանուն',
  //   date: '13 Հուլ 2023',
  //   status: 'Ընթացքի փուլում',
  //   documents: [
  //     {
  //       document_name: 'Փաստաթուղթ.pdf',
  //       doc_link:
  //         'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
  //       pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf',
  //     },
  //     {
  //       document_name: 'Փաստաթուղթ.pdf',
  //       doc_link:
  //         'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
  //       pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf',
  //     },
  //     {
  //       document_name: 'Փաստաթուղթ.pdf',
  //       doc_link:
  //         'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
  //       pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf',
  //     },
  //     {
  //       document_name: 'Փաստաթուղթ.pdf',
  //       doc_link:
  //         'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
  //       pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf',
  //     },
  //     {
  //       document_name: 'Փաստաթուղթ.pdf',
  //       doc_link:
  //         'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
  //       pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf',
  //     },
  //     {
  //       document_name: 'Փաստաթուղթ.pdf',
  //       doc_link:
  //         'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
  //       pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf',
  //     },
  //   ],
  // };

  const getActivityInfo = async () => {
    try {
      const result = await GetSingleActivity(
        id,
        localStorage.getItem('companyID')
      );
      setTimeout(() => {
        setLoading(false);
      }, 500);
      console.log(result.data);
      setActivity(result.data);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    getActivityInfo();
  }, []);

  // const dateParts = activity.date.split(' ');
  // const day = dateParts[0];
  // const month = dateParts[1];
  // const year = dateParts[2];

  const handleDelete = async () => {
    try {
      await DeleteActivity(id, localStorage.getItem('companyID'));
      setDeleteError('Փաստաթուղթը հաջողությամբ ջնջված է');
    } catch (error) {
      setDeleteError('Դուք չեք կարող ջնջել այս փաստաթուղթը');
    }
  };

  return (
    <div className='StaffPage'>
      <div className={'LeftBlockSection' + (darkMode ? ' Dark' : '')}>
        {loading ? (
          <PreLoader />
        ) : !openDelete ? (
          <>
            <div className='DocumentInfo'>
              <img src={Document} alt='DocumentIcon' />
              <div>
                <h2 className={darkMode ? ' whiteElement' : ''}>
                  {activity.name}
                </h2>
                {activity.employer && (
                  <h3 className={darkMode ? ' whiteElement' : ''}>
                    {activity.employer.employer_first_name}{' '}
                    {activity.employer.employer_last_name}
                  </h3>
                )}
                <h4 className={darkMode ? ' whiteElement' : ''}>
                  <span className='numbers'>
                    {activity.created_at.split('-')[2]} -{' '}
                    {activity.created_at.split('-')[1]} -{' '}
                    {activity.created_at.split('-')[0]}
                  </span>
                </h4>
                <select
                  name='DocumentStatus'
                  id='DocumentStatus'
                  defaultValue={activity.status === true ? 'Հաստատված' : activity.status === false ? 'Մերժված' : 'Ընթացքի մեջ'}
                  className={darkMode ? 'documentStatusSelect darkInpt' : 'documentStatusSelect'}
                >
                  <option value='Հաստատված'>Հաստատված</option>
                  <option value='Մերժված'>Մերժված</option>
                  <option value='Ընթացքի մեջ'>Ընթացքի մեջ</option>
                </select>
              </div>
              <div className='staff-edit-group-btns delete-document-x'>
                <button
                  className='cancel-staff-edit'
                  onClick={() => setOpenDelete(true)}
                >
                  <ImCross />
                </button>
              </div>
            </div>
            <div
              className={'documnents-list-sec' + (darkMode ? ' lightDark' : '')}
            >
              <div className='sliderHeaderBlock'>
                <h3 className={darkMode ? ' whiteElement' : ''}>Փաստաթղթերը</h3>
                <button>
                  Ներբեռնել բոլորը <ImFolderDownload />
                </button>
              </div>
              <div className='documents'>
                {activity.documnets &&
                  activity.documents.map((document, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          'relatedDoc' + (darkMode ? ' Dark darkDoc' : '')
                        }
                      >
                        <a
                          href={document.pdf_link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='documentImageLink'
                        >
                          <img src={DocumentIcon} alt='Document' />
                        </a>
                        <div>
                          <p className={darkMode ? ' whiteElement' : ''}>
                            {truncateText(document.document_name, 15)}
                          </p>
                          <div className='document-download-btns'>
                            <button className='doc-download'>
                              <a href={document.doc_link} download>
                                DOC
                              </a>
                            </button>
                            <button className='pdf-download'>
                              <a
                                href={document.pdf_link}
                                target='_blank'
                                rel='noopener noreferrer'
                                download={document.document_name}
                              >
                                PDF
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <div className='delete-confirm-section'>
            <h3 className={darkMode ? ' whiteElement' : ''}>
              {!deleteError
                ? 'Ցանկանու՞մ եք ջնջել տվյալ փաստաթուղթը'
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
