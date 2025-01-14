// import React from "react";
import dayjs from "dayjs";
import s from "./CalendarPagination.module.css";

const CalendarPagination = ({ selectedDate, onDateChange }) => {
  const handlePreviousMonth = () => {
    onDateChange(dayjs(selectedDate).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    onDateChange(dayjs(selectedDate).add(1, "month").toDate());
  };

  return (
    <div className={s.calendarpagination}>
      <div>
      <h1 className= {s.month}>Month</h1>
      </div>
     <div className={s.pagination}>
      <button className={s.btnpagination} onClick={handlePreviousMonth}>{"<"}</button>
      <span className= {s.spanmonth}>{dayjs(selectedDate).format("MMMM, YYYY")}</span>
      <button className={s.btnpagination} onClick={handleNextMonth}>{">"}</button>
      <svg className={s.iconpie}>
        <use href="src/assets/sprite.svg#icon-pie-chart"></use>
      </svg>
      </div>
    </div>
  );
};

export default CalendarPagination;
