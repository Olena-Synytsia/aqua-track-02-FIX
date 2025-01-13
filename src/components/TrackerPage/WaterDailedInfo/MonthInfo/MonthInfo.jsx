// import React from "react";
import { useState } from "react";
import CalendarPagination from "./CalendarPagination.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import s from "./MonthInfo.module.css";

const MonthInfo = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  return (
    <div className={s.monthinfo}>
      <CalendarPagination
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <Calendar selectedDate={selectedDate} />
    </div>
  );
};

export default MonthInfo;
