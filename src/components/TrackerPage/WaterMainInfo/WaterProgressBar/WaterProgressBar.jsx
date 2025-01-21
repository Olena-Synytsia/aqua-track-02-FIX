import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, selectWaterDay } from "../../../../redux/water/selectors";
import { selectUserInfo } from "../../../../redux/auth/selectors";
import {
  apiGetWaterDay,
  updateWaterDay,
} from "../../../../redux/water/operations";
import s from "./WaterProgressBar.module.css";
import dayjs from "dayjs";

const WaterProgressBar = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const consumedWater = useSelector(selectWaterDay);
  const user = useSelector(selectUserInfo);
  const dailyWaterNorm = user?.dailyWaterNorm || 1500;
  const [localPercent, setLocalPercent] = useState(0);

  console.log("WaterProgressBar rendered");
  console.log("Selected Date:", selectedDate);
  console.log("Consumed Water:", consumedWater);
  console.log("Daily Water Norm:", dailyWaterNorm);
  console.log("Local Percent:", localPercent);

  useEffect(() => {
    if (selectedDate) {
      console.log("apiGetWaterDay dispatched");
      dispatch(apiGetWaterDay(selectedDate));
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (consumedWater !== undefined && dailyWaterNorm > 0) {
      const percent = Math.min((consumedWater / dailyWaterNorm) * 100, 100);
      console.log("Percent:", percent);
      setLocalPercent(percent);
    }
  }, [consumedWater, dailyWaterNorm]);

  const handleSliderChange = (newPercent) => {
    console.log("New Percent:", newPercent);
    const newWaterAmount = Math.round((newPercent / 100) * dailyWaterNorm);
    console.log("New Water Amount:", newWaterAmount);
    setLocalPercent(newPercent);
    if (selectedDate) {
      console.log("updateWaterDay dispatched");
      dispatch(updateWaterDay({ date: selectedDate, amount: newWaterAmount }));
    }
  };

  const currentDate = dayjs().format("YYYY-MM-DD");
  const selectedDateFormatted = dayjs(selectedDate).format("YYYY-MM-DD");
  const formattedDate =
    selectedDateFormatted === currentDate
      ? "Today"
      : dayjs(selectedDate).format("DD MMMM");

  return (
    <div className={s.container}>
      <div className={s.containerBar}>
        <div className={s.title}>{formattedDate}</div>
        <div className={s.sliderWrapper}>
          <ReactSlider
            value={localPercent}
            onChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            className={s.slider}
            thumbClassName={s.thumb}
            trackClassName={s.track}
            renderThumb={({ value, ...props }) => (
              <div
                {...props}
                className={s.thumb}
                data-tooltip-id="progress-tooltip"
                data-tooltip-content={`${Math.min(localPercent, 100).toFixed(
                  0
                )}% (${consumedWater} ml / ${dailyWaterNorm} ml)`}
              />
            )}
          />
        </div>
        <ReactTooltip
          id="progress-tooltip"
          className={s.customTooltip}
          place="top"
          effect="solid"
          arrowClassName={s.customArrow}
        />
        <div className={s.percentBar}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
