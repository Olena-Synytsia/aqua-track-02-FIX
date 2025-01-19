import { useDispatch } from "react-redux";
import { useState } from "react";
import style from "./DeleteWaterModal.module.css";
import { apiGetWaterDay } from "../../redux/water/operations";
import { addItems, closeModal } from "../../redux/dailyInfo/dailyInfoSlice";

const DeleteWaterModal = ({ onClose = () => {}, waterId, day }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteClick = async () => {
    try {
      dispatch(addItems({ id: waterId, remove: true }));

      await dispatch(apiGetWaterDay(day)).unwrap();

      dispatch(closeModal());
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while deleting.");
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContainer}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={style.title}>Delete Water Entry</h2>
        <p className={style.message}>
          Are you sure you want to delete this entry?
        </p>
        {errorMessage && <p className={style.error}>{errorMessage}</p>}
        <div className={style.buttonContainer}>
          <button
            type="button"
            className={style.deleteButton}
            onClick={handleDeleteClick}
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
