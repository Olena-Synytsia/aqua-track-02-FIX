import { useEffect } from "react";
import WaterMainInfo from "../../components/TrackerPage/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/TrackerPage/WaterDailedInfo/WaterDetailedInfo.jsx";
import Joyride, { ACTIONS, STATUS } from "react-joyride";
import style from "./TrackerPage.module.css";
// import sprite from "../../assets/icons/sprite.svg";
import Container from "../../shared/Container/Container.jsx";
import { icons as sprite } from "../../shared/icons";

const TrackerPage = () => {
  const steps = [
    {
      target: "[data-tour='step-1']",
      content: "Here you can find detailed information about water tracking.",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, action } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || action === ACTIONS.CLOSE) {
      localStorage.setItem("firstVisit", "false");
    }
  };

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit") === null;
    if (isFirstVisit) {
      localStorage.setItem("firstVisit", "true");
    }
  }, []);

  const isFirstVisit = localStorage.getItem("firstVisit") === "true";

  return (
    <>
      <Joyride
        steps={steps}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
        run={isFirstVisit}
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#5cb85c",
            textColor: "#333",
            zIndex: 1000,
          },
        }}
      />
      <Container>
        <div className={style.wrapperStyle}>
          <div className={style.wrapperElement}>
            <button
              className={style.btnInfo}
              onClick={() => window.location.reload()}
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
    </>
  );
};

export default TrackerPage;
