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

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="signup"
          element={
            <RestrictedRoute
              component={<RegisterPage />}
              redirectTo="/signin"
            />
          }
        />
        <Route
          path="signin"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/signup" />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute component={<TrackerPage />} redirectTo="/signin" />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
