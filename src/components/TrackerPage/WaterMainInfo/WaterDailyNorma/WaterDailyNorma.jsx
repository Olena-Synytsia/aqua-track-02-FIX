import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectWaterDay } from "../../../../redux/water/selectors.js";
import { apiGetWaterDay } from "../../../../redux/water/operations.js";
import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const dispatch = useDispatch();
  const dailyWaterNorm = useSelector(selectWaterDay);

  useEffect(() => {
    dispatch(apiGetWaterDay(new Date().toISOString().split("T")[0]));
  }, [dispatch]);
  const dailyUserGoal = dailyWaterNorm || "1,5 L";

  return (
    <div className={css.dailyNorma} data-tour="step-2">
      <div className={css.titleNorma}>{dailyUserGoal}</div>
      <div className={css.subTitle}>My daily norma</div>
    </div>
  );
};
export default WaterDailyNorma;
