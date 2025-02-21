import dayjs from "dayjs";
import { selectWaterDay } from "../../../../../redux/dailyInfo/dailyInfoSlice.js";
import s from "./ChooseDate.module.css";
import { useSelector } from "react-redux";

const ChooseDate = () => {
  const waterDay = useSelector(selectWaterDay);
  const isToday = dayjs(waterDay).isSame(dayjs(), "day");
  const displayDate = waterDay
    ? isToday
      ? "Today"
      : dayjs(waterDay).format("D, MMMM")
    : "Today";

  return <div className={s.chooseDate}>{displayDate}</div>;
};
export default ChooseDate;
