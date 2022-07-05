import React from "react"

export default function Upgrade(props:any) {
    return (
        <div className={"upgrade"}>
            <div className={"upgrade-name"}>{props.upgradeName}</div>
            <div className={"upgrade-level"}>Lv.{props.lvl}</div>
            <div className={"upgrade-cost"}>{props.upgradeCost} Embers</div>
        </div>
        )

}