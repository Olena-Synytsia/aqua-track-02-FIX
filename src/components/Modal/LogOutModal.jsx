import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./LogOutModal.module.css";
import { clearUser } from "../../redux/auth/slice"; // Обновленный импорт
import { logout } from "../../redux/auth/operations"; // Импорт logout
import { selectTokens } from "../../redux/auth/selectors";

const LogOutModal = ({ onClose = () => {}, onLogOut = () => {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Безпечне отримання токена з Redux
  const accessToken = useSelector(selectTokens);

  const handleLogOutClick = async () => {
    if (!accessToken) {
      console.warn(
        "No access token found. Proceeding with client-side logout."
      );
      finalizeLogout();
      return;
    }

    try {
      // Відправка запиту logout
      await dispatch(logout()).unwrap();
      console.log("Successfully logged out on server.");
    } catch (error) {
      console.error("Error during logout request:", error);
    } finally {
      finalizeLogout();
    }
  };

  const finalizeLogout = () => {
    // Очищення стану Redux і localStorage
    dispatch(clearUser());
    localStorage.removeItem("accessToken"); // Видалення токена з localStorage
    navigate("/", { replace: true }); // Перенаправлення на головну сторінку
    onLogOut(); // Виконання додаткової логіки, якщо передано через props
  };

  return ReactDOM.createPortal(
    <div
      className={style.modalOverlay}
      onClick={onClose} // Закрытие модального окна при клике на оверлей
    >
      <div
        className={style.modalContainer}
        onClick={(event) => event.stopPropagation()} // Предотвращение всплытия события
      >
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={style.title}>Log out</h2>
        <p className={style.message}>Do you really want to leave?</p>
        <div className={style.buttonContainer}>
          <button
            type="button"
            className={style.logOutButton}
            onClick={handleLogOutClick} // Обработка выхода из аккаунта
          >
            Log out
          </button>
          <button
            type="button"
            className={style.cancelButton}
            onClick={onClose} // Закрытие модального окна
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogOutModal;
