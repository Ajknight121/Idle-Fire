import { useCallback, useEffect, useState } from "react";
import "./App.css";
import SparkClickAnimation from "./components/CanvasControl";
import ClickerButton from "./components/ClickerButton";
import UpgradeContainer from "./components/UpgradeContainer";
import { GlobalAppState } from "./model/GlobalAppState";
import { Logger } from "./utils/logger";

let countOfInterval = 0;
function App() {
  const [appState, setAppState] = useState(new GlobalAppState());
  const conditionallyUpdateEmbers = useCallback(() => {
    countOfInterval += 1;
    Logger.log(`App State object in interval function`);
    Logger.table(appState);
    const newState = GlobalAppState.addEmbersPerSecondOnTick(appState);
    setAppState(newState);
    Logger.log(`Interval triggered times ${countOfInterval}`);
  }, [appState]);

  const handleMouseMove = (e: MouseEvent) => {
    console.log("handleMouseMove")
    const newState = GlobalAppState.updateStateWithCursorMovement(
      appState,
      e.clientX,
      e.clientY
    );
    setAppState(newState);
  };
  const beginCaptureOfCursorMovement = () => {
    Logger.log(`Begin capturing cursor movement`);
    document.addEventListener("mousemove", handleMouseMove);
  };

  useEffect(() => {
    // Begin capturing cursor movement
    beginCaptureOfCursorMovement();

    // Begin updating embers per second
    const interval = setInterval(() => {
      conditionallyUpdateEmbers();
    }, 1000);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [conditionallyUpdateEmbers, beginCaptureOfCursorMovement]);

  return (
    <div className="App">
      {/*<Header />*/}
      {/* NOTE: For local dev only */}
      {/* <div>App Component {JSON.stringify(appState)}</div> */}
      <UpgradeContainer appState={appState} setAppState={setAppState} />
      <ClickerButton appState={appState} setAppState={setAppState} />
      <SparkClickAnimation appState={appState} setAppState={setAppState} />
    </div>
  );
}
export default App;
