import { useState, useEffect } from "react";
import style from "./AdvantagesSection.module.css";
import { fetchCounter } from "./getCounter.js";

const formatCounter = (count) => {
  if (count >= 1000 && count <= 1100) {
    return "1k";
  } else if (count > 1100 && count < 10000) {
    return (count / 1000).toFixed(1) + "k";
  } else if (count >= 10000) {
    return Math.floor(count / 1000) + "k";
  } else {
    return count;
  }
};

const UsersCounter = () => {
  const [counter, setCounter] = useState(null);
  useEffect(() => {
    const getCounter = async () => {
      try {
        const usersCount = await fetchCounter();
        setCounter(usersCount);
      } catch (error) {
        console.log(error);
      }
    };
    getCounter();
  }, [counter]);

  return (
    <div>
      <p className={style.counter}>{formatCounter(counter)}</p>
    </div>
  );
};

export default UsersCounter;
