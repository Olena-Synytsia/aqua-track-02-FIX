import { useDispatch, useSelector } from "react-redux";
import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import ChooseDate from "./ChooseDate/ChooseDate.jsx";
import s from "./DailyInfo.module.css";
import WaterList from "./WaterList/WaterList.jsx";
import { useEffect } from "react";
import { fetchWaterItem } from "../../../../redux/dailyInfo/dailyInfoOps.js";
import {
  selectIsLoading,
  selectWaterDay,
} from "../../../../redux/dailyInfo/dailyInfoSlice.js";
import dayjs from "dayjs";
import LoaderWaterList from "./LoaderForWaterList/LoaderWaterList.jsx";

const DailyInfo = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  let waterDay = useSelector(selectWaterDay);

  waterDay = waterDay ? waterDay : dayjs().format("YYYY-MM-DD");

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
      {isLoading ? <LoaderWaterList /> : <WaterList />}
    </div>
  );
};
export default DailyInfo;
