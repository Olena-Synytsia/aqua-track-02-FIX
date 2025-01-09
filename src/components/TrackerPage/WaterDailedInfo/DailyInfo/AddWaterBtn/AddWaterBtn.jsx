import { PiPlusCircleFill } from "react-icons/pi";
import s from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  return (
    <button className={s.addBtn}>
      <PiPlusCircleFill className={s.iconPlus} />
      Add water
    </button>
  );
};
export default AddWaterBtn;
