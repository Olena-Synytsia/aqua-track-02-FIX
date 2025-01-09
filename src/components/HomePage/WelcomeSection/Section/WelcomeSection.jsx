import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import s from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  return (
    <div className={s.section}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.appInfo}>
        <div className={s.titleList}>
          <h2 className={s.title}>Record daily water intake and track</h2>
          <h1 className={s.titleApp}>Water consumption tracker</h1>
        </div>
        <div className={s.linkApp}>
          <Link className={s.signup} to="/signup">
            <p>Try tracker</p>
          </Link>
          <Link className={s.signin} to="/signin">
            <p>Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
