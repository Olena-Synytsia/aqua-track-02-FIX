// import React from "react";
import { useState } from "react";
import CalendarItem from "./CalendarItem";
import s from "./Calendar.module.css";
import dayjs from "dayjs";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate);

  const handleDateChange = (newDate) => {
    setLocalSelectedDate(newDate);
    setSelectedDate(newDate);
  };

  const daysInMonth = dayjs(localSelectedDate).daysInMonth();
  const startOfMonth = dayjs(localSelectedDate).startOf("month").day();
  const days = [];

  for (let i = 0; i < startOfMonth; i++) {
    days.push(<div className={s.emptyday} key={`empty-${i}`}></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <CalendarItem
        key={day}
        day={day}
        selectedDate={localSelectedDate}
        onDateSelect={handleDateChange}
      />
    );
  }

  return <div className={s.calendargrid}>{days}</div>;
};

export default Calendar;
