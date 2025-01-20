import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import s from "./WaterItem.module.css";
import { useState } from "react";
import WaterModal from "../../../../../Modal/WaterModal/WaterModal.jsx";
import { useDispatch } from "react-redux";
import {
  setItemId,
  setOperationType,
} from "../../../../../../redux/dailyInfo/dailyInfoSlice.js";
import DeleteWaterModal from "../../../../../Modal/DeleteWaterModal";

const WaterItem = ({ _id, date, volume }) => {
  const dispatch = useDispatch();

  const formateVolume = (volume) => {
    if (volume < 1000) {
      return `${volume} ml`;
    } else {
      let result = (volume / 1000).toFixed(3);
      return result.replace(/\.?0+$/, "") + " L";
    }
  };

  const extractTime = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    dispatch(setItemId(_id));
    setIsOpen(true);
    dispatch(setOperationType("edit"));
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <li className={s.item}>
        <svg className={s.icon}>
          <use href="src/assets/sprite.svg#icon-mage_water-glass-fill"></use>
        </svg>
        <div className={s.indicators}>
          <p className={s.value}>{formateVolume(volume)}</p>
          <p className={s.time}>{extractTime(date)}</p>
        </div>
        <div className={s.buttons}>
          <button className={s.btn} onClick={handleEdit}>
            <FiEdit2 />
          </button>

          <button className={s.btn} onClick={handleDelete}>
            <AiOutlineDelete />
          </button>
        </div>
      </li>
      {isOpen && <WaterModal onClose={() => setIsOpen(false)} />}
      {isDeleteModalOpen && (
        <DeleteWaterModal
          onClose={() => setIsDeleteModalOpen(false)}
          waterId={_id}
        />
      )}
    </>
  );
};
export default WaterItem;
