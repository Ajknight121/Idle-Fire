import React from "react"
import { IUpgrade } from "../model/Upgrade"

export default function Upgrade(props:IUpgrade) {

    if (!props.unlocked) {
        return <div/>
    } else {
        return (
            <div className={props.classname}>
                <div className={"upgrade-name"}>{(props.lvl > 0) ? props.upgradeName : "???"}</div>
                <div className={"upgrade-level"}>{(props.lvl > 0) ? "Lv." + props.lvl : ""}</div>
                <div className={"upgrade-cost"}>{props.upgradeCost} Embers</div>
            </div>
        )
    }

}