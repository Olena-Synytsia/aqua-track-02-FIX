import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  selectDate,
  selectPercentDay,
  selectWaterDay,
} from "../../../../redux/water/selectors.js";
import { apiGetWaterDay } from "../../../../redux/water/operations.js";
import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  const dispatch = useDispatch();

  const selectedDate = useSelector(selectDate);
  const percentDay = useSelector(selectPercentDay);
  const consumedWater = useSelector(selectWaterDay);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (selectedDate) {
      dispatch(apiGetWaterDay(selectedDate));
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (percentDay !== undefined) {
      setPercent(percentDay);
    }
  }, [percentDay]);

  return (
    <div className={css.container}>
      <div className={css.containerBar}>
        <div className={css.title}>
          Спожито: {consumedWater || 0} мл / {percent}% норми
        </div>

        <div className={css.sliderWrapper}>
          <ReactSlider
            value={percent}
            onChange={setPercent}
            min={0}
            max={100}
            step={1}
            className={css.sliderWrapper}
            thumbClassName={css.thumb}
            trackClassName={css.track}
            renderThumb={(props) => (
              <div
                {...props}
                className={css.thumb}
                data-tooltip-id="progress-tooltip"
                data-tooltip-content={`${Math.min(percent, 100).toFixed(0)}%`}
              />
            )}
          />
        </div>

        <ReactTooltip
          id="progress-tooltip"
          className={css.customTooltip}
          place="top"
          effect="solid"
          arrowClassName={css.customArrow}
        />

        <div className={css.percentBar}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
