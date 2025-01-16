import AddWaterB from "./AddWaterBtn/AddWaterB.jsx";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar.jsx";
import bottleDescX1 from "../../../assets/img/bottel@x1.webp";
import bottleDescX2 from "../../../assets/img/bottel@x2.webp";
import Logo from "../../HomePage/WelcomeSection/Logo/Logo";
import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  return (
    <div className={css.container}>
      <div className={css.logoTracker}>
        <Logo />
      </div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterB />
      <div className={css.imageContainer}>
        <img
          className={css.image}
          src={bottleDescX1}
          srcSet={`${bottleDescX1} 1x, ${bottleDescX2} 2x`}
          alt="Water botel image"
        />
      </div>
    </div>
  );
};

export default WaterMainInfo;
