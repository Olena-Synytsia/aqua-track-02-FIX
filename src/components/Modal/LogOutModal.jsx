import ReactDOM from "react-dom";
import style from "./LogOutModal.module.css";

const LogOutModal = ({ onClose = () => {}, onLogOut = () => {} }) => {
  const handleLogOutClick = () => {
    onLogOut();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContainer}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={style.title}>Log out</h2>
        <p className={style.message}>Do you really want to leave?</p>
        <div className={style.buttonContainer}>
          <button className={style.logOutButton} onClick={handleLogOutClick}>
            Log out
          </button>
          <button className={style.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogOutModal;
