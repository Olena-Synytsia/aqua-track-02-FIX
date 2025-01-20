import { useDispatch, useSelector } from "react-redux";
import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import ChooseDate from "./ChooseDate/ChooseDate.jsx";
import s from "./DailyInfo.module.css";
import WaterList from "./WaterList/WaterList.jsx";
import { useEffect } from "react";
import { fetchWaterItem } from "../../../../redux/dailyInfo/dailyInfoOps.js";
import { selectWaterDay } from "../../../../redux/dailyInfo/dailyInfoSlice.js";
import dayjs from "dayjs";

const DailyInfo = () => {
  const dispatch = useDispatch();
  const waterDay = useSelector(selectWaterDay);

  const isToday = dayjs(waterDay).isSame(dayjs(), "day");

  useEffect(() => {
    dispatch(fetchWaterItem(waterDay));
  }, [waterDay, dispatch]);
  return (
    <div className={s.dailyInfo}>
      <div className={s.textAndBtn}>
        <ChooseDate />
        {isToday ? <AddWaterBtn /> : null}
      </div>
      <WaterList />
    </div>
  );
};
export default DailyInfo;
