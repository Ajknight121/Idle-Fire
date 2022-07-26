import {IGlobalAppState} from "../model/GlobalAppState";

export default function Statistics(appState:IGlobalAppState) {
    return (
        <div className={"statistics"} >
            <div className={"statistics-label"}>
                Stats
            </div>
            Time played: {appState.time} seconds <br/>
            Total embers produced: {appState.totalEmbers}<br/>
            Fire clicks: {appState.totalClicks}<br/>
            Embers from clicking: unknown<br/>


        </div>
    )
}