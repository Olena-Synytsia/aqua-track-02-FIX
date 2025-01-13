import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import "aos/dist/aos.css";
import css from "./WaterMainInfo.module.css";

import { default as bottel1x } from "../../../assets/img/bottel@x1.webp";
import { default as bottel2x } from "../../../assets/img/bottel@x2.webp";
import Logo from "../../HomePage/WelcomeSection/Logo/Logo";

const WaterMainInfo = () => {
  return (
    <div
      data-aos="fade-right"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
      className={css.container}
    >
      <Logo className={css.logoTracker} />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
      <div className={css.imageContainer}>
        <img
          className={css.image}
          src={bottel1x}
          srcSet={`${bottel1x} 1x, ${bottel2x} 2x`}
          alt="Water bottel image"
        />
      </div>
    </div>
  );
};

export default WaterMainInfo;
