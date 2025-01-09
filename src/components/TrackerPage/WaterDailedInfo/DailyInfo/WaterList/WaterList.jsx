import WaterItem from "./WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";

const WaterList = () => {
  return (
    <ul className={s.list}>
      <WaterItem />
      <WaterItem />
      <WaterItem />
      <WaterItem />
    </ul>
  );
};
export default WaterList;
