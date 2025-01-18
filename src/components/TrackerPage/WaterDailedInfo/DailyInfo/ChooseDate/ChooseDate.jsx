// import { useSelect } from "@chakra-ui/react";
import s from "./ChooseDate.module.css";
// import { selectDate } from "../../../../../redux/water/selectors.js";

const ChooseDate = ({ monthDay = "Today" }) => {
  // const day = useSelect(selectDate);
  return <div className={s.chooseDate}>{monthDay}</div>;
};
export default ChooseDate;
