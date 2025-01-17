import { useState } from "react";
import CalendarPagination from "./CalendarPagination.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import s from "./MonthInfo.module.css";

const MonthInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div className={s.monthinfo}>
      
      <CalendarPagination
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};

export default MonthInfo;