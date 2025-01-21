import { useRef, useState } from "react";
import UserSettingsModal from "../../../../../Modal/UserSettingsModal";
import LogOutModal from "../../../../../Modal/LogOutModal";
import s from "./UserBarPopover.module.css";
import { CiSettings } from "react-icons/ci";
import { HiOutlineArrowUpTray } from "react-icons/hi2";

export const UserBarPopover = ({ onClose = () => {} }) => {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);

  const userBarRef = useRef(null); // для позиціонування

  const toggleSettingsModal = () => {
    setSettingsModalOpen((prev) => !prev);
    if (isLogOutModalOpen) setLogOutModalOpen(false);
  };

  const toggleLogOutModal = () => {
    setLogOutModalOpen((prev) => !prev);
    if (isSettingsModalOpen) setSettingsModalOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modalPop} onClick={handleBackdropClick}>
      <div
        // onClick={(e) => e.stopPropagation()} // Зупиняє подію, щоб клік на кнопки не закривав поповер
        className={s.btnssettlog}
      >
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
