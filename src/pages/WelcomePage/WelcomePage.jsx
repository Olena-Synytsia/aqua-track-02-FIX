import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection.jsx";
import WelcomeSection from "../../components/HomePage/WelcomeSection/Section/WelcomeSection";
import welcStyle from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className="container">
      <div className={welcStyle.welcomeContainer}>
        <WelcomeSection /> <AdvantagesSection />
      </div>
      )
    </div>
  );
};

export default WelcomePage;
