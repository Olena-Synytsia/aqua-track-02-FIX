import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import s from "./WaterItem.module.css";
import { useState } from "react";
import WaterModal from "../../../../../Modal/WaterModal/WaterModal.jsx";
import { useDispatch } from "react-redux";
import { setOperationType } from "../../../../../../redux/dailyInfoSlice.js";

const WaterItem = ({ time, volume }) => {
  const dispatch = useDispatch();
  const formateVolume = (volume) => {
    if (volume < 1000) {
      return `${volume} ml`;
    } else {
      let result = (volume / 1000).toFixed(3);
      return result.replace(/\.?0+$/, "") + " L";
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(true);
    dispatch(setOperationType("edit"));
  };
  return (
    <>
      <li className={s.item}>
        <svg className={s.icon}>
          <use href="src/assets/sprite.svg#icon-mage_water-glass-fill"></use>
        </svg>
        <div className={s.indicators}>
          <p className={s.value}>{formateVolume(volume)}</p>
          <p className={s.time}>{time}</p>
        </div>
        <div className={s.buttons}>
          <button className={s.btn} onClick={handleEdit}>
            <FiEdit2 />
          </button>
          <button className={s.btn}>
            <AiOutlineDelete />
          </button>
        </div>
      </li>
      {isOpen && <WaterModal onClose={() => setIsOpen(false)} />}
    </>
  );
};
export default WaterItem;
