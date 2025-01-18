import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWaterItem } from "../../../../../redux/dailyInfo/dailyInfoOps";
import { selectWaterItem } from "../../../../../redux/dailyInfo/dailyInfoSlice";
import { selectWaterDay } from "../../../../../redux/water/selectors";
import s from "./CalendarItem.module.css";
import clsx from "clsx";
import dayjs from "dayjs";

const CalendarItem = ({ day, selectedDate, onDateSelect }) => {
  const dispatch = useDispatch();
  const waterDataFromRedux = useSelector(selectWaterItem);
  const waterDay = useSelector(selectWaterDay);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const date = new Date(selectedDate);
    date.setDate(day);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    dispatch(fetchWaterItem(formattedDate));
  }, [day, selectedDate, dispatch]);

  useEffect(() => {
    if (waterDataFromRedux && waterDay) {
      const waterConsumed = waterDataFromRedux.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      const calculatedPercentage = waterDay
        ? (waterConsumed / waterDay) * 100
        : 0;
      setPercentage(calculatedPercentage);
    }
  }, [waterDataFromRedux, waterDay]);

  const handleClick = () => {
    const date = new Date(selectedDate);
    date.setDate(day);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    onDateSelect(formattedDate); 
  };

  const isSelected = dayjs(selectedDate).date() === day; 

  return (
    <div className={s.calendaritem}>
      <button
        className={clsx(s.btnstyle, {
          [s.selected]: isSelected, 
          [s.calendaritemfull]: percentage >= 100,
          [s.calendaritemhalf]: percentage < 100,
        })}
        onClick={handleClick}
      >
        <div
          className={clsx(s.day, {
            [s.selectedDay]: isSelected, 
          })}
        >
          {day}
        </div>
        <div className={s.percentage}>
          <div className={s["percentage-value"]}>{percentage.toFixed(0)}%</div>
        </div>
      </button>
    </div>
  );
};

export default CalendarItem;

