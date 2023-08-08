import {CSSProperties, useContext} from "react";
import {AppStateContext} from "../mechanics/appContext";
import {AppActionsNames, createActionWithPayload} from "../mechanics/appActions";
import firemanImg from "../images/firemanAndHoseRight.svg"


export default function FireMarshal() {
    const { appState, dispatchAppAction } = useContext(AppStateContext);

    const containerSize = 60;
    const cssInJs: CSSProperties = {
        bottom: 20, //minus 15 for center of cursor
        left: "30%", //400 for upgrade container // 15
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
            <img src={firemanImg} alt={"fireman"} height={120}/>
        </div>
    );
}