import ReactDOM from "react-dom";
import UserSettingsForm from "./UserSettingsForm";
import style from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ onClose = () => {}, onSubmit = () => {} }) => {
  console.log("onSubmit in UserSettingsModal:", onSubmit);

  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <h3 className={style.modalTitle}>Setting</h3>
        <UserSettingsForm onSubmit={onSubmit} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default UserSettingsModal;
