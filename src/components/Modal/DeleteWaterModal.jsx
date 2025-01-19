import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import style from "./DeleteWaterModal.module.css";
import { deleteWaterRecord } from "../../redux/water-delete/operations";
const DeleteWaterModal = ({ onClose = () => {}, idWaterRecord }) => {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
		if (!idWaterRecord || typeof idWaterRecord !== "string") {
			console.error("Invalid or missing idWaterRecord:", idWaterRecord);
			setErrorMessage("Water record ID is missing or invalid.");
		}
	}, [idWaterRecord]);
	const handleDeleteClick = async () => {
		try {
			// Проверка параметра idWaterRecord перед удалением
			if (!idWaterRecord || typeof idWaterRecord !== "string") {
				throw new Error("Water record ID is missing or invalid.");
			}
			// Удаление записи через Redux action
			await dispatch(deleteWaterRecord(idWaterRecord)).unwrap();
			// Закрытие модального окна после успешного удаления
			onClose();
		} catch (error) {
			console.error("Error during deletion:", error);
			setErrorMessage(
				error.message || "An error occurred while deleting. Please try again."
			);
		}
	};
	return (
		<div className={style.modalOverlay} onClick={onClose}>
			<div
				className={style.modalContainer}
				onClick={(event) => event.stopPropagation()}>
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
						type='button'
						className={style.deleteButton}
						onClick={handleDeleteClick}
						disabled={!idWaterRecord || errorMessage}>
						Delete
					</button>
					<button
						type='button'
						className={style.cancelButton}
						onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
export default DeleteWaterModal;
