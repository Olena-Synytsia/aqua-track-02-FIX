import { useDispatch } from "react-redux";
import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import ChooseDate from "./ChooseDate/ChooseDate.jsx";
import s from "./DailyInfo.module.css";
import WaterList from "./WaterList/WaterList.jsx";
import { useEffect } from "react";
import { fetchWaterItem } from "../../../../redux/dailyInfo/dailyInfoOps.js";
// import { useSelect } from "@chakra-ui/react";
// import { selectDate } from "../../../../redux/water/selectors.js";

const DailyInfo = () => {
  // const day = useSelect(selectDate);
  const date = "2025-01-19";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaterItem(date));
  }, [date, dispatch]);
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
