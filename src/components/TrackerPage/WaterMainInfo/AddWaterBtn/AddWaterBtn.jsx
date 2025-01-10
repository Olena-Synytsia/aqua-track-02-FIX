import clsx from "clsx";
import css from "./AddWaterBtn.module.css";
import { icons as sprite } from "../../../../assets/icon/index.js";
import { useModalContext } from "../../../context/useModalContext";
import WaterModal from "../../WaterModal/WaterModal";
import { useTranslation } from "react-i18next";

const AddWaterBtn = ({ isPrimary = true }) => {
  const { t } = useTranslation();
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
        <svg
          className={clsx(css.btn__svg, { [css.btn__svg_primary]: isPrimary })}
          width="24"
          height="24"
        >
          <use xlinkHref={`${sprite}#plus-add-water`} />
        </svg>
        {t("waterMainInfo.btn")}
      </button>
    </div>
  );
};

export default AddWaterBtn;
