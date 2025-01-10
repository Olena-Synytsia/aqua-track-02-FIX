import s from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  return (
    <button className={s.addBtn}>
      <svg className={s.iconPlus}>
        <use href="src/assets/sprite.svg#icon-plus"></use>
      </svg>
      Add water
    </button>
  );
};
export default AddWaterBtn;
