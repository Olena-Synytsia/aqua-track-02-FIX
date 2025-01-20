import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import style from "./DeleteWaterModal.module.css";
import { deleteWaterRecord } from "../../redux/water-delete/operations";

const DeleteWaterModal = ({ idWaterRecord, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleDelete = async () => {
    try {
      if (!idWaterRecord || typeof idWaterRecord !== "string") {
        throw new Error("Water record ID is missing or invalid.");
      }

      console.log("Attempting to delete record with ID:", idWaterRecord);

      await dispatch(deleteWaterRecord(idWaterRecord)).unwrap();
      console.log("Record successfully deleted:", idWaterRecord);

      onClose();
    } catch (error) {
      console.error("Error during deletion:", error);
      setErrorMessage(
        error.message || "An error occurred while deleting. Please try again."
      );
    }
  };

  return (
    <div onClick={handleBackdropClick} className={style.modalOverlay}>
      <div
        className={style.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.closeButton} onClick={onClose}>
          &times;
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
            disabled={!idWaterRecord}
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



