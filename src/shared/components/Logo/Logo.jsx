import { NavLink } from "react-router-dom";
import style from "./LoginPage.module.css";

const LoginPage = ({className}) => {
  return (
  <>
        <NavLink to="/" className={`${style.logo} ${className}`}>
          AquaTrack
        </NavLink>
  </>
  );

};

export default LoginPage;
