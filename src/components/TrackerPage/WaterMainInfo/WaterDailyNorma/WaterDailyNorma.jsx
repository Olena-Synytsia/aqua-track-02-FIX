import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import css from "./WaterDailyNorma.module.css";
import {
  selectDailyGoal,
  selectWaterStatus,
} from "../../../../redux/dailyNorma/selectors.js";
import { fetchWaterNorma } from "../../../../redux/dailyNorma/slice.js";

const WaterDailyNorma = () => {
  const dispatch = useDispatch();
  const dailyGoal = useSelector(selectDailyGoal);
  const status = useSelector(selectWaterStatus);

  console.log("Daily Norma", dailyGoal);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWaterNorma());
    }
  }, [status, dispatch]);
  const dailyUserGoal = dailyGoal || "1,5 L";

  return (
    <div className={css.dailyNorma} data-tour="step-2">
      {" "}
      <div className={css.titleNorma}>{dailyUserGoal / 1000}L</div>{" "}
      <div className={css.subTitle}>My daily norma</div>{" "}
    </div>
  );
};
export default WaterDailyNorma;
