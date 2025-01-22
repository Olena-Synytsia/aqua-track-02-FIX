import { useState, useEffect } from "react";
import style from "./DeleteWaterModal.module.css";
import { useDispatch } from "react-redux";

import { deleteWaterItem } from "../../redux/dailyInfo/dailyInfoOps";
import { fetchWaterPercent } from "../../redux/dailyNorma/slice.js";
import dayjs from "dayjs";
import { fetchWaterPer } from "../../redux/monthInfo/getWaterPercent.js";
import { IoCloseOutline } from "react-icons/io5";
// import { selectItemId } from "../../redux/dailyInfo/dailyInfoSlice";

const DeleteWaterModal = ({ waterId, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  // const idItem = useSelector(selectItemId);

  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const todayForMonth = dayjs(new Date()).format("YYYY-MM");

  const handleDelete = async () => {
    if (waterId)
      try {
        await dispatch(deleteWaterItem(waterId)).unwrap();
        console.log("Water record successfully deleted:", waterId);
        dispatch(fetchWaterPer(todayForMonth));
        dispatch(fetchWaterPercent(today));
        onClose();
      } catch (error) {
        console.error("Error deleting water record:", error);
        setErrorMessage(
          error.message || "An error occurred while deleting. Please try again."
        );
      }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    // Це для закривання модалки через Escape перевір чи буде працювати

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

  return (
    <div onClick={handleBackdropClick} className={style.modalOverlay}>
      <div
        className={style.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.modalCloseBtn} onClick={onClose}>
        <IoCloseOutline className={style.closeBtn} />
        </button>
        <h2 className={style.title}>Delete Entry</h2>
        <p className={style.message}>
          Are you sure you want to delete this entry?
        </p>
        {errorMessage && <p className={style.error}>{errorMessage}</p>}
        <div className={style.buttonContainer}>
          <button
            type="button"
            className={style.deleteButton}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className={style.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
