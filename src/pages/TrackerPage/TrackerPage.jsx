import WaterDetailedInfo from "../../components/TrackerPage/WaterDailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/TrackerPage/WaterMainInfo/WaterMainInfo";
import s from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <>
      <div className="container">
        <div className={s.wrapperTracker}>
          <WaterMainInfo />
          <WaterDetailedInfo />
        </div>
      </div>
    </>
  );
};

export default TrackerPage;
