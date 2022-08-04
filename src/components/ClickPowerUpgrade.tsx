import React, { useContext } from "react";
import { AppActionsNames, createActionWithPayload } from "../domain/appActions";
import { AppStateContext } from "../domain/appContext";
import {IClickUpgrade} from "../model/Upgrade";

export interface UpgradeComponentProps {
    upgradeProps: IClickUpgrade;
    classname: string;
}

export default function ClickPowerUpgrade(props: UpgradeComponentProps) {
    const { appState, dispatchAppAction } = useContext(AppStateContext);
    const handleUpgradeClick = () => {
        if (
            appState.embers <
            props.upgradeProps.upgradeCost * appState.buyQuantity
        ) {
            return;
        } else {
            dispatchAppAction(
                createActionWithPayload(
                    AppActionsNames.CLICK_PURCHASE,
                    props.upgradeProps
                )
            );
        }
    };

    return (
        <div
            className={props.classname}
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleUpgradeClick()
            }
        >
            <div className={"upgrade-name"}>
                {props.upgradeProps.upgradeName}
            </div>
            <div className={"upgrade-level"}>
                {props.upgradeProps.quantity > 0
                    ? "Lv." + props.upgradeProps.quantity
                    : ""}
            </div>
            <div className={"upgrade-cost"}>
                {(props.upgradeProps.upgradeCost * appState.buyQuantity).toLocaleString()} Embers
            </div>
        </div>
    );
}
