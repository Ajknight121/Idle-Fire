import React, {useState} from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";
import flame from "../images/flame.png";

const Spark = (prop:any) => {
    return (
        <div className={"spark"}>
            <img src={flame} alt={"spark"} draggable="false"/>
        </div>
    )
}

export default function ClickerButton(props: IGlobalAppProps) {
    const { appState, setAppState } = props;
    const [sparkList, setSparkState] = useState<JSX.Element[]>([])
    const handleClick = () => {
        setSparkState(sparkList.concat(<Spark key={sparkList.length} />));
        const newState = GlobalAppState.addsEmberToTotal(appState);
        setAppState(newState);
    };
    return (
        <div className={"clicker-area"}>
            <div className={"counters"}>
                <div className={"ember-count"}>Embers: {appState.embers}</div>
                <div className={"ember-per-second"}>Embers per sec: {appState.embersPerSecond}</div>
                {/*<div className={"ember-per-second"}>Total Clicks: {appState.totalClicks}</div>*/}
            </div>
            <div className="clicker-button" onClick={handleClick}>
                {sparkList}
                <img src={flame} alt={"Flame level 1"} draggable="false"/>
            </div>
        </div>
    );
}
