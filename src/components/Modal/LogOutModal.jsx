import { useEffect } from "react";
import ReactDOM from "react-dom";

const LogOutModal = ({ onClose, userBarRef }) => {
  const handleOutsideClick = (e) => {
    if (userBarRef.current && !userBarRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
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
      <h3>Do you really want to leave?</h3>
      <button>Log Out</button>
      <button onClick={onClose}>Cancel</button>
    </div>,
    document.body
  );
};

export default LogOutModal;
