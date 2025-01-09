import { BASE_URL } from '../../../helpers/constants';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';

import style from './GoogleBtn.module.css';

const GoogleBtn = ({ type, className }) => {
  const { t } = useTranslation();
  return (
    <>
      {type === 'In' ? (
        <a
          className={`${style.googleBtn} ${className}`}
          href={`${BASE_URL}/users/google`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FcGoogle className={style.googleIcon} />{' '}
          {t('googleButton.googleInBtn')}
        </a>
      ) : (
        <a
          className={`${style.googleBtn} ${className}`}
          href={`${BASE_URL}/users/google`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FcGoogle className={style.googleIcon} />{' '}
          {t('googleButton.googleUpBtn')}
        </a>
      )}
    </>
  );
};

export default GoogleBtn;
