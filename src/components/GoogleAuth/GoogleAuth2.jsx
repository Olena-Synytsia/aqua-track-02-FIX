import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/auth/slice.js"; // Ваш slice для токенів
import { useGoogleLogin } from "@react-oauth/google";
import "./index.css"; // Ваші стилі для кнопки

const GoogleAuth2 = () => {
  const [user, setUser] = useState(null); // Додаємо стан для користувача
  console.log("USER", user);
  const [notification, setNotification] = useState(null); // Локальний стан для сповіщень
  const dispatch = useDispatch(); // Підключаємо Redux
  const navigate = useNavigate(); // Для навігації після успішного входу

  useEffect(() => {
    // Завантажуємо Google API скрипт
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Функція для обробки успішного логіну
  const handleLoginSuccess = async (response) => {
    console.log("Google Response:", response);

    try {
      // Відповідь Google містить ID Token
      const { credential, access_token } = response;

      // Логування отриманих токенів
      console.log("ID Token:", credential);
      console.log("Access Token:", access_token);

      // Якщо є ID Token, використовуємо його
      const tokenToSend = credential || access_token;

      // Надсилаємо токен на сервер для перевірки та отримання токенів
      const res = await fetch(
        "https://aqua-api-fix.onrender.com/auth/confirm-oauth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: tokenToSend }), // Передаємо ID Token або Access Token
        }
      );

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        // Якщо сервер повернув токен, зберігаємо його через Redux
        dispatch(setToken({ accessToken: data.data.accessToken }));
        localStorage.setItem("accessToken", data.data.accessToken); // Зберігаємо в localStorage
        console.log("User Data:", data.data.user);
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

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      setNotification({
        message: error.message || "Login failed.",
        type: "error",
      });
      console.error("Login failed:", error);
    },
    scope: "openid profile email", // Переконайтеся, що ви включили ці права
    response_type: "id_token", // Вказуємо, що хочемо отримати id_token
  });

  return (
    <div className="GoogleAuthWrap">
      {notification && (
        <div style={{ color: notification.type === "error" ? "red" : "green" }}>
          {notification.message}
        </div>
      )}

      <div className="customGoogleBtn" onClick={login}>
        <span>Log in with Google</span>
      </div>
    </div>
  );
};

export default GoogleAuth2;
