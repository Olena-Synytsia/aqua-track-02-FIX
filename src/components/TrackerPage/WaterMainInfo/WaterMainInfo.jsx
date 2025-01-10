import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";

import css from "./WaterMainInfo.module.css";

import { default as bottel1x } from "../../../assets/img/index.js";
import { default as bottel2x } from "../../../assets/img/index.js";
import Logo from "../../../assets/sprite.svg";

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
