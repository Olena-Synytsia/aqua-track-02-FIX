import { useEffect } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import { useTour } from "@reactour/tour";
import style from "./TrackerPage.module.css";
import sprite from "../../assets/icons/sprite.svg";

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
      <div className={style.wrapperTracker} data-tour="stap-1">
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </>
  );
};

export default TrackerPage;
