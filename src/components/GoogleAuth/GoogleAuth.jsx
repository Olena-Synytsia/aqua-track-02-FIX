import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/auth/slice.js"; // Ваш slice для токенів
import s from "./GoogleAuth.module.css";

const GoogleAuth = () => {
  const setUser = useState(null);
  const [notification, setNotification] = useState(null); // Локальний стан для сповіщень
  const dispatch = useDispatch(); // Підключаємо Redux
  const navigate = useNavigate(); // Для навігації після успішного входу

  // Функція для обробки успішного логіну
  const handleLoginSuccess = async (response) => {
    console.log("Google Response:", response);
    try {
      // Відповідь Google містить ID Token
      const { credential } = response;
      console.log("ID Token:", credential);

      // Надсилаємо ID Token на сервер для перевірки та отримання токенів
      const res = await fetch(
        "https://aqua-api-fkf8.onrender.com/auth/confirm-oauth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: credential }), // Передаємо ID Token
        }
      );

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        // Якщо сервер повернув токен, зберігаємо його через Redux
        dispatch(setToken({ accessToken: data.data.accessToken }));
        localStorage.setItem("accessToken", data.data.accessToken); // Зберігаємо в localStorage
        setUser(data.data.user); // Зберігаємо дані користувача
        navigate("/tracker"); // Перехід на сторінку приладу
      } else {
        setNotification({
          message: "Failed to authenticate",
          type: "error",
        });
        console.error("Failed to authenticate");
      }
    } catch (error) {
      // Обробка помилки і додавання сповіщення в локальний стан
      setNotification({
        message: error.message || "Error during Google login.",
        type: "error",
      });
      console.error("Error during Google login:", error);
    }
  };

  // Функція для обробки помилок
  const handleLoginFailure = (error) => {
    setNotification({
      message: error.message || "Login failed.",
      type: "error",
    });
    console.error("Login failed:", error);
  };

  return (
    <div>
      {notification && (
        <div style={{ color: notification.type === "error" ? "red" : "green" }}>
          {notification.message}
        </div>
      )}

      <GoogleLogin
        flow="implicit" // Використовуємо потік без необхідності коду
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        render={(renderProps) => (
          <button
            id="googleBtn"
            className={s.customGoogleButton} // Використовуємо кастомний стиль
            onClick={renderProps.onClick} // Викликаємо onClick з renderProps
            disabled={renderProps.disabled} // Додаємо disabled, якщо кнопка неактивна
          >
            <span className={s.icon}></span>
            <span className={s.buttonText}>Login with Google</span>
          </button>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
