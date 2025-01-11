import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import ChooseDate from "./ChooseDate/ChooseDate.jsx";
import s from "./DailyInfo.module.css";
import WaterList from "./WaterList/WaterList.jsx";

const DailyInfo = () => {
  return (
    <div className={s.dailyInfo}>
      <div className={s.textAndBtn}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  );
};
export default DailyInfo;
