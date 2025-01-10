import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import MonthInfo from "./MonthInfo/MonthInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";

const WaterDetailedInfo = () => {
  return (
    <>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </>
  );
};
export default WaterDetailedInfo;
