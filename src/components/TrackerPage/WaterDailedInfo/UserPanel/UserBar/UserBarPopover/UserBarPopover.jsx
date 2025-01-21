import { useEffect, useRef, useState } from "react";
import UserSettingsModal from "../../../../../Modal/UserSettingsModal";
import LogOutModal from "../../../../../Modal/LogOutModal";
import s from "./UserBarPopover.module.css";
import { CiSettings } from "react-icons/ci";
import { HiOutlineArrowUpTray } from "react-icons/hi2";

export const UserBarPopover = ({ onClose = () => {} }) => {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);
  const popoverRef = useRef(null); // для перевірки кліків поза поповером
  const userBarRef = useRef(null); // для позиціонування

  const toggleSettingsModal = () => {
    setSettingsModalOpen((prev) => !prev);
    if (isLogOutModalOpen) setLogOutModalOpen(false);
  };

  const toggleLogOutModal = () => {
    setLogOutModalOpen((prev) => !prev);
    if (isSettingsModalOpen) setSettingsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !isSettingsModalOpen &&
        !isLogOutModalOpen
      ) {
        onClose(); // Закриваємо поповер
      }
    };

    if (!isSettingsModalOpen && !isLogOutModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsModalOpen, isLogOutModalOpen, onClose]);

  return (
    <div className={s.modalPop} ref={popoverRef}>
      <div className={s.btnssettlog}>
        <button className={s.btnset} onClick={toggleSettingsModal}>
          <CiSettings className={s.icon} width="16" height="16" />
          Settings
        </button>
        <button className={s.btnout} onClick={toggleLogOutModal}>
          <HiOutlineArrowUpTray className={s.iconout} />
          Log Out
        </button>
      </div>
      {isSettingsModalOpen && (
        <UserSettingsModal
          onClose={() => setSettingsModalOpen(false)}
          userBarRef={userBarRef}
        />
      )}
      {isLogOutModalOpen && (
        <LogOutModal
          onClose={() => setLogOutModalOpen(false)}
          userBarRef={userBarRef}
        />
      )}
    </div>
  );
};

export default UserBarPopover;
