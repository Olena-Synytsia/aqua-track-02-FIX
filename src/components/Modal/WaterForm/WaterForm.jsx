import { RxMinusCircled, RxPlusCircled } from "react-icons/rx";
import s from "./WaterForm.module.css";

const WaterForm = ({ operationType, value = "50ml" }) => {
  const title =
    operationType === "add" ? "Choose a value" : "Correct entered data:";
  return (
    <form>
      <h2>{title}</h2>
      <p>Amount of water:</p>
      <div className={s.counter}>
        <button className={s.counterBtn}>
          <RxMinusCircled className={s.iconBtn} />
        </button>
        <p className={s.counterValue}>{value}</p>
        <button className={s.counterBtn}>
          <RxPlusCircled className={s.iconBtn} />
        </button>
      </div>
    </form>
  );
};
export default WaterForm;
