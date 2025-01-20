import { useSelector } from "react-redux";
import s from "./UserName.module.css";
import { useEffect, useState } from "react";
// import { selectUserName } from "../../../../../redux/auth/selectors";

const UserName = () => {
  const userEmailFromRedux = useSelector((state) => state.auth.userInfo?.email);
  const userNameFromRedux = useSelector((state) => state.user.user?.name);
  console.log("userEmailFromRedux: ", userEmailFromRedux);
  console.log("userNameFromRedux: ", userNameFromRedux);

  const [userName, setUserName] = useState(() => {
    // Ініціалізація з localStorage
    const savedName = localStorage.getItem("userName");
    if (savedName) return savedName;
    const savedEmail = localStorage.getItem("userEmail");
    return savedEmail ? savedEmail.split("@")[0] : "Guest";
  });

  useEffect(() => {
    if (userNameFromRedux) {
      // Якщо ім'я є в Redux, зберегти в localStorage та оновити стан
      localStorage.setItem("userName", userNameFromRedux);
      setUserName(userNameFromRedux);
    } else if (userEmailFromRedux) {
      // Якщо ім'я немає, але є email, використати частину до @
      const derivedName = userEmailFromRedux.split("@")[0];
      localStorage.setItem("userEmail", userEmailFromRedux);
      setUserName(derivedName);
    }
  }, [userNameFromRedux, userEmailFromRedux]);
  return (
    <h1 className={s.titleUser}>
      Hello, <span className={s.spanTitle}>{userName}</span>
    </h1>
  );
};

export default UserName;
