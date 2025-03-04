// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refresh } from "./redux/auth/operations";
import { selectIsRefreshing, selectTokens } from "./redux/auth/selectors";
import { setToken } from "./redux/auth/slice";
import { Suspense, lazy } from "react";
import Loader from "./components/HomePage/WelcomeSection/Loader/Loader.jsx";
import "./App.css";
const SharedLayout = lazy(() => import("./components/SharedLayout.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));

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
  // Відображаємо завантаження, якщо refresh() ще працює
  return isRefreshing ? null : (
    <Suspense
      fallback={
        <h2>
          <Loader />
        </h2>
      }
    >
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
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/tracker"
              />
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
    </Suspense>
  );
}

export default App;
