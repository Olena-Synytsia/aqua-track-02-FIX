import { useSelector } from "react-redux";
import WaterItem from "./WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";
import { selectWaterItem } from "../../../../../redux/dailyInfoSlice.js";

const WaterList = () => {
  const waterItems = useSelector(selectWaterItem);
  return (
    <ul className={s.list}>
      {waterItems.map((item) => (
        <WaterItem key={item.id} {...item} />
      ))}
    </ul>
  );
};
export default WaterList;
