import {useContext} from "react";
import {AppStateContext} from "../domain/appContext";
import {AppActionsNames, createActionWithPayload} from "../domain/appActions";

export default function Statistics() {
    const {appState, dispatchAppAction} = useContext(AppStateContext);
    const clearGame = () => {
        dispatchAppAction(createActionWithPayload(AppActionsNames.CLEAR_GAME_DATA));
    }
    return (
        <div className={"statistics"}>
            <div className={"statistics-label"}>Stats</div>
            {/*Time played: {appState.time.toLocaleString()} seconds <br />  implement time*/}
            Total embers produced: {appState.totalEmbers.toLocaleString()}
            <br/>
            Fire clicks: {appState.totalClicks.toLocaleString()}
            <br/>
            Fire Clicks this second/minute: {appState.gameAnalytics.clicksLastSecond} / {appState.gameAnalytics.clicksLastMinute} clicks
            <br/>
            Average Fire clicks per minute: {appState.gameAnalytics.clickRollingAveragePerMinute} clicks
            <br/>
            Total Embers from clicking: {appState.embersFromFire.toLocaleString()}
            <br/>

            <button onClick={clearGame}>Reset Game</button>
        </div>
    );
}
