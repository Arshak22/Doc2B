import React from "react";
import './style.css';
import MyEventCalendar from "../../Components/MyEventCalendar";

export default function Calendar() {
    return(
        <div className="calendar-page">
            <MyEventCalendar/>
        </div>
    );
};