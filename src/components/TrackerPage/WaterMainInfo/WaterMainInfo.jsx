import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar.jsx";

import css from "./WaterMainInfo.module.css";

import bottleDescX1 from "../../../assets/img/bottle-desc-x1.jpg";
import bottleDescX2 from "../../../assets/img/bottle-desc-x2.jpg";
import Logo from "../../HomePage/WelcomeSection/Logo/Logo.jsx";

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
          alt="Water botle image"
        />
      </div>
    </div>
  );
};

export default WaterMainInfo;
