import { useDispatch, useSelector } from "react-redux";
import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import ChooseDate from "./ChooseDate/ChooseDate.jsx";
import s from "./DailyInfo.module.css";
import WaterList from "./WaterList/WaterList.jsx";
import { useEffect } from "react";
import { fetchWaterItem } from "../../../../redux/dailyInfo/dailyInfoOps.js";
import {
  selectIsError,
  selectIsLoading,
  selectWaterDay,
} from "../../../../redux/dailyInfo/dailyInfoSlice.js";
import dayjs from "dayjs";
import LoaderWaterList from "./LoaderForWaterList/LoaderWaterList.jsx";

const DailyInfo = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
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
      {isLoading ? (
        <LoaderWaterList />
      ) : isError ? (
        <div className={s.content}>
          <p className={s.errorText}>
            Something went wrong. Please try again later.
          </p>
        </div>
      ) : (
        <WaterList />
      )}
    </div>
  );
};
export default DailyInfo;
