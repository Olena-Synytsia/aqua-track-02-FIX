import { useEffect } from "react";
import WaterMainInfo from "../../components/TrackerPage/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/TrackerPage/WaterDailedInfo/WaterDetailedInfo.jsx";
import { useTour } from "@reactour/tour";
import style from "./TrackerPage.module.css";
// import sprite from "../../assets/icons/sprite.svg";
import Container from "../../shared/Container/Container.jsx";
import { icons as sprite } from "../../shared/icons";

const TrackerPage = () => {
  // const { t } = useTranslation();
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
          </div>
          <div className={style.wrapperTracker} data-tour="step-1">
            <WaterMainInfo />
            <WaterDetailedInfo />
          </div>
        </div>
      </Container>
    </>
  );
};

export default TrackerPage;
