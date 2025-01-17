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
      
      const waterConsumed = waterDataFromRedux.reduce((acc, item) => acc + item.amount, 0);
      const calculatedPercentage = waterDay ? (waterConsumed / waterDay) * 100 : 0;
      setPercentage(calculatedPercentage);
    }
  }, [waterDataFromRedux, waterDay]);

  const handleClick = () => {
    
    const date = new Date(selectedDate);
    date.setDate(day);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    onDateSelect(formattedDate); 
  };


  return (
    <div className={s.calendaritem}>
      <button
        className={clsx({
          [s.calendaritemfull]: percentage >= 100,
          [s.calendaritemhalf]: percentage < 100,
          [s.btnstyle]: true,
        })}
        onClick={handleClick}
      >
        <div className={s.day}>{day}</div>
        <div className={s.percentage}>
          <div className={s["percentage-value"]}>
            {percentage.toFixed(1)}%
          </div>
        </div>
      </button>
    </div>
  );
};

export default CalendarItem;
