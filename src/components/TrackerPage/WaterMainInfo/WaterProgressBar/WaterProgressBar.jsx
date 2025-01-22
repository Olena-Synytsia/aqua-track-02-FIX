import { useEffect, useState } from "react";
// import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Tooltip as ReactTooltip } from "react-tooltip";
import css from "./WaterProgressBar.module.css";
import dayjs from "dayjs";
import {
  selectIsError,
  selectIsLoading,
  selectWaterData,
} from "../../../../redux/dailyNorma/selectors.js";
import { fetchWaterPercent } from "../../../../redux/dailyNorma/slice.js";

const WaterProgressBar = () => {
  const dispatch = useDispatch();
  const selectedDate = dayjs().format("YYYY-MM-DD");
  const waterPercent = useSelector(selectWaterData);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [localPercent, setLocalPercent] = useState(waterPercent.percent || 0);
  const percent = localPercent.percent || 0;

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchWaterPercent(selectedDate));
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    setLocalPercent(waterPercent);
  }, [waterPercent]);

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className={`${css.container} ${isLoading ? css.loading : ""}`}>
      <div className={css.containerBar}>
        <div className={css.title}>Today</div>
        <div className={css.sliderWrapper}>
          <div className={css.track}>
            <div className={css.filledTrack} style={{ width: `${percent}%` }} />
            <div
              className={css.thumb}
              style={{ left: `${percent}%` }}
              data-tooltip-id="progress-tooltip"
              data-tooltip-content={`${Math.min(percent, 100).toFixed(0)}%`}
            />
          </div>
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
