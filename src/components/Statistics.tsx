import {useContext} from "react";
import {AppStateContext} from "../mechanics/appContext";
import {AppActionsNames, createActionWithPayload} from "../mechanics/appActions";

export default function Statistics() {
    const {appState, dispatchAppAction} = useContext(AppStateContext);
    const clearGame = () => {
        dispatchAppAction(createActionWithPayload(AppActionsNames.CLEAR_GAME_DATA));
    }
    return (
        <div className={"statistics"}>
            <div className={"statistics-label"}>Your Stats</div>
            {/*Time played: {appState.time.toLocaleString()} seconds <br />  implement time*/}
            Total embers produced: {appState.totalEmbers.toLocaleString()}
            <br/>
            Fire clicks: {appState.totalClicks.toLocaleString()}
            <br/>
            Fire Clicks this second/minute: {appState.gameAnalytics.clicksLastSecond} clicks
            <br/>
            Fire Clicks this minute: {appState.gameAnalytics.clicksLastMinute} clicks
            <br/>
            Total Embers from clicking: {appState.embersFromFire.toLocaleString()}
            <br/>
            Total firemen harassed: {appState.firemenClicked}
            <br/>
            <br/>
            <button onClick={clearGame}>Reset Game</button>
        </div>
    );
}
