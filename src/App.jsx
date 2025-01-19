// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TrackerPage from "./pages/TrackerPage/TrackerPage";
import SharedLayout from "./components/SharedLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { selectIsRefreshing, selectTokens } from "./redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./redux/auth/slice";
import { refresh } from "./redux/auth/operations";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectTokens); // Дістаємо токен із Redux
  const isRefreshing = useSelector(selectIsRefreshing); // Стан оновлення користувача

  useEffect(() => {
    // Перевіряємо токен у localStorage
    const localToken = localStorage.getItem("accessToken");
    if (localToken) {
      dispatch(setToken({ accessToken: localToken })); // Зберігаємо токен у Redux
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      // Якщо токен є, оновлюємо користувача
      dispatch(refresh());
    }
  }, [dispatch, token]);

  if (isRefreshing) {
    // Відображаємо завантаження, якщо refresh() ще працює
    return <h2>Loading...</h2>;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute
              component={<RegisterPage />}
              redirectTo="/tracker"
            />
          }
        />
        <Route
          path="signin"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute component={<TrackerPage />} redirectTo="/signin" />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
