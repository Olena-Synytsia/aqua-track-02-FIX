import { useSelector } from "react-redux";
import s from "./UserName.module.css";
const UserName = () => {
  const emailGreet = useSelector((state) => state.user.userInfo?.email);
  const username = emailGreet ? emailGreet.split("@")[0] : "Guest";

  return (
    <h1 className={s.titleUser}>
      Hello, <span className={s.spanTitle}>{username}</span>
    </h1>
  );
};

export default UserName;
