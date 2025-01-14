import clsx from "clsx";
import css from "./AddWaterBtn.module.css";
import WaterModal from "../../../Modal/WaterModal/WaterModal.jsx";
import { useModalContext } from "../../../../context/useModalContext.jsx";

const AddWaterBtn = ({ isPrimary = true }) => {
  const { openModal } = useModalContext();

  return (
    <div>
      <button
        className={clsx(css.btn, {
          [css.btn__Primary]: isPrimary,
          [css.btn__Secondary]: !isPrimary,
        })}
        type="button"
        onClick={() => openModal(<WaterModal operationType={"add"} />)}
      >
        <svg className={css.iconPlus}>
          <use href="src/assets/sprite.svg#icon-plus"></use>
        </svg>
        Add water
      </button>
    </div>
  );
};

export default AddWaterBtn;
