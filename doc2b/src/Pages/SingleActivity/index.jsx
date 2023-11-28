import React, { useEffect, useState, useRef  } from 'react';
import './style.css';
import { useGlobalContext } from "../../Context/Context";

import MyEventCalendar from "../../Components/MyEventCalendar";

import DocumentIcon from "../../assets/Images/Document.png";
import Document from "../../assets/Images/DocumentLook.png";

import { ImFolderDownload } from "react-icons/im";

export default function SingleActivity() {
    const {darkMode} = useGlobalContext();
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength - 2) + '..';
        }
    };

    let activity = {
        name: 'Գործողության անվանումը',
        person: 'Անուն Ազգանուն',
        date: '13 Հուլ 2023',
        status: 'Ընթացքի փուլում',
        documents: [
            {
                document_name: 'Փաստաթուղթ.pdf',
                doc_link: 'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
                pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
            },
            {
                document_name: 'Փաստաթուղթ.pdf',
                doc_link: 'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
                pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
            },
            {
                document_name: 'Փաստաթուղթ.pdf',
                doc_link: 'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
                pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
            },
            {
                document_name: 'Փաստաթուղթ.pdf',
                doc_link: 'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
                pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
            },
            {
                document_name: 'Փաստաթուղթ.pdf',
                doc_link: 'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
                pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
            },
            {
                document_name: 'Փաստաթուղթ.pdf',
                doc_link: 'https://team2b.am/wp-content/uploads/2022/08/Ликвидационный-баланс.doc',
                pdf_link: 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
            }
        ]
    };

    const dateParts = activity.date.split(' ');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    // const downloadPDF = (filePath, fileName) => {
    //     fetch(filePath, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/pdf',
    //       },
    //     }).then(response => response.blob()).then(blob => {
    //         const url = window.URL.createObjectURL(new Blob([blob]));
    
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = fileName;
    
    //         document.body.appendChild(link);
    
    //         link.click();
    
    //         link.parentNode.removeChild(link);
    //       });
    // };

    return (
        <div className="StaffPage">
            <div className={"LeftBlockSection" + (darkMode ? ' Dark' : '')}>
                <div className='DocumentInfo'>
                    <img src={Document} alt="DocumentIcon"/>
                    <div>
                        <h2 className={(darkMode ? ' whiteElement' : '')}>{activity.name}</h2>
                        <h3 className={(darkMode ? ' whiteElement' : '')}>{activity.person}</h3>
                        <h4 className={(darkMode ? ' whiteElement' : '')}><span className='numbers'>{day}</span> {month} <span className='numbers'>{year}</span></h4>
                        <h5>{activity.status}</h5>
                    </div>
                </div>
                <div className={'documnents-list-sec' + (darkMode ? ' lightDark' : '')}>
                    <div className='sliderHeaderBlock'>
                        <h3 className={(darkMode ? ' whiteElement' : '')}>Փաստաթղթերը</h3>
                        <button>Ներբեռնել բոլորը <ImFolderDownload/></button>
                    </div>
                    <div className='documents'>
                        {activity.documents.map((document, index) => {
                            return (
                                <div key={index} className={'relatedDoc' + (darkMode ? ' Dark darkDoc' : '')}>
                                    <a href={document.pdf_link} target="_blank" rel="noopener noreferrer" className='documentImageLink'><img src={DocumentIcon} alt="Document" /></a>
                                    <div>
                                        <p className={(darkMode ? ' whiteElement' : '')}>{truncateText(document.document_name, 15)}</p>
                                        <div className='document-download-btns'>
                                            <button className='doc-download'><a href={document.doc_link} download>DOC</a></button>
                                            <button className='pdf-download'><a href={document.pdf_link} target="_blank" rel="noopener noreferrer" download={document.document_name}>PDF</a></button>
                                        </div>
                                    </div>
                                </div>);
                        })}
                    </div>
                </div>
            </div>
            <div className="groupedSideBlocks">
                <div className="AddsSection adds_2"></div>
                <MyEventCalendar />
            </div>
        </div>
    );
};