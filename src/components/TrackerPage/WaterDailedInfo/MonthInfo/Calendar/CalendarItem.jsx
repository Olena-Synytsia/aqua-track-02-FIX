import s from "./CalendarItem.module.css";
import clsx from "clsx";
import dayjs from "dayjs";

const getFormattedDate = (selectedDate, day) => {
  const date = new Date(selectedDate);
  date.setDate(day);
  return dayjs(date).format("YYYY-MM-DD");
};

const CalendarItem = ({ day, selectedDate, onDateSelect, percent }) => {
  const handleClick = () => {
    const formattedDate = getFormattedDate(selectedDate, day);
    onDateSelect(formattedDate);
  };

  const isSelected = dayjs(selectedDate).date() === day;

  return (
    <div className={s.calendaritem}>
      {" "}
      <button
        className={clsx(s.btnstyle, {
          [s.selected]: isSelected,
          [s.calendaritemfull]: percent >= 100,
          [s.calendaritemhalf]: percent < 100,
        })}
        onClick={handleClick}
      >
        {" "}
        <div className={clsx(s.day, { [s.selectedDay]: isSelected })}>
          {day} {" "}
        </div>{" "}
       {" "}
        <div className={s.percentage}>
          {" "}
          <div className={s["percentage-value"]}>
           {" "}
            {percent !== undefined ? percent.toFixed(0) : 0}% {" "}
          </div>{" "}
         {" "}
        </div>{" "}
       {" "}
      </button>{" "}
    {" "}
    </div>
  );
};
export default CalendarItem;
