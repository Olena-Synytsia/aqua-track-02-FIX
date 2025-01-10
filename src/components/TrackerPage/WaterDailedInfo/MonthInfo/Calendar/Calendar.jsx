import React from "react";
import CalendarItem from "./CalendarItem.jsx";
import dayjs from "dayjs";
import s from "./Calendar.module.css"

function Calendar({ selectedDate }) {
    const daysInMonth = dayjs(selectedDate).daysInMonth();
    const startOfMonth = dayjs(selectedDate).startOf("month").day();
    const days = [];

    for (let i = 0; i < startOfMonth; i++) {
        days.push(<div className={s.empty - day} key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(
            <CalendarItem key={day} day={day} selectedDate={selectedDate} />
        );
    }

    return <div className={s.calendar-grid}>{days}</div>;
}

export default Calendar;