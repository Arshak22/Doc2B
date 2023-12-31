import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/Context';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './style.css';

import {
  GetCalendarEvents,
  AddNewCalendarEvent,
  UpdateSingleCalendarEvent,
  DeleteCalendarEvent,
} from '../../Platform/CalendarRequest';

import { RxCross2 } from 'react-icons/rx';
import { AiFillEdit } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { ImCross } from 'react-icons/im';

export default function MyEventCalendar() {
  const { darkMode } = useGlobalContext();
  const [date, setDate] = useState(new Date());
  const currentDate = new Date();
  const [events, setEvents] = useState([]);

  let isDateBeforeCurrentDay =
    date.getFullYear() < currentDate.getFullYear() ||
    (date.getFullYear() === currentDate.getFullYear() &&
      (date.getMonth() < currentDate.getMonth() ||
        (date.getMonth() === currentDate.getMonth() &&
          date.getDate() < currentDate.getDate())));

  useEffect(() => {
    isDateBeforeCurrentDay =
      date.getFullYear() < currentDate.getFullYear() ||
      (date.getFullYear() === currentDate.getFullYear() &&
        (date.getMonth() < currentDate.getMonth() ||
          (date.getMonth() === currentDate.getMonth() &&
            date.getDate() < currentDate.getDate())));
  }, [date, currentDate]);

  const formatDate = (inputDateString) => {
    const parsedDate = new Date(inputDateString);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    time: '00:00',
    date: formatDate(date.toDateString()),
  });
  const [showPopup, setShowPopup] = useState(false);
  const [hidePopUp, setHidePopUp] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [buttonClass, setButtonClass] = useState('');

  const armenianMonths = [
    'Հունվար',
    'Փետրվար',
    'Մարտ',
    'Ապրիլ',
    'Մայիս',
    'Հունիս',
    'Հուլիս',
    'Օգոստոս',
    'Սեպտեմբեր',
    'Հոկտեմբեր',
    'Նոյեմբեր',
    'Դեկտեմբեր',
  ];

  const armenianWeekdays = ['Կիր', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ'];

  const GetEventsList = async () => {
    try {
      const result = await GetCalendarEvents();
      setEvents(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    GetEventsList();
  }, [showPopup, hidePopUp]);

  useEffect(() => {
    if (Array.isArray(events)) {
      const selectedDate = formatDate(date.toDateString());
      const matchingDateEvents = events.find(
        (eventObject) => eventObject.date === selectedDate
      );

      setFilteredEvents(matchingDateEvents ? matchingDateEvents.events : []);
    }
  }, [events, date]);

  const handleNextMonthClick = () => {
    setActiveStartDate(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1)
    );
  };

  const handlePrevMonthClick = () => {
    setActiveStartDate(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1)
    );
  };

  useEffect(() => {
    const nextButton = document.querySelector(
      '.react-calendar__navigation__arrow.react-calendar__navigation__next-button'
    );
    const prevButton = document.querySelector(
      '.react-calendar__navigation__arrow.react-calendar__navigation__prev-button'
    );

    if (nextButton) {
      nextButton.addEventListener('click', handleNextMonthClick);
    }
    if (prevButton) {
      prevButton.addEventListener('click', handlePrevMonthClick);
    }
    return () => {
      if (nextButton) {
        nextButton.removeEventListener('click', handleNextMonthClick);
      }
      if (prevButton) {
        prevButton.removeEventListener('click', handlePrevMonthClick);
      }
    };
  }, [activeStartDate]);

  useEffect(() => {
    if (newEvent.date !== formatDate(date.toDateString())) {
      setNewEvent((prevNewEvent) => ({
        ...prevNewEvent,
        date: formatDate(date.toDateString()),
      }));
    }
  }, [newEvent, date]);

  const handleAddNewEvent = async (addEvent, shouldAdd) => {
    try {
      if (shouldAdd) {
        await AddNewCalendarEvent(addEvent);
        GetEventsList();
        setButtonClass('shrink-button');
      }
    } catch (error) {}
  };

  const saveEvent = async () => {
    if (newEvent.name.trim() !== '' && newEvent.time.trim() !== '') {
      const updatedEvents = { ...events };
      if (!updatedEvents[date.toDateString()]) {
        updatedEvents[date.toDateString()] = [];
      }
      updatedEvents[date.toDateString()].push(newEvent);
      setEvents(updatedEvents);

      const eventDate = formatDate(date.toDateString());

      setNewEvent({
        name: '',
        description: '',
        time: '00:00',
        date: eventDate,
      });
      handleAddNewEvent(newEvent, true);
    }
  };

  useEffect(() => {
    if (buttonClass === 'shrink-button') {
      const timeoutId = setTimeout(() => {
        setButtonClass('');
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [buttonClass]);

  const toggleEditMode = (event, index) => {
    if (editingEvent === null) {
      setEditingEvent({ ...event, index });
    } else {
      setEditingEvent(null);
    }
  };

  const updateEvent = async (id) => {
    if (
      editingEvent.name !== null &&
      editingEvent.time !== null &&
      editingEvent.name.trim() !== '' &&
      editingEvent.time.trim() !== ''
    ) {
      const updatingEvent = {
        name: editingEvent.name,
        description: editingEvent.description ? editingEvent.description : '',
        date: editingEvent.date,
        time: editingEvent.time,
      };
      try {
        await UpdateSingleCalendarEvent(id, updatingEvent);
        GetEventsList();
        setEditingEvent(null);
      } catch (error) {}
    }
  };

  const deleteEvent = async (index) => {
    try {
      await DeleteCalendarEvent(index);
      GetEventsList();
      const updatedEvents = { ...events };
      updatedEvents[date.toDateString()].splice(index, 1);
      if (updatedEvents[date.toDateString()].length === 0) {
        delete updatedEvents[date.toDateString()];
      }
    } catch (error) {}
  };

  const HidePopUp = () => {
    setShowPopup(false);
    setHidePopUp(true);
  };

  useEffect(() => {
    if (darkMode) {
      document
        .querySelectorAll('.react-calendar__month-view__weekdays__weekday abbr')
        .forEach((item) => {
          item.style.color = '#ffffff';
        });

      document
        .querySelectorAll(
          '.react-calendar__tile.react-calendar__month-view__days__day abbr'
        )
        .forEach((item) => {
          item.style.color = '#ffffff';
        });

      if (
        document.querySelectorAll(
          '.react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day abbr'
        )[0]
      ) {
        document.querySelectorAll(
          '.react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day abbr'
        )[0].style.color = 'var(--light-green)';
      }
      document.querySelectorAll(
        '.react-calendar__navigation__arrow.react-calendar__navigation__prev-button'
      )[0].style.color = '#ffffff';
      document.querySelectorAll(
        '.react-calendar__navigation__arrow.react-calendar__navigation__next-button'
      )[0].style.color = '#ffffff';
    } else {
      document
        .querySelectorAll('.react-calendar__month-view__weekdays__weekday abbr')
        .forEach((item) => {
          item.style.color = '#000000';
        });

      document
        .querySelectorAll(
          '.react-calendar__tile.react-calendar__month-view__days__day abbr'
        )
        .forEach((item) => {
          item.style.color = '#000000';
        });

      if (
        document.querySelectorAll(
          '.react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day abbr'
        )[0]
      ) {
        document.querySelectorAll(
          '.react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day abbr'
        )[0].style.color = 'var(--light-green)';
      }

      document.querySelectorAll(
        '.react-calendar__navigation__arrow.react-calendar__navigation__prev-button'
      )[0].style.color = '#000000';
      document.querySelectorAll(
        '.react-calendar__navigation__arrow.react-calendar__navigation__next-button'
      )[0].style.color = '#000000';
    }
  }, [darkMode, activeStartDate]);

  return (
    <div className={'event-calendar' + (darkMode ? ' Dark' : '')}>
      <div
        className={
          'calendar-container' +
          (showPopup ? ' moveUpOne' : '') +
          (hidePopUp ? ' moveBackOne' : '')
        }
      >
        <h3
          className={'calendarActiveDate' + (darkMode ? ' whiteElement' : '')}
        >
          {armenianMonths[activeStartDate.getMonth()]}{' '}
          <span>{activeStartDate.getFullYear()}</span>
        </h3>
        <div className='calendar'>
          <Calendar
            value={date}
            onChange={setDate}
            onClickDay={(value) => {
              setDate(value);
              setShowPopup(true);
              setHidePopUp(false);
            }}
            locale='hy-AM'
            monthShortAriaLabel={(monthIndex) => armenianMonths[monthIndex]}
            monthAriaLabel={(date) => armenianMonths[date.getMonth()]}
            weekDayAriaLabel={(weekDay) => armenianWeekdays[weekDay]}
            formatShortWeekday={(locale, date) =>
              armenianWeekdays[date.getDay()]
            }
            activeStartDate={activeStartDate}
            tileClassName={({ date }) => {
              const selectedDate = formatDate(date.toDateString());
              const hasEvents =
                Array.isArray(events) &&
                events.some &&
                events.some(
                  (eventObject) =>
                    eventObject.date === selectedDate &&
                    Array.isArray(eventObject.events) &&
                    eventObject.events.length > 0
                );
              return hasEvents ? 'has-events' : '';
            }}
            allEvents={filteredEvents}
          />
        </div>
      </div>
      <div
        className={
          'event-popup' +
          (showPopup ? ' moveUpTwo' : '') +
          (hidePopUp ? ' moveBackTwo' : '')
        }
      >
        <div className='event-list'>
          <button
            className={'event-closeBtn' + (darkMode ? ' whiteX' : '')}
            onClick={HidePopUp}
          >
            <RxCross2 />
          </button>
          <h3 className={'calendarActiveDate' + (darkMode ? ' darkDate' : '')}>
            {armenianMonths[activeStartDate.getMonth()]}{' '}
            <span>
              {date.getDate()}, {activeStartDate.getFullYear()}
            </span>
          </h3>
          <h2 className={'events-title' + (darkMode ? ' whiteElement' : '')}>
            Իրադարձություններ
          </h2>

          {filteredEvents.length === 0 ? (
            <h3 className={'no-events-title' + (darkMode ? ' darkDate' : '')}>
              Իրադարձություններ Չկան
            </h3>
          ) : (
            <div
              className={
                'myEvents' + (isDateBeforeCurrentDay ? ' bigEventsList' : '')
              }
            >
              {filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className={'my-event' + (darkMode ? ' lightDark' : '')}
                >
                  {editingEvent !== null && editingEvent.index === event.id ? (
                    <div className='event-details edit-details'>
                      <div className='edit-inpts-grouped'>
                        <div className='event-time'>
                          <TimePicker
                            className='time-picker edit-time'
                            value={editingEvent.time}
                            onChange={(time) =>
                              setEditingEvent({ ...editingEvent, time })
                            }
                          />
                        </div>
                        <div
                          className={
                            'event-information' +
                            (darkMode ? ' whiteElement' : '')
                          }
                        >
                          <div className='event-name'>
                            <input
                              className={
                                'event-inpts event-name-inpt edit-name-inpt' +
                                (darkMode ? ' darkInpt2' : '')
                              }
                              type='text'
                              placeholder='Անվանում'
                              value={editingEvent.name}
                              onChange={(e) =>
                                setEditingEvent({
                                  ...editingEvent,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className='event-description'>
                        <textarea
                          className={
                            'event-inpts edit-description-inpt' +
                            (darkMode ? ' darkInpt2' : '')
                          }
                          placeholder='Նկարագրություն'
                          style={{ width: '100%' }}
                          value={editingEvent.description}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div key={index} className='event-details'>
                      <div className='event-time'>
                        {editingEvent && editingEvent.time
                          ? editingEvent.time
                          : event.time}
                      </div>
                      <div
                        className={
                          'event-information' +
                          (darkMode ? ' whiteElement' : '')
                        }
                      >
                        <div className='event-name'>
                          {editingEvent && editingEvent.name
                            ? editingEvent.name
                            : event.name}
                        </div>
                        <div className='event-description'>
                          {editingEvent && editingEvent.description
                            ? editingEvent.description
                            : event.description}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='event-actions'>
                    {editingEvent === null ||
                    editingEvent.index !== event.id ? (
                      <button
                        className='edit-event'
                        onClick={() => toggleEditMode(event, event.id)}
                      >
                        <AiFillEdit />
                      </button>
                    ) : (
                      <button
                        className='save-event'
                        onClick={() => updateEvent(event.id)}
                      >
                        <ImCheckmark />
                      </button>
                    )}

                    <button onClick={() => deleteEvent(event.id)}>
                      <ImCross />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {isDateBeforeCurrentDay ? null : (
          <div className='addEventSection'>
            <div className='grouped-event-inpts'>
              <TimePicker
                className={'time-picker' + (darkMode ? ' darkTime' : '')}
                value={newEvent.time}
                onChange={(time) => setNewEvent({ ...newEvent, time })}
              />
              <input
                className={
                  'event-inpts event-name-inpt' + (darkMode ? ' darkInpt' : '')
                }
                type='text'
                placeholder='Անվանում'
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
              />
            </div>
            <div className='grouped-event-inpts'>
              <textarea
                className={'event-inpts' + (darkMode ? ' darkInpt' : '')}
                placeholder='Նկարագրություն'
                style={{ width: '100%' }}
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
            <div className='grouped-event-inpts'>
              <button
                className={`add-event-btn ${buttonClass}`}
                onClick={saveEvent}
              >
                Ավելացնել
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
