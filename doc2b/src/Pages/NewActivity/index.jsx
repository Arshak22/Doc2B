import React, { useState, useEffect } from "react";
import './style.css';
import { useGlobalContext } from "../../Context/Context";
import MyEventCalendar from "../../Components/MyEventCalendar";

import NewActivityIcon from "../../assets/Icons/NewActivityIcon.png";
import Document from "../../assets/Images/DocumentLook.png";

import { ImSearch } from "react-icons/im";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export default function NewActivity() {
    const { darkMode } = useGlobalContext();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [parentActivity, setParentActivity] = useState(null);
    const [path, setPath] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([]);
    const [areCheckboxesChecked, setAreCheckboxesChecked] = useState(true);

    const activity = [
        {
            "id": 1,
            "name": "Կադրային գործ",
            "children": [
                {
                    "id": 2,
                    "name": "Աշխատանքի ընդունում",
                    "children": [],
                    "parent": 1,
                    "templates": []
                },
                {
                    "id": 3,
                    "name": "Աշխատանքից ազատում",
                    "children": [
                        {
                            "id": 4,
                            "name": "Աշխատողի նախաձեռնությամբ",
                            "children": [],
                            "parent": 3,
                            "templates": [
                                {
                                    "id" : 1,
                                    "template_name" : 'Աշխատակցի ազատման ծանուցում',
                                    "link" : 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
                                },
                                {
                                    "id" : 2,
                                    "template_name" : 'Պատասխան ծանուցում',
                                    "link" : 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
                                },
                                {
                                    "id" : 3,
                                    "template_name" : 'Ազատման համաձայնագիր',
                                    "link" : 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
                                },
                                {
                                    "id" : 4,
                                    "template_name" : 'Ազատման հրաման',
                                    "link" : 'https://team2b.am/wp-content/uploads/2023/09/Marketing.pdf'
                                },
                            ]
                        }
                    ],
                    "parent": 1,
                    "templates": []
                }
            ],
            "parent": null,
            "templates": []
        },
        {
            "id": 10,
            "name": "Գնումներ",
            "children": [
                {
                    "id": 11,
                    "name": "Մասնակից",
                    "children": [],
                    "parent": 10,
                    "templates": []
                },
                {
                    "id": 12,
                    "name": "Պատվիրատու",
                    "children": [],
                    "parent": 10,
                    "templates": []
                }
            ],
            "parent": null,
            "templates": []
        },
        {
            "id": 15,
            "name": "Հաշվապահություն",
            "children": [
                {
                    "id": 16,
                    "name": "Մասնակից",
                    "children": [],
                    "parent": 15,
                    "templates": []
                },
                {
                    "id": 17,
                    "name": "Պատվիրատու",
                    "children": [],
                    "parent": 15,
                    "templates": []
                }
            ],
            "parent": null,
            "templates": []
        }
    ];

    useEffect(() => {
        if (selectedActivity && selectedActivity.templates) {
            const initialStates = selectedActivity.templates.map(template => true);
            setCheckboxStates(initialStates);
        }
    }, [selectedActivity]);
    

    useEffect(() => {
        const anyCheckboxChecked = checkboxStates.some(state => state);
        setAreCheckboxesChecked(anyCheckboxChecked);
    }, [checkboxStates]);

    const handleActivityClick = (activity) => {
        setParentActivity(selectedActivity);
        setSelectedActivity(activity);
        generatePath(activity.name);
    };

    const handleGoBack = () => {
        if (parentActivity) {
            setPath((prevPath) => prevPath.slice(0, -1)); // Remove the last element from the path
            setSelectedActivity(parentActivity);
            // Use the correct parent instead of grandparent
            const newParentActivity = activity.find(item => item.id === parentActivity.parent);
            setParentActivity(newParentActivity);
        } else {
            setSelectedActivity(null);
            setPath([]);
        }
    };

    const handleGoNext = () => {

    };
     

    const renderActivities = (activities) => {
        return activities.map(activity => (
            <div className={"activityOption" + (darkMode ? ' darkInpt' : '')} key={activity.id} onClick={() => handleActivityClick(activity)}>
                {activity.name}
            </div>
        ));
    };

    const generatePath = (activity) => {
        setPath((prevPath) => [...prevPath, activity]);
    };
    
    const renderActivityOptions = () => {
        if (!selectedActivity) {
            return renderActivities(activity.slice(0, 3));
        } else {
            return (
                <div>
                    {selectedActivity && (
                        <h3 className={"selected-activity-name" + (darkMode ? ' whiteElement' : '')}>{selectedActivity.name}</h3>
                    )}
                    {selectedActivity.templates && selectedActivity.templates.length === 0 ? (
                        renderActivities(selectedActivity.children)
                    ) : (
                    <div className="template-list">
                        <ul>
                            {selectedActivity.templates.map((template, index) => (
                                <li key={template.id} className={`template${(!checkboxStates[index] && ' unchecked-template') || ''}${darkMode ? ' darkInpt' : ''}`}>
                                    <div className="template-name-block">
                                        <a href={template.link} target="_blank" rel="noopener noreferrer">
                                            <img src={Document} alt="Document"/>
                                        </a>
                                        <a href={template.link} target="_blank" rel="noopener noreferrer">
                                            <h5 className={(darkMode ? ' whiteElement' : '')}>{template.template_name}</h5>
                                        </a>
                                    </div>
                                    <div className="template-action-btns">
                                        <input
                                            className="template-check"
                                            type="checkbox"
                                            value="selected"
                                            defaultChecked
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <a href={template.link} target="_blank" rel="noopener noreferrer"><FaEye className="look-template"/></a>
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="activity-step-buttons">
                    <button className="prev-btn" onClick={handleGoBack}><MdKeyboardArrowLeft/>Նախորդը</button>
                    {selectedActivity.templates && selectedActivity.templates.length !== 0 ? 
                        <button
                        className={`prev-btn next-btn ${areCheckboxesChecked ? '' : 'cant-go-next'}`}
                        onClick={areCheckboxesChecked ? handleGoNext : null} 
                    >
                        Հաջորդը<MdKeyboardArrowRight/>
                    </button> : null}
                </div>
                </div>
            );
        }
    };

    const handleCheckboxChange = (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };

    const renderPath = () => {
        if (selectedActivity) {
            return (
                <div className="activity-path">
                    {path.map((activity, index) => (
                        <React.Fragment key={index}>
                            <h5 className={(darkMode ? ' whiteElement' : '')}>{activity}</h5>
                            {index < path.length - 1 && <MdKeyboardArrowRight className={(darkMode ? ' whiteElement' : '')}/>}
                        </React.Fragment>
                    ))}
                </div>
            );
        }
        return <div className="activity-path"></div>;
    };
    
    return (
        <div className="StaffPage">
            <div className={"LeftBlockSection" + (darkMode ? ' Dark' : '')}>
                <div className={'contact-us-welcome activityWelcome' + (darkMode ? ' darkWelcome' : '')}>
                    <img src={NewActivityIcon} alt="NewActivityIcon"/>
                    <h3>Կատարել Գործողություն</h3>
                </div>
                <div className="activity-path-search-panel">
                    {renderPath()}
                    <div>
                        <input
                            type="text"
                            placeholder="Ընտրել աշխատողին"
                            name="Փնտրել"
                            className={"inpts headerInpt activitySearchBar" + (darkMode ? ' darkInpt' : '')}
                        />
                        <ImSearch className={"passwordIcon searchIcon activitySearch" + (darkMode ? ' whiteIcon' : '')} />
                    </div>
                </div>
                <div className="activities-options">
                    {renderActivityOptions()}
                </div>
            </div>
            <div className="groupedSideBlocks">
                <div className="AddsSection adds_2"></div>
                <MyEventCalendar />
            </div>
        </div>
    );
};
