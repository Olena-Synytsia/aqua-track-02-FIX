import { useState, useRef, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/auth/slice.js"; // Ваш slice для токенів
import "./index.css";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null); // Локальний стан для сповіщень
  const [isGoogleLoginLoaded, setIsGoogleLoginLoaded] = useState(false); // Стан для відстеження завантаження бібліотеки
  const dispatch = useDispatch(); // Підключаємо Redux
  const navigate = useNavigate(); // Для навігації після успішного входу
  const googleBtnRef = useRef(null);

  // Завантаження Google API скрипта
  useEffect(() => {
    const loadGoogleLoginScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => setIsGoogleLoginLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleLoginScript();

    return () => {
      // Очистити після відключення компонента
      const script = document.querySelector(
        `script[src="https://accounts.google.com/gsi/client"]`
      );
      if (script) script.remove();
    };
  }, []);

  // Функція для обробки успішного логіну
  const handleLoginSuccess = async (response) => {
    console.log("Google Response:", response);

    try {
      const { credential } = response;
      if (!credential) {
        setNotification({
          message: "No credential received.",
          type: "error",
        });
        return;
      }

      console.log("ID Token:", credential);

      // Надсилаємо ID Token на сервер для перевірки та отримання токенів
      const res = await fetch(
        "https://aqua-api-fix.onrender.com/auth/confirm-oauth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: credential }),
        }
      );

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        dispatch(setToken({ accessToken: data.data.accessToken }));
        localStorage.setItem("accessToken", data.data.accessToken);
        setUser(data.data.user); // Зберігаємо дані користувача
        navigate("/tracker"); // Перехід на сторінку приладу
      } else {
        setNotification({
          message: "Failed to authenticate",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: error.message || "Error during Google login.",
        type: "error",
      });
    }
  };

  const handleLoginFailure = (error) => {
    setNotification({
      message: error.message || "Login failed.",
      type: "error",
    });
  };

  return (
    <div className="GoogleAuthWrap">
      {notification && (
        <div
          style={{
            color: notification.type === "error" ? "red" : "green",
            marginBottom: "20px",
          }}
        >
          {notification.message}
        </div>
      )}

      {user && (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
        </div>
      )}

      {/* Ваш кастомний UI для кнопки */}
      <div className="customGoogleBtn">
        {/* Перевіряємо, чи бібліотека завантажена */}
        {isGoogleLoginLoaded && (
          <GoogleLogin
            ref={googleBtnRef}
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            useOneTap={true} // Можна активувати функцію "One Tap"
          />
        )}

        {/* Кастомна кнопка для виклику GoogleLogin */}
        <button
          className="googleBtn" // Ваш стиль для кнопки
          onClick={() => document.querySelector(".nsm7Bb-HzV7m-LgbsSe").click()} // натискання кастомної кнопки
        >
          <img src="/path-to-google-logo.svg" alt="Google" /> Sign in with
          Google
        </button>
      </div>
    </div>
  );
};

export default GoogleAuth;
