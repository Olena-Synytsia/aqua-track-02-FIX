import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiGetWaterDay } from "../../../../redux/water/operations.js";
import {
  selectDate,
  selectPercentDay,
} from "../../../../redux/water/selectors.js";
import ReactSlider from "react-slider";
import ReactTooltip from "react-tooltip";
import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  const selectedDate = useSelector(selectDate);
  const percentDay = useSelector(selectPercentDay);
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    dispatch(apiGetWaterDay(selectedDate));
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (percentDay !== undefined) {
      setPercent(percentDay);
    }
  }, [percentDay]);

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const months = {
    january: "ChooseDate.january",
    february: "ChooseDate.february",
    march: "ChooseDate.march",
    april: "ChooseDate.april",
    may: "ChooseDate.may",
    june: "ChooseDate.june",
    july: "ChooseDate.july",
    august: "ChooseDate.august",
    september: "ChooseDate.september",
    october: "ChooseDate.october",
    november: "ChooseDate.november",
    december: "ChooseDate.december",
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    if (isToday(dateObj)) {
      return "waterMainInfo.today";
    } else {
      const day = dateObj.getDate();
      const month = dateObj
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase();
      return `${day}, ${month}`;
      return `${day}, ${months[month]}`;
    }
  };

  return (
    <div className={css.container} data-tour="step-3">
      <div className={css.title}>{formatDate(selectedDate)}</div>

      <div className={css.sliderWrapper}>
        <ReactSlider
          value={percent}
          onChange={setPercent}
          min={0}
          max={100}
          step={1}
          renderThumb={(props) => (
            <div
              {...props}
              className={css.thumb}
              data-tip={`${Math.min(percent, 100).toFixed(0)}%`}
            />
          )}
          renderTrack={(props, state) => (
            <div {...props} className={css.track} />
          )}
        />
      </div>

      <ReactTooltip />

      <div className={css.percentBar}>
        <span>0%</span>
        <span className={css.fifty}>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;

/******  a20b26ff-ead0-4449-924d-9d958cb3cadc  *******/
