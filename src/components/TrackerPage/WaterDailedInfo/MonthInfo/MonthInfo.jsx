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
// import { useDispatch, useSelector } from "react-redux";
// import CalendarPagination from "./CalendarPagination.jsx";
// import Calendar from "./Calendar/Calendar.jsx";
// import { setSelectedDate } from "../../../../redux/water/slice.js"; // Імпорт екшена
// import { selectSelectedDate } from "../../../../redux/water/selectors.js"; // Селектор
// import s from "./MonthInfo.module.css";

// const MonthInfo = () => {
//   const dispatch = useDispatch();
//   const selectedDate = useSelector(selectSelectedDate); // Отримуємо вибрану дату з Redux

//   const handleDateChange = (newDate) => {
//     dispatch(setSelectedDate(newDate)); // Оновлюємо дату через Redux
//   };

//   return (
//     <div className={s.monthinfo}>
//       <CalendarPagination
//         selectedDate={selectedDate}
//         onDateChange={handleDateChange}
//       />
//       <Calendar selectedDate={selectedDate} onDateSelect={handleDateChange} />
//     </div>
//   );
// };

// export default MonthInfo;
