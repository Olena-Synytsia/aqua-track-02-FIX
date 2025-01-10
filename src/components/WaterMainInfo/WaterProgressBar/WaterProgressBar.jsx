// import React from "react";
import { Box, Slider } from "@mui/material";

const WaterProgressBar = () => {
  return (
    <div className={css.container} data-tour="step-3">
      <div className={css.title}>{formatDate(selectedDate)}</div>

      <Box sx={{ width: "100%", m: 0, p: 0 }}>
        <Slider
          value={percent}
          valueLabelDisplay="auto"
          components={{ ValueLabel: ValueLabelComponent }}
          onChange={() => {}}
          sx={{
            m: 0,
            p: 0,
            color: "var(--accent)",
            "@media (pointer: coarse)": {
              p: "0 !important",
            },
            "& .MuiSlider-thumb": {
              borderRadius: "16px",
              width: "12px",
              height: "12px",
              color: "white",
              border: "1px solid var(--accent)",
            },
            "& .MuiSlider-rail": {
              color: "var(--light-gray)",
              backgroundColor: "var(--light-gray)",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "var(--accent)",
              color: "white",
              borderRadius: "8px",
              padding: "4px 4px",
            },
          }}
        />
        <div className={css.percentBar}>
          <a>0%</a>
          <a className={css.fifty}>50%</a>
          <a>100%</a>
        </div>
      </Box>
    </div>
  );
};

export default WaterProgressBar;
