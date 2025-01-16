import { useState } from "react";
import WaterModal from "../../../Modal/WaterModal/WaterModal.jsx";
import css from "./AddWaterB.module.css";
import { useDispatch } from "react-redux";
import { setOperationType } from "../../../../redux/dailyInfo/dailyInfoSlice.js";
// import { setOperationType } from "../../../../../redux/dailyInfo/dailyInfoSlice.js";

const AddWaterB = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    setIsOpen(true);
    dispatch(setOperationType("add"));
  };

  return (
    <>
      <button onClick={handleAdd} className={css.addBtnb}>
        <svg className={css.iconPlusb}>
          <use href="src/assets/sprite.svg#icon-plus"></use>
        </svg>
        <p className={css.iconPlusw}>Add water</p>
      </button>
      {isOpen && <WaterModal onClose={() => setIsOpen(false)} />}
    </>
  );
};
export default AddWaterB;
