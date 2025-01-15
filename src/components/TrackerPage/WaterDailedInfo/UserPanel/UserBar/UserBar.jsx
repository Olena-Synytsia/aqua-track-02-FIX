import { useSelector } from "react-redux";
import UserBarBtn from "./UserBarBtn/UserBarBtn.jsx";
import { useEffect, useState } from "react";

const UserBar = () => {
  const userInfoFromState = useSelector((state) => state.user.userInfo?.email);
  const [userName, setUserName] = useState(() => {
    // Ініціалізація з localStorage
    const savedEmail = localStorage.getItem("userEmail");
    return savedEmail ? savedEmail.split("@")[0] : "Guest";
  });

  useEffect(() => {
    if (userInfoFromState) {
      // Оновлення localStorage при зміні стану
      localStorage.setItem("userEmail", userInfoFromState);
      setUserName(userInfoFromState.split("@")[0]);
    }
  }, [userInfoFromState]);

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
