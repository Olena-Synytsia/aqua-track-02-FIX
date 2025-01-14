import WaterMainInfo from "../../components/TrackerPage/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/TrackerPage/WaterDailedInfo/WaterDetailedInfo.jsx";
import s from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <>
      <div className={s.wrapperTracker}>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </>
  );
};

export default TrackerPage;
