import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";

const WaterDetailedInfo = () => {
  return (
    <>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
      <UserPanel />
    </>
  );
};
export default WaterDetailedInfo;
