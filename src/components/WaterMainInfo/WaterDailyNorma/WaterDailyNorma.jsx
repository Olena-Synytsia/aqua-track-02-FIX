// import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/selectors";
import css from "./WaterDailyNorma.module.css";
import { useTranslation } from "react-i18next";

const WaterDailyNorma = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const dailyUserGoal = user.dailyWaterNorm;

  return (
    <div className={css.dailyNorma} data-tour="step-2">
      <a className={css.title}>
        {dailyUserGoal} {t("waterMainInfo.1")}
      </a>
      <a className={css.subtitle}>{t("waterMainInfo.norma")}</a>
    </div>
  );
};

export default WaterDailyNorma;
