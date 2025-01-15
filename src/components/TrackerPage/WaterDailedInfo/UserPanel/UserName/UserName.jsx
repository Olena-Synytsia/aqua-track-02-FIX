import { useSelector } from "react-redux";
import s from "./UserName.module.css";
import { useEffect, useState } from "react";

const UserName = () => {
  const emailFromState = useSelector((state) => state.user.userInfo?.email);

  // Ініціалізація з localStorage
  const [username, setUsername] = useState(() => {
    const savedEmail = localStorage.getItem("userEmail");
    return savedEmail ? savedEmail.split("@")[0] : "Guest";
  });

  useEffect(() => {
    if (emailFromState) {
      // Зберігаємо email у localStorage
      localStorage.setItem("userEmail", emailFromState);
      setUsername(emailFromState.split("@")[0]);
    }
  }, [emailFromState]);
  return (
    <h1 className={s.titleUser}>
      Hello, <span className={s.spanTitle}>{username}</span>
    </h1>
  );
};

export default UserName;
