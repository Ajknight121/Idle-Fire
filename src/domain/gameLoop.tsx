import { useContext, useState, useEffect } from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { AppContext } from "./appContext";

// let countOfGameLoopInvocations = 0;

/** Main entry point into game logic */
export default function GameLoop(props: { embersPerSecond: number }) {
  const { appState, setAppState } = useContext(AppContext);
  // const [embersPerSecond, setEmbersPerSecond] = useState(
  //   appState.embersPerSecond
  // );

  // let gameLoopShouldFire = true;
  // countOfGameLoopInvocations += 1;
  // console.log(`App State object in interval function`);

  // console.table(appState);
  const updateEmberPerSecond = () => {
    console.log("embersPerSecond")
    if (props.embersPerSecond > 0) {
      const newState = GlobalAppState.addEmbersPerSecondOnTick(appState);
      setAppState(newState);
      // setEmbersPerSecond(newState.embersPerSecond);
    }
  };
  // if (gameLoopShouldFire) {
  // console.log(
  //   `Setting one second time out before triggering game loop, current embers per second ${embersPerSecond}`
  // );
  useEffect(() => {
    setTimeout(updateEmberPerSecond, 1000);
  }, []);
  // }

  return <div>Game Loop</div>;
}

// export const terminateGameLoop = () => {};
