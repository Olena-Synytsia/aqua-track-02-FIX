import { useState, useEffect } from "react";
import style from "./AdvantagesSection.module.css";
import { fetchCounter } from "./getCounter.js";
import LoaderCustoners from "./LoaderCustoners.jsx";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCounter = async () => {
      try {
        const usersCount = await fetchCounter();
        setCounter(usersCount);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCounter();
  }, [counter]);

  return (
    <div>
      {loading ? (
        <LoaderCustoners />
      ) : (
        <p className={style.counter}>{formatCounter(counter)}</p>
      )}
    </div>
  );
};

export default UsersCounter;
