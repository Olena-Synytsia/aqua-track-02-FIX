import { useSelector } from "react-redux";
import UserBarBtn from "./UserBarBtn/UserBarBtn.jsx";
import { useEffect, useState } from "react";
// import { selectUserName } from "../../../../../redux/auth/selectors.js";

const UserBar = () => {
  const userEmailFromRedux = useSelector((state) => state.user.userInfo?.email);
  const userNameFromRedux = useSelector((state) => state.user.userInfo?.name);

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
    <div>
      <UserBarBtn
        userName={userName}
        avatarUrl="https://static.ukrinform.com/photos/2022_12/thumb_files/630_360_1672356307-406.jpeg"
      />
    </div>
  );
};

export default UserBar;
