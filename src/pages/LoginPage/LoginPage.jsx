import SignInPage from "../../components/SignInPage/SignInPage";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import s from "../LoginPage/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className="container">
      <div className={s.container}>
        <div className={s.singInContainer}>
          <SignInPage />
        </div>
        <div className={s.advantagesSection}>
          <AdvantagesSection />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// const LoginPage = () => {
//   return (
//     <div>LoginPage</div>
//       // <SignInPage />
//   // <AdvantagesSection />
//   )
// }

// export default LoginPage
