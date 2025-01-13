import { useEffect, useState } from "react";
import WaterMainInfo from "../../components/TrackerPage/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/TrackerPage/WaterDailedInfo/WaterDetailedInfo.jsx";
import Modals from "../../components/Modal/WaterModal/WaterModal.jsx";
import Container from "../../shared/Container/Container.jsx";

import style from "./TrackerPage.module.css";
import { icons as sprite } from "../../shared/icons";

const TrackerPage = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const steps = [
    {
      target: "[data-tour='step-1']",
      content: "Here you can find detailed information about water tracking.",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsTourOpen(false);
      setCurrentStep(0);
      localStorage.setItem("firstVisit", "false");
    }
  };

  const skipTour = () => {
    setIsTourOpen(false);
    localStorage.setItem("firstVisit", "false");
  };

  useEffect(() => {
    // Встановлення заголовка сторінки
    document.title = "Tracker Page";

    const isFirstVisit = localStorage.getItem("firstVisit") === null;
    if (isFirstVisit) {
      localStorage.setItem("firstVisit", "false");
      setIsTourOpen(true);
    }
  }, []);

  return (
    <>
      {isTourOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "absolute",
              ...getTargetPosition(steps[currentStep].target),
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              zIndex: 1100,
            }}
          >
            <p>{steps[currentStep].content}</p>
            <div>
              <button onClick={skipTour} style={{ marginRight: "10px" }}>
                Skip
              </button>
              <button onClick={handleNextStep}>Next</button>
            </div>
          </div>
        </div>
      )}

      <Container>
        <div className={style.wrapperStyle}>
          <div className={style.wrapperElement}>
            <button
              className={style.btnInfo}
              onClick={() => setIsTourOpen(true)}
            >
              <svg
                width="18"
                height="18"
                aria-label="Tour in web"
                className={style.iconInfo}
              >
                <use xlinkHref={`${sprite}#icon-info`}></use>
              </svg>
            </button>
          </div>
          <div className={style.wrapperTracker} data-tour="step-1">
            <WaterMainInfo />
            <WaterDetailedInfo />
          </div>
        </div>
      </Container>
      <Modals />
    </>
  );
};

const getTargetPosition = (selector) => {
  const element = document.querySelector(selector);
  if (!element)
    return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    transform: "translate(-50%, -50%)",
  };
};

export default TrackerPage;
