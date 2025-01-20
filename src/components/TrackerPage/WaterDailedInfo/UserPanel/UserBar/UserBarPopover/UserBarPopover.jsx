import { useRef, useState } from "react";
import UserSettingsModal from "../../../../../Modal/UserSettingsModal";
import LogOutModal from "../../../../../Modal/LogOutModal";
import s from "./UserBarPopover.module.css";
import { CiSettings } from "react-icons/ci";
import { HiOutlineArrowUpTray } from "react-icons/hi2";

export const UserBarPopover = () => {
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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (userBarRef.current && !userBarRef.current.contains(event.target)) {
  //       setSettingsModalOpen(false);
  //       setLogOutModalOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div ref={userBarRef}>
      <div className={s.btnssettlog}>
        <button className={s.btnset} onClick={toggleSettingsModal}>
          {/* <svg
            className={s.svgsett}
            width="16"
            height="16"
            shapeRendering="crispEdges"
          >
            <use href="src/assets/sprite.svg#icon-log-out"></use>
          </svg> */}
          <CiSettings className={s.icon} width="16" height="16" />
          Settings
        </button>
        <button className={s.btnout} onClick={toggleLogOutModal}>
          {/* <svg
            className={s.svgsett}
            width="16"
            height="16"
            shapeRendering="crispEdges"
          >
            <use href="src/assets/sprite.svg#icon-log-out"></use>
          </svg> */}
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
