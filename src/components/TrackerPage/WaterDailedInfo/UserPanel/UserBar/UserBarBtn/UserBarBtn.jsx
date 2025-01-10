import { useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";

const UserBarBtn = ({ userName, avatarUrl }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopoverOpen((prev) => !prev); // Перемикає стан поповеру
  };

  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        <span>{userName}</span>
        <img
          src={avatarUrl}
          alt="User Avatar"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            marginLeft: "8px",
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            marginLeft: "8px",
            cursor: "pointer",
            transform: isPopoverOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <path d="M12 18L6 12H18L12 18Z" />
        </svg>
      </button>
      {isPopoverOpen && (
        <UserBarPopover onClose={() => setIsPopoverOpen(false)} />
      )}
    </div>
  );
};

export default UserBarBtn;
