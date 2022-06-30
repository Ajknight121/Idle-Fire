import { useEffect, useState } from "react";
import "./App.css";
import ClickerButton from "./components/ClickerButton";
import Header from "./components/Header";
import UpgradeContainer from "./components/UpgradeContainer";
import { GlobalAppState } from "./model/GlobalAppState";

let interval: NodeJS.Timer;
let countOfInterval = 0;
function App() {
  const [appState, setAppState] = useState(new GlobalAppState());

  // clearInterval(interval);

  //TODO Adrian read about useEffect and why it's necessary for side effects in code and play with the idea that there could be other ways to do this

  /** Our game logic requires a side effect every second and due to that we import useEffect */
  // const imperitiveTickFn = () => {
  //   // console.table(appState);
  // };

  useEffect(() => {
    interval = setInterval(() => {
      countOfInterval += 1;
      console.log(`App State object in interval function`);
      console.table(appState);
      if (appState.embersPerSecond > 0) {
        setAppState(GlobalAppState.addEmbersPerSecondOnTick(appState));
      }
      console.log(`Interval triggered times ${countOfInterval}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [appState.embersPerSecond]);

  return (
    <div className="App">
      <Header />
      {/* NOTE: For local dev only */}
      {/* <div>App Component {JSON.stringify(appState)}</div> */}
      <ClickerButton appState={appState} setAppState={setAppState} />
      <UpgradeContainer appState={appState} setAppState={setAppState} />
    </div>
  );
}

export default App;
