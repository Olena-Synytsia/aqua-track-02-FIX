import { useSelector } from "react-redux";
import UserBarBtn from "./UserBarBtn/UserBarBtn.jsx";

const UserBar = () => {
  const nameButton = useSelector((state) => state.user.userInfo?.email);
  const Btnname = nameButton ? nameButton.split("@")[0] : "Guest";

  return (
    <div>
      <UserBarBtn
        userName={Btnname}
        avatarUrl="https://akvo.com.ua/image/catalog/stati/213.jpg"
      />
    </div>
  );
};

export default UserBar;
