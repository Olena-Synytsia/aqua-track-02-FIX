import s from "./ChooseDate.module.css";

const ChooseDate = ({ monthDay = "Today" }) => {
  return <div className={s.chooseDate}>{monthDay}</div>;
};
export default ChooseDate;
