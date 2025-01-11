import Logo from "../../components/HomePage/WelcomeSection/Logo/Logo";
import SignInForm from "../../components/SignInPage/SignInForm/SignInForm";
import s from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <div className={s.container}>
      <div className={s.signInContainer}>
          <div className={s.logo}><Logo /></div>
          <SignInForm />
        </div>
    </div>
  );
};

export default SignInPage;
