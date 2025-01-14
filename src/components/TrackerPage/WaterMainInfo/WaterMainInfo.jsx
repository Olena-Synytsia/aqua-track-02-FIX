import css from "./WaterMainInfo.module.css";

import bottleDescX1 from "../../../assets/img/bottle-desc-x1.jpg";
import bottleDescX2 from "../../../assets/img/bottle-desc-x2.jpg";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import AddWaterBtn from "../WaterDailedInfo/DailyInfo/AddWaterBtn/AddWaterBtn";
import Logo from "../../HomePage/WelcomeSection/Logo/Logo";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar.jsx";

const WaterMainInfo = () => {
  return (
    <div className={css.container}>
      <Logo className={css.logoTracker} />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
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
