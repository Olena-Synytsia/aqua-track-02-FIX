import { useSelector } from "react-redux";
import UserBarBtn from "./UserBarBtn/UserBarBtn.jsx";

const UserBar = () => {
  const nameButton = useSelector((state) => state.user.userInfo?.email);
  const Btnname = nameButton ? nameButton.split("@")[0] : "Guest";

  return (
    <div>
      <UserBarBtn
        userName={Btnname}
        avatarUrl="https://static.ukrinform.com/photos/2022_12/thumb_files/630_360_1672356307-406.jpeg"
      />
    </div>
  );
};

export default UserBar;
