import UserBar from "./UserBar/UserBar.jsx";
import UserName from "./UserName/UserName.jsx";
import s from "./UserPanel.module.css";

const UserPanel = () => {
  return (
    <div className={s.userpanel}>
      <UserName />
      <UserBar />
    </div>
  );
};

export default UserPanel;
