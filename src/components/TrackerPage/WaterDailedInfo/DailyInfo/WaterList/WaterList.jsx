import { useSelector } from "react-redux";
import WaterItem from "./WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";
import { selectWaterItem } from "../../../../../redux/dailyInfo/dailyInfoSlice.js";

const WaterList = () => {
  const waterItems = useSelector(selectWaterItem);

  if (!waterItems || waterItems.length === 0) {
    return (
      <div className={s.content}>
        <p className={s.text}>No information is available</p>
      </div>
    );
  }

  return (
    <ul className={s.list}>
      {waterItems.map((item) => (
        <WaterItem key={item._id} {...item} />
      ))}
    </ul>
  );
};
export default WaterList;
