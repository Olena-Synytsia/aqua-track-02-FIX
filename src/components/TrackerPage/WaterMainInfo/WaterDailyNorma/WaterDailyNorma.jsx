import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../redux/auth/selectors";
import css from "./WaterDailyNorma.module.css";
// import { useTranslation } from "react-i18next";

const WaterDailyNorma = () => {
  // const { t } = useTranslation();
  const user = useSelector(selectUserInfo);

  const dailyUserGoal = user.dailyWaterNorm;

  return (
    <div className={css.dailyNorma} data-tour="step-2">
      <a className={css.title}>
        {dailyUserGoal} {"waterMainInfo.l"}
      </a>
      <a className={css.subtitle}>{"waterMainInfo.norma"}</a>
    </div>
  );
};

export default WaterDailyNorma;
