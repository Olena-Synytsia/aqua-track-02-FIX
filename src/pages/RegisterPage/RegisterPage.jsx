import SignUpForm from "../../components/SignUpPage/SignUpForm";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import s from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className="container">
      <div className={s.registerPage}>
        <div className={s.ignUpForm}>
          <SignUpForm />
        </div>
        <div className={s.advantagesSection}>
          <AdvantagesSection />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
