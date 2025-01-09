import { useTranslation } from 'react-i18next';
import style from './Languages.module.css';
import { icons as sprite } from '../../../shared/icons';

const Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <header
        data-aos="zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"
        className={style.languages}
      >
        <button
          className={style.languageBtn}
          onClick={() => changeLanguage('en')}
        >
          <svg
            width="18"
            height="18"
            aria-label="Flag en"
            className={style.iconFlag}
          >
            <use xlinkHref={`${sprite}#en-flag`}></use>
          </svg>
        </button>
        <span className={style.line}>|</span>
        <button
          className={style.languageBtn}
          onClick={() => changeLanguage('uk')}
        >
          <svg
            width="18"
            height="18"
            aria-label="Flag ua"
            className={style.iconFlag}
          >
            <use xlinkHref={`${sprite}#ua-flag`}></use>
          </svg>
        </button>
      </header>
    </>
  );
};

export default Languages;
