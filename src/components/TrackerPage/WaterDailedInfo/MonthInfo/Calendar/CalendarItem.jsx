// import { useState } from "react";
import { useState } from "react";
import s from "./CalendarItem.module.css";
import clsx from "clsx";

const CalendarItem = ({ day, selectedDate }) => {
  const [waterData, setWaterData] = useState({ consumed: 0, dailyGoal: 2000 });

  const fetchWaterData = async () => {
    const date = new Date(selectedDate);
    date.setDate(day);
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const response = await fetch(`/api/water-data?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setWaterData(data);
    } catch (error) {
      console.error("Error fetching water data:", error);
    }
  };

  const percentage = (waterData.consumed / waterData.dailyGoal) * 100;

  return (
    <div className={s.calendaritem}>
      <button
        className={clsx({
          [s.calendaritemfull]: percentage >= 100,
          // [s.calendaritemhalf]: percentage >= 50 && percentage < 100,
          // [s.calendaritemempty]: percentage < 50,
          [s.calendaritemhalf]: percentage < 100,
          [s.btnstyle]: true,
        })}
        onClick={fetchWaterData}
      >
        <div className={s.day}>{day}</div>{" "}
        <div className={s.percentage}>
          {" "}
          <div className={s["percentage-value"]}>
            {percentage.toFixed(1)}%
          </div>{" "}
        </div>{" "}
      </button>
    </div>
  );
};

export default CalendarItem;
