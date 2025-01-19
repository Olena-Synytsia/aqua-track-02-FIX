import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../redux/auth/selectors.js";
import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const user = useSelector(selectUserInfo);

  const dailyUserGoal = user?.dailyWaterNorm || "1,5 L";

  return (
    <div className={css.dailyNorma} data-tour="step-2">
      <div className={css.titleNorma}>{dailyUserGoal}</div>
      <div className={css.subTitle}>My daily norma</div>
    </div>
  );
};

export default WaterDailyNorma;
