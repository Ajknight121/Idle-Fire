import { useContext, useEffect } from "react";
import ClickerButton from "../components/ClickerButton";
import UpgradeContainer from "../components/UpgradeContainer";
import { AppActionsNames, createActionWithPayload } from "./appActions";
import { AppStateContext } from "./appContext";

// let countOfGameLoopInvocations = 0;
/** Main entry point into game logic */
export default function GameLoop() {
  const { dispatchAppAction } = useContext(AppStateContext);

  // console.log("Game Loop Started");

  const dispatchMousemove = (event: MouseEvent) => {
    dispatchAppAction(
      createActionWithPayload(AppActionsNames.MOUSE_MOVE, event)
    );
  };
  useEffect(() => {
    console.log("use effect");

    // Begin capturing cursor movement
    document.addEventListener("mousemove", dispatchMousemove);

    //Set the game loop
    const interval = setInterval(() => {
      dispatchAppAction(
        createActionWithPayload(AppActionsNames.GAME_LOOP_TICK)
      );
    }, 1000);
    // }
    return () => {
      // console.log("clear");
      clearInterval(interval);
      document.removeEventListener("mousemove", dispatchMousemove);
    };
  }, []);
  return (
    <>
      {/*<Header />*/}
      {/* NOTE: For local dev only */}
      {/* <div>App Component {JSON.stringify(appState)}</div> */}
      <UpgradeContainer />
      <ClickerButton />
    </>
  );
}
