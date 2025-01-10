import React, { useState } from "react";
import "./CalendarItem.module.css"

const CalendarItem = ({ day, selectedDate }) => {
    const [waterData, setWaterData] = useState({ consumed: 0, dailyGoal: 2000 });
  
    const fetchWaterData = async () => {
      const date = new Date(selectedDate);
      date.setDate(day);
      const formattedDate = date.toISOString().split("T")[0];
  
      try {
        const response = await fetch(`/api/water-data?date=${formattedDate}`);
        const data = await response.json();
        setWaterData(data);
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };
  
    const percentage = (waterData.consumed / waterData.dailyGoal) * 100;
  
    const buttonClass =
      percentage >= 100
        ? className="calendar-item full"
        : percentage >= 50
        ? className="calendar-item half"
        : className="calendar-item empty";
  
    return (
      <button className={buttonClass} onClick={fetchWaterData}>
        <div>{day}</div>
        <div>{percentage.toFixed(1)}%</div>
      </button>
    );
  };
  
  export default CalendarItem;