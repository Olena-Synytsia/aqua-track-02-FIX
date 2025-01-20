
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./LogOutModal.module.css";
import { logout } from "../../redux/auth/operations";
import { clearUser } from "../../redux/auth/slice";
import { IoCloseOutline } from "react-icons/io5";

const LogOutModal = ({ onClose = () => {}, onLogOut = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch {
      dispatch(clearUser());
      localStorage.clear();
      navigate("/", { replace: true });
      onLogOut();
    } finally {
      dispatch(clearUser());
      localStorage.clear();
      navigate("/", { replace: true });
      onLogOut();
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContainer}
        onClick={(event) => event.stopPropagation()} // Предотвращение всплытия события
      >
        <button className={style.modalCloseBtn} onClick={onClose}>
        <IoCloseOutline className={style.closeBtn} />
        </button>
        <h2 className={style.title}>Log out</h2>
        <p className={style.message}>Do you really want to leave?</p>
        <div className={style.buttonContainer}>
          <button
            type="button"
            className={style.logOutButton}
            onClick={handleLogOutClick}>
            Log out
          </button>
          <button
            type="button"
            className={style.cancelButton}
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;

// import style from "./LogOutModal.module.css";
// import { useDispatch } from "react-redux";

// const LogOutModal = ({ onClose = () => {}, onLogOut = () => {} }) => {
//   const dispatch = useDispatch();

//   const handleLogOutClick = () => {
//     onLogOut();
//     onClose();
//   };

//   return (
//     <div className={style.modalOverlay} onClick={onClose}>
//       <div
//         className={style.modalContainer}
//         onClick={(event) => event.stopPropagation()}
//       >
//         <button className={style.closeButton} onClick={onClose}>
//           &times;
//         </button>
//         <h2 className={style.title}>Log out</h2>
//         <p className={style.message}>Do you really want to leave?</p>
//         <div className={style.buttonContainer}>
//           <button
//             className={style.logOutButton}
//             onClick={() => dispatch(handleLogOutClick)}
//           >
//             Log out
//           </button>
//           <button className={style.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogOutModal;
