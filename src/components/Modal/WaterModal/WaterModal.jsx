import { IoCloseOutline } from "react-icons/io5";
import s from "./WaterModal.module.css";
import { useEffect } from "react";
import WaterForm from "../WaterForm/WaterForm.jsx";
import { useSelector } from "react-redux";
import { selectOperationType } from "../../../redux/dailyInfo/dailyInfoSlice.js";

const WaterModal = ({ onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const operationType = useSelector(selectOperationType);

  const title =
    operationType === "add" ? "Add water" : "Edit the entered amount of water";

  return (
    <div onClick={handleBackdropClick} className={s.wrapper}>
      <div className={s.content}>
        <>
          <h2>{title}</h2>
        </>
        <button onClick={onClose} className={s.closeBtn}>
          <IoCloseOutline className={s.iconBtn} />
        </button>
        <WaterForm onClose={onClose} />
      </div>
    </div>
  );
};
export default WaterModal;
