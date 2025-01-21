import { useEffect } from "react";
import CalendarItem from "./CalendarItem";
import s from "./Calendar.module.css";
import dayjs from "dayjs";
import { fetchWaterPer } from "../../../../../redux/monthInfo/getWaterPercent.js";
import { useDispatch, useSelector } from "react-redux";
import {
  // selectIsError,
  // selectIsLoading,
  selectWaterData,
} from "../../../../../redux/monthInfo/waterSlice.js";

const getFormattedDate = (selectedDate) => {
  return dayjs(selectedDate).format("YYYY-MM");
};

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const waterData = useSelector(selectWaterData);
  // const isLoading = useSelector(selectIsLoading);
  // const isError = useSelector(selectIsError);

  useEffect(() => {
    const formattedDate = getFormattedDate(selectedDate);
    dispatch(fetchWaterPer(formattedDate));
  }, [selectedDate, dispatch]);

  console.log("Water Data:", waterData);

  const daysInMonth = dayjs(selectedDate).daysInMonth();
  const days = [...Array(daysInMonth)].map((_, dayIndex) => {
    const day = dayIndex + 1;
    const date = dayjs(selectedDate).date(day).format("YYYY-MM-DD");
    const dayData = waterData.find((d) => d.day === date);
    const percent = dayData ? dayData.percent : undefined;
    console.log(`Day: ${day}, Percent: ${percent}`);
    return (
      <CalendarItem
        key={day}
        day={day}
        selectedDate={selectedDate}
        onDateSelect={(date) => setSelectedDate(new Date(date))}
        percent={percent}
      />
    );
  });
  // if (isLoading) {
  //   return <div>Загрузка...</div>;
  // }
  // if (isError) {
  //   return <div>Ошибка при загрузке данных.</div>;
  // }
  return (
    <div>
      <div className={s.calendargrid}> {days} </div>{" "}
    </div>
  );
};
export default Calendar;
