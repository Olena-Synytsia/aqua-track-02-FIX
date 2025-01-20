import { useEffect, useRef, useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";
import s from "./UserBarBtn.module.css";
import { useSelector } from "react-redux";

const UserBarBtn = ({ userName, avatarUrl }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const selectedImage = useSelector((state) => state.user.user?.photo);

  const [storedAvatar, setStoredAvatar] = useState(() => {
    // Отримання картинки з localStorage або використання avatarUrl за замовчуванням
    const savedAvatar = localStorage.getItem("userAvatar");
    return savedAvatar ? savedAvatar : avatarUrl;
  });

  const handleButtonClick = () => {
    setIsPopoverOpen((prev) => !prev); // Перемикає стан поповеру
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       popoverRef.current &&
  //       !popoverRef.current.contains(event.target) &&
  //       buttonRef.current &&
  //       !buttonRef.current.contains(event.target)
  //     ) {
  //       setIsPopoverOpen(false);
  //     }
  //   };

  //   if (isPopoverOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isPopoverOpen]);

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("userAvatar", selectedImage);
      setStoredAvatar(selectedImage); // Оновлення локального стану
    }
  }, [selectedImage]);

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
            src={storedAvatar} // Завжди використовує збережений аватар або початковий
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
            viewBox="0 0 16 16"
            style={{
              marginLeft: "8px",
              cursor: "pointer",
              transform: isPopoverOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <use href="/../../../../../assets/sprite.svg#icon-chevron-down-1" />
          </svg>
        </button>
      </div>
      {isPopoverOpen && (
        <div ref={popoverRef}>
          <UserBarPopover onClose={() => setIsPopoverOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default UserBarBtn;
