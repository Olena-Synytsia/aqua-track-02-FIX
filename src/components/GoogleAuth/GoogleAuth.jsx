import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/auth/slice.js"; // Ваш slice для токенів
import s from "./GoogleAuth.module.css";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
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
        setUser(data.user); // Зберігаємо дані користувача
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

      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <GoogleOAuthProvider clientId="155129163109-dfuie6f7ee4tjtojrmn18va2lq1tn2ff.apps.googleusercontent.com">
          <div className={s.googleWrapBtn} id="google-btn">
            <GoogleLogin
              flow="implicit" // Використовуємо потік без необхідності коду
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              // useOneTap={true} // Можна включити One Tap для автоматичної авторизації
            />
          </div>
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default GoogleAuth;
