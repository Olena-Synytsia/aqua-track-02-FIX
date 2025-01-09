import Logo from '../Logo/Logo';
import style from './WrapperWelcome.module.css';

const WrapperWelcome = ({ children, classNameLogo, classNameWelcom }) => {
  return (
    <>
      <div
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
        className={`${style.welcome} ${classNameWelcom}`}
      >
        <Logo className={`${style.welcomeLogo} ${classNameLogo}`} />
        {children}
      </div>
    </>
  );
};

export default WrapperWelcome;
