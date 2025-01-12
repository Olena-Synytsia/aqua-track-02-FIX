import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import WaterMainInfo from "../../components/TrackerPage/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../";
// import WaterDetailedInfo from "../../components/TrackerPage/WaterDetailedInfo/WaterDetailedInfo";
import Modals from "../../components/Modals/Modals";
// import Container from "../../shared/components/Container/Container";
import { useTour } from "@reactour/tour";
// import Languages from "../../shared/components/Languages/Languages";

import style from "./TrackerPage.module.css";
import { icons as sprite } from "../../shared/icons";

const TrackerPage = () => {
  const { t } = useTranslation();
  const { setIsOpen } = useTour();

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit") === null;
    if (isFirstVisit) {
      localStorage.setItem("firstVisit", "false");
      setIsOpen(true);
    }
  });

  return (
    <>
      <Helmet>
        <title>{t("page.tracker")}</title>
      </Helmet>

      <Container>
        <div className={style.wrapperStyle}>
          <div className={style.wrapperElement}>
            <button className={style.btnInfo} onClick={() => setIsOpen(true)}>
              <svg
                width="18"
                height="18"
                aria-label="Tour in web"
                className={style.iconInfo}
              >
                <use xlinkHref={`${sprite}#icon-info`}></use>
              </svg>
            </button>
            <Languages />
          </div>
          <div className={style.wrapperTracker} data-tour="step-1">
            <WaterMainInfo />
            <WaterDetailedInfo />
          </div>
        </div>
      </Container>
      <Modals />
    </>
  );
};

export default TrackerPage;
