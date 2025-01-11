import { useRef, useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";
import s from "./UserBarBtn.module.css";

const UserBarBtn = ({ userName, avatarUrl }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    setIsPopoverOpen((prev) => !prev); // Перемикає стан поповеру
  };

  return (
    <div
      className={s.samewidth}
      style={{
        position: "relative",
      }}
    >
      <div>
        <button
          className={s.btnUser}
          type="button"
          ref={buttonRef}
          onClick={handleButtonClick}
        >
          <span className={s.name}>{userName}</span>
          <img
            src={avatarUrl}
            alt="User Avatar"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              marginLeft: "8px",
              objectFit: "cover",
            }}
          />
          <svg
            width="16"
            height="16"
            style={{
              marginLeft: "8px",
              cursor: "pointer",
              transform: isPopoverOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <use href="src/assets/sprite.svg#icon-chevron-down-1"></use>
          </svg>
        </button>
      </div>
      {isPopoverOpen && (
        <div>
          <UserBarPopover onClose={() => setIsPopoverOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default UserBarBtn;
