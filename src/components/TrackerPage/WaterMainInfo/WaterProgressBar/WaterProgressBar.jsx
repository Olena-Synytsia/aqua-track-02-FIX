import React, { useEffect, useState } from "react";
import { Slider, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, selectWaterDay } from "../../../../redux/water/selectors";
import { selectUserInfo } from "../../../../redux/auth/selectors";
import {
  apiGetWaterDay,
  updateWaterDay,
} from "../../../../redux/water/operations";
import dayjs from "dayjs";
import s from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const consumedWater = useSelector(selectWaterDay);
  const user = useSelector(selectUserInfo);
  const dailyWaterNorm = user?.dailyWaterNorm || 1500;
  const [localPercent, setLocalPercent] = useState(0);

  useEffect(() => {
    if (selectedDate) {
      dispatch(apiGetWaterDay(selectedDate));
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (consumedWater !== undefined && dailyWaterNorm > 0) {
      const percent = Math.min((consumedWater / dailyWaterNorm) * 100, 100);
      setLocalPercent(percent);
    }
  }, [consumedWater, dailyWaterNorm]);

  const handleSliderChange = (event, newValue) => {
    const newWaterAmount = Math.round((newValue / 100) * dailyWaterNorm);

    setLocalPercent(newValue);
    if (selectedDate) {
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
          <Slider
            value={localPercent}
            onChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            aria-label="Water consumption progress"
            valueLabelDisplay="auto"
            sx={{
              color: "#9be1a0",
              height: 8,
              "& .MuiSlider-track": {
                backgroundColor: "#9be1a0",
              },
              "& .MuiSlider-rail": {
                opacity: 0.5,
                backgroundColor: "#f0eff4",
              },
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                backgroundColor: "#9be1a0",
              },
            }}
          />
        </div>
        <div className={s.percentBar}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        <Tooltip
          title={`${localPercent.toFixed(
            0
          )}% (${consumedWater} ml / ${dailyWaterNorm} ml)`}
          placement="top"
          arrow
          classes={{ tooltip: s.customTooltip, arrow: s.customArrow }}
        >
          <div className={s.sliderTooltip} />
        </Tooltip>
      </div>
    </div>
  );
};

export default WaterProgressBar;
