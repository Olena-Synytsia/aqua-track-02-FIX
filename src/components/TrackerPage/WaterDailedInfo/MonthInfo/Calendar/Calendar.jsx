// import { useState } from "react";
import CalendarItem from "./CalendarItem";
import s from "./Calendar.module.css";
import dayjs from "dayjs";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (newDate) => {
    if (newDate !== selectedDate) {
      setSelectedDate(newDate);
    }
  };

  const daysInMonth = dayjs(selectedDate).daysInMonth();
  // const startOfMonth = dayjs(selectedDate).startOf("month").day();

  // const emptyDays = [...Array(daysInMonth)].map((_, index) => (
  //   <div className={s.emptyday} key={`empty-${index}`} />
  // ));

  const days = [...Array(daysInMonth)].map((_, dayIndex) => (
    <CalendarItem
      key={dayIndex + 1}
      day={dayIndex + 1}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  ));

  return (
    <div>
      <div className={s.calendargrid}>
        {/* {emptyDays} */}
        {days}
      </div>
    </div>
  );
};

export default Calendar;
