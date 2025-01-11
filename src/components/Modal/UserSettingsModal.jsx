import { useEffect } from "react";
import ReactDOM from "react-dom";

const UserSettingsModal = ({ onClose, userBarRef }) => {
  // для обробки кліків поза модальним вікном
  const handleOutsideClick = (e) => {
    if (userBarRef.current && !userBarRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    // подія для кліків за межами
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "50%",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h3>User Settings</h3>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
};

export default UserSettingsModal;
