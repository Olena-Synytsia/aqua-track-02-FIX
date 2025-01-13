import{ useState } from "react";
import CalendarItem from "./CalendarItem";
import s from "./Calendar.module.css";
import dayjs from "dayjs";

const Calendar = ({ setSelectedDate }) => {
  const [selectedDate, setLocalSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  const handleDateChange = (newDate) => {
    setLocalSelectedDate(newDate);
    setSelectedDate(newDate); 
  };

  const daysInMonth = dayjs(selectedDate).daysInMonth();
  const startOfMonth = dayjs(selectedDate).startOf("month").day();
  const days = [];

  for (let i = 0; i < startOfMonth; i++) {
    days.push(<div className={s.emptyday} key={`empty-${i}`}></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <CalendarItem
        key={day}
        day={day}
        selectedDate={selectedDate}
        onDateSelect={handleDateChange} 
      />
    );
  }

  return (
    <div>
      <div className={s.calendargrid}>{days}</div>
    </div>
  );
};

export default Calendar;