import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import s from "./WaterItem.module.css";

const WaterItem = ({ id, value = "250 ml", time = "07:00" }) => {
  return (
    <li className={s.item}>
      <svg className={s.icon}>
        <use href="src/assets/sprite.svg#icon-mage_water-glass-fill"></use>
      </svg>
      <div className={s.indicators}>
        <p className={s.value}>{value}</p>
        <p className={s.time}>{time}</p>
      </div>
      <div className={s.buttons}>
        <button className={s.btn} onClick={id}>
          <FiEdit2 />
        </button>
        <button className={s.btn} onClick={id}>
          <AiOutlineDelete />
        </button>
      </div>
    </li>
  );
};
export default WaterItem;
