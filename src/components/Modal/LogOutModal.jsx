import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./LogOutModal.module.css";
import { clearUser } from "../../redux/auth/slice"; // Обновленный импорт
import { logout } from "../../redux/auth/operations"; // Импорт logout

const LogOutModal = ({ onClose = () => {}, onLogOut = () => {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken); // Получаем токен из Redux

  const handleLogOutClick = async () => {
    if (!accessToken) {
      console.warn("No access token found. Proceeding with client logout.");
      finalizeLogout();
      return;
    }

    try {
      // Отправляем запрос logout
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error("Error during logout request:", error);
    } finally {
      finalizeLogout();
    }
  };

  const finalizeLogout = () => {
    // Очищаем состояние Redux и localStorage
    dispatch(clearUser());
    localStorage.clear();
    navigate("/", { replace: true }); // Перенаправляем на главную страницу
    onLogOut(); // Дополнительная логика при logout
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


