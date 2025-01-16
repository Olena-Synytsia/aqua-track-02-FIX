import AddWaterB from "./AddWaterBtn/AddWaterB.jsx";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar.jsx";
import Logo from "../../HomePage/WelcomeSection/Logo/Logo";
import css from "./WaterMainInfo.module.css";
const WaterMainInfo = () => {
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div className={css.dailyNorma}>
        <WaterDailyNorma />
      </div>
      <div className={css.progressBar}>
        <WaterProgressBar />
      </div>
      <div className={css.addWater}>
        <AddWaterB />
      </div>
    </div>
  );
};
export default WaterMainInfo;
