import { useState } from "react";
import WaterModal from "../../../Modal/WaterModal/WaterModal.jsx";
import css from "./AddWaterB.module.css";
import { useDispatch } from "react-redux";
import { setOperationType } from "../../../../redux/dailyInfo/dailyInfoSlice.js";
import icon from "/sprite.svg";

const AddWaterB = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleAdd = () => {
    setIsOpen(true);
    dispatch(setOperationType("add"));
  };

  return (
    <>
      <button onClick={handleAdd} className={css.addButton}>
        <svg className={css.btnIcon}>
          <use href={`${icon}#icon-plus`}></use>
        </svg>
        <span className={css.btnTitle}>Add water</span>
      </button>
      {isOpen && <WaterModal onClose={() => setIsOpen(false)} />}
    </>
  );
};
export default AddWaterB;
