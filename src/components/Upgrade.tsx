import React from "react"
import { IUpgrade } from "../model/Upgrade"

export default function Upgrade(props:IUpgrade) {
    return (
        <div className={"upgrade-available"}>
            <div className={"upgrade-name"}>{props.upgradeName}</div>
            <div className={"upgrade-level"}>Lv.{props.lvl}</div>
            <div className={"upgrade-cost"}>{props.upgradeCost} Embers</div>
        </div>
        )

}