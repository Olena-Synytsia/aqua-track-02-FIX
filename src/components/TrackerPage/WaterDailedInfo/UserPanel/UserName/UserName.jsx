import { useSelector } from "react-redux";

const UserName = () => {
  const emailGreet = useSelector((state) => state.user.userInfo?.email);
  const username = emailGreet ? emailGreet.split("@")[0] : "Guest";

  return <h1>Hello, {username}</h1>;
};

export default UserName;
