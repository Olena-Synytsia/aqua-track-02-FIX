import style from "./AdvantagesSection.module.css";
import imgOne from "../../../assets/img/Male1-Memojis-tab-desc-x1.jpg";
import imgTwo from "../../../assets/img/Male2-Memojis-tab-desc-x1.jpg";
import imgThree from "../../../assets/img/Male3-Memojis-tab-desc-x1.jpg";
import UsersCounter from "./UsersCounter.jsx";

const AdvantagesSection = () => {
  return (
    <div>
      <div className={style.wrapper}>
        <ul className={style.customersContainer}>
          <li>
            <ul className={style.customersList}>
              <li className={style.circle1}>
                <img className={style.avatar} src={imgOne} alt="" />
              </li>
              <li className={style.circle2}>
                <img className={style.avatar} src={imgTwo} alt="" />
              </li>
              <li className={style.circle3}>
                <img className={style.avatar} src={imgThree} alt="" />
              </li>
            </ul>
          </li>
          <li>
            <div className={style.customerText}>
              <UsersCounter /> <span>happy</span> <p>customers</p>
            </div>
          </li>
        </ul>
        <ul className={style.tagList}>
          <li className={style.tagItem1}>
            <div className={style.iconContainer}>
              <svg className={style.iconDot}>
                <use href="../../../assets/sprite.svg#icon-Ellipse-13" />
              </svg>
              <p className={style.tagText}>Habit drive</p>
            </div>
          </li>
          <li className={style.tagItem2}>
            <p className={style.tagText}>View statistics</p>
          </li>
          <li className={style.tagItem3}>
            <p className={style.tagText}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
