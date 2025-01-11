import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import Loader from "../Loader/Loader";
import s from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [location]);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={s.section}>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className={s.logo}>
            <Logo />
          </div>
          <div className={s.appInfo}>
            <div className={s.titleList}>
              <h2 className={s.title}>Record daily water intake and track</h2>
              <h1 className={s.titleApp}>Water consumption tracker</h1>
            </div>
            <div className={s.linkApp}>
              <Link className={s.signup} to="/signup" onClick={handleLinkClick}>
                <p>Try tracker</p>
              </Link>
              <Link className={s.signin} to="/signin" onClick={handleLinkClick}>
                <p>Sign In</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomeSection;
