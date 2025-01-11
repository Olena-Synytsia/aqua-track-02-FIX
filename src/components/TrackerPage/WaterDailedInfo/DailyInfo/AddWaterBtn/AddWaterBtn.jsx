import { useState } from "react";
import WaterModal from "../../../../Modal/WaterModal/WaterModal.jsx";
import s from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [operationType, setOperationType] = useState("");

  const handleAdd = () => {
    setIsOpen(true);
    setOperationType("add");
  };

  return (
    <>
      <button onClick={handleAdd} className={s.addBtn}>
        <svg className={s.iconPlus}>
          <use href="src/assets/sprite.svg#icon-plus"></use>
        </svg>
        Add water
      </button>
      {isOpen && (
        <WaterModal
          operationType={operationType}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
export default AddWaterBtn;
