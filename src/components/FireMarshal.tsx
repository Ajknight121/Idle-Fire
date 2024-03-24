import {CSSProperties, useContext, useState} from "react";
import {AppStateContext} from "../mechanics/appContext";
import {AppActionsNames, createActionWithPayload} from "../mechanics/appActions";
import firemanImg from "../images/firemanAndHoseRight.svg"


export default function FireMarshal() {
    const { appState, dispatchAppAction } = useContext(AppStateContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const containerSize = 60;
    const cssInJs: CSSProperties = {
        bottom: windowWidth <= 500 ? 50 : 20, //minus 15 for center of cursor
        left: windowWidth <= 500 ? "5%" : "30%",
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
            <img src={firemanImg} alt={"fireman"} height={120} draggable="false"/>
        </div>
    );
}