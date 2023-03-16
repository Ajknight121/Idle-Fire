import {CSSProperties, useContext} from "react";
import {AppStateContext} from "../domain/appContext";
import {AppActionsNames, createActionWithPayload} from "../domain/appActions";



export default function FireMarshal() {
    const { appState, dispatchAppAction } = useContext(AppStateContext);

    const containerSize = 60;
    const cssInJs: CSSProperties = {
        top: 200, //minus 15 for center of cursor
        left: 200, //400 for upgrade container // 15
        backgroundColor: "red",
        height: `${containerSize * 2}px`,
        width: `${containerSize}px`,
        display: `${appState.FireMarshal.isActive ? "block" : "none"}`,
        position: "absolute",
    };
    const handleClick = () => {
        console.log("FIREMAN CLICKED");
        dispatchAppAction(createActionWithPayload(AppActionsNames.TOGGLE_FIREMAN, false));
    };

    return (
        <div style={cssInJs} className={"fireman"} onClick={() => handleClick()}>
            {/*<img src={flame} alt={"spark"} draggable="false" />*/}
        </div>
    );
}