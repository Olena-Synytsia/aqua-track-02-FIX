import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/auth/selectors";

export const RestrictedRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
