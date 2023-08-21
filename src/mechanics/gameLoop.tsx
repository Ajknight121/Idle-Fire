import { useContext, useEffect } from "react";
import { AppActionsNames, createActionWithPayload } from "./appActions";
import { AppStateContext } from "./appContext";
import GameWrapper from "../components/GameWrapper";

// let countOfGameLoopInvocations = 0;
/** Main entry point into game logic */
export default function GameLoop() {
  const { dispatchAppAction } = useContext(AppStateContext);

  useEffect(() => {
    const dispatchMousemove = (event: MouseEvent) => {
      dispatchAppAction(
          createActionWithPayload(AppActionsNames.MOUSE_MOVE, event)
      );
    };
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
      clearInterval(interval);
      document.removeEventListener("mousemove", dispatchMousemove);
    };
  }, [dispatchAppAction]);
  return (
    <>
      {/*<Header />*/}
      {/* NOTE: For local dev only */}
      {/* <div>App Component {JSON.stringify(appState)}</div> */}
      <GameWrapper />
    </>
  );
}
