// import React from "react";
import clsx from "clsx";
import { icons as sprite } from "../../../assets/icon/index.js";
import css from "./AddWaterBtn.module.css";
import { useModalContext } from "../../../context/ModalContext";
import WaterModal from "../WaterModal/WaterModal";
import { useTranslation } from "react-i18next";

const AddWaterBtn = ({ isPrimary = true }) => {
  const { t } = useTranslation();
  const { openModal } = useModalContext();

  return (
    <div>
      <button
        className={clsx(css.btn, {
          [css.btn__Primary]: isPrimary, // add this line
          [css.btn__Secondary]: !isPrimary, // add this line
        })}
        type="button"
        onClick={() => openModal(<WaterModal operationType={"add"} />)}
      >
        {t("waterMainInfo.addWater")}
        <svg className={css.btn__svg}>
          <use />{" "}
        </svg>
      </button>
    </div>
  );
};

export default AddWaterBtn;
