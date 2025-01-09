import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar.jsx";
import css from "./WaterMainInfo.module.css";
import { default as bottel1x } from "../../shared/images/trackerPage/bottel@x1.webp";
import { default as bottel2x } from "../../shared/images/trackerPage/bottel@x.webp";
import Logo from "../../components/Logo/Logo.jsx";

const WaterMainInfo = () => {
  return (
    <div className={css.waterMainInfo}>
      <Logo className={css.logoTracker} />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
      <div className={css.waterContainer}>
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
