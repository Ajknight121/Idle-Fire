import React from "react"
import { IUpgrade } from "../model/Upgrade"
import {GlobalAppState} from "../model/GlobalAppState";

export default function Upgrade(props:any) {
    const buyUpgrade = (embers: number, cost: number, adder:number):boolean => {
        console.log(`Buying upgrade`);
        // This pattern is what you'll learn when you start implementing actions and reducers as in the Redux pattern.
        // Main point, we keep state immutable, hence spread operator to create new copies of state or in order words, we never mutate state directly as in
        // props.appState.clickPower = props.appState.clickPower + 1

        if (embers < cost) {
            return false;
        }
        const deductedEmbersState = GlobalAppState.deductEmbers(
            cost,
            props.appState
        );

        const newState = GlobalAppState.addToEmbersPerSec(adder, deductedEmbersState);

        props.setAppState(newState);
        return true;
    };
    const upgradeAction = (embers: number, upgrade: IUpgrade, buyQuantity: number) => {
        for (let i = 0; i < buyQuantity; i++) {
            console.log(`Buying ${upgrade.upgradeName} upgrade`)
            // if (buyUpgrade(embers, upgrade.upgradeCost, 1)) {
            //     props.setAppState(GlobalAppState.increaseUpgradeLvl(upgrade,props.appState))
            // }
        }

        return;
    }

    if (!props.unlocked) {
        return <div/>
    } else {
        return (
            <div className={props.classname} onClick={() => console.log(`buying ${props.upgradeName} upgrade`)}>
                <div className={"upgrade-name"}>{(props.lvl > 0) ? props.upgradeName : "???"}</div>
                <div className={"upgrade-level"}>{(props.lvl > 0) ? "Lv." + props.lvl : ""}</div>
                <div className={"upgrade-cost"}>{props.upgradeCost} Embers</div>
            </div>
        )
    }

}