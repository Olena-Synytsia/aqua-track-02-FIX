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
import { fetchCurrentUser } from "./redux/auth/operations";
import { setToken } from "./redux/auth/slice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectTokens);

  useEffect(() => {
    // Перевіряємо, чи є токен у localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setToken({ accessToken: token })); // Оновлюємо Redux-стан токеном
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser);
    }
  }, [dispatch, token]);

  return selectIsRefreshing ? (
    <h2>Loading...</h2>
  ) : (
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
