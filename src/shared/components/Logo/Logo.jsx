import { NavLink } from 'react-router-dom';
import style from './Logo.module.css';

const Logo = ({ className }) => {
  return (
    <>
      <NavLink to="/" className={`${style.logo} ${className}`}>
        AquaTrack
      </NavLink>
    </>
  );
};

export default Logo;
