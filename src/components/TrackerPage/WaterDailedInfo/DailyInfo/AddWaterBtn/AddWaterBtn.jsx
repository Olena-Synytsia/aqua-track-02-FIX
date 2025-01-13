import { useState } from "react";
import WaterModal from "../../../../Modal/WaterModal/WaterModal.jsx";
import s from "./AddWaterBtn.module.css";
import { useDispatch } from "react-redux";
import { setOperationType } from "../../../../../redux/dailyInfo/dailyInfoSlice.js";

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    setIsOpen(true);
    dispatch(setOperationType("add"));
  };

  return (
    <>
      <button onClick={handleAdd} className={s.addBtn}>
        <svg className={s.iconPlus}>
          <use href="src/assets/sprite.svg#icon-plus"></use>
        </svg>
        Add water
      </button>
      {isOpen && <WaterModal onClose={() => setIsOpen(false)} />}
    </>
  );
};
export default AddWaterBtn;
