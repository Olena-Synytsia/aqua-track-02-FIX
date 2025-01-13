import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";

import css from "./WaterMainInfo.module.css";

import bottleDescX1 from "../../../assets/img/bottle-desc-x1.jpg";
import bottleDescX2 from "../../../assets/img/bottle-desc-x2.jpg";
import Logo from "../../HomePage/WelcomeSection/Logo/Logo";

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
          alt="Water bottel image"
        />
      </div>
    </div>
  );
};

export default WaterMainInfo;
