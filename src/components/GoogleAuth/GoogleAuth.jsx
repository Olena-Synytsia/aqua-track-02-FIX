import { useState, useEffect, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/auth/slice.js"; // Ваш slice для токенів
import "./index.css";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null); // Локальний стан для сповіщень
  const dispatch = useDispatch(); // Підключаємо Redux
  const navigate = useNavigate(); // Для навігації після успішного входу
  const iframeRef = useRef(null); // Створюємо ref для iframe

  useEffect(() => {
    // Додайте стилі після завантаження компоненту GoogleLogin
    const style = document.createElement("style");
    style.innerHTML = `
      .nsm7Bb-HzV7m-LgbsSe{
          display: flex;
  gap: 20px;
  height: 50px;
  padding: 16px;
  border: none;
  border-radius: 30px;
  background-color: #f0eff4;
  align-items: center;
  justify-content: center;
  color: #323f47;
  border: 1px solid #323f47;
  background-color: rgba(118, 216, 126, 0.2);
      }
      .customGoogleBtn:hover {
        border: 1px solid #87d28d;
  background-color: rgba(118, 216, 126, 0.2);
      }
      .customGoogleBtn:focus {
        outline: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Очистити стилі, якщо компонент буде видалено
      document.head.removeChild(style);
    };
  }, []);

  // Функція для обробки успішного логіну
  const handleLoginSuccess = async (response) => {
    console.log("Google Response:", response);
    try {
      // Відповідь Google містить ID Token
      const { credential } = response;
      console.log("ID Token:", credential);

      // Надсилаємо ID Token на сервер для перевірки та отримання токенів
      const res = await fetch(
        "https://aqua-api-fix.onrender.com/auth/confirm-oauth",
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
        console.log(data.data.user);
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
    <div className="GoogleAuthWrap">
      {notification && (
        <div style={{ color: notification.type === "error" ? "red" : "green" }}>
          {notification.message}
        </div>
      )}

      {user && (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
          {/* Ти можеш додати більше полів, які отримуєш в response */}
        </div>
      )}
      <div className="customGoogleBtn">
        <GoogleLogin
          className="nsm7Bb-HzV7m-LgbsSe"
          flow="implicit" // Використовуємо потік без необхідності коду
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
        />
      </div>
    </div>
  );
};

export default GoogleAuth;
