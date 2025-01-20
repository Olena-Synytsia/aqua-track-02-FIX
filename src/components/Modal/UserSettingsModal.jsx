import { useEffect } from "react";
import ReactDOM from "react-dom";
import UserSettingsForm from "./UserSettingsForm";
import style from "./UserSettingsModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

const UserSettingsModal = ({ onClose = () => {}, onSubmit = () => {} }) => {
  console.log("onSubmit in UserSettingsModal:", onSubmit);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.modalCloseBtn} onClick={onClose}>
          <IoCloseOutline className={style.closeBtn} />
        </button>
        <h3 className={style.modalTitle}>Setting</h3>
        <UserSettingsForm onSubmit={onSubmit} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default UserSettingsModal;
