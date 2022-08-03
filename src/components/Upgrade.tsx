import React, { useContext } from "react";
import { AppActionsNames, createActionWithPayload } from "../domain/appActions";
import { AppStateContext } from "../domain/appContext";
import { IUpgrade } from "../model/Upgrade";

export interface UpgradeComponentProps {
  upgradeProps: IUpgrade;
  classname: string;
}

export default function Upgrade(props: UpgradeComponentProps) {
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
          AppActionsNames.UPGRADE_PURCHASE,
          props.upgradeProps
        )
      );
    }
  };
  if (!props.upgradeProps.unlocked) {
    return <div />;
  } else {
    return (
      <div
        className={props.classname}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          handleUpgradeClick()
        }
      >
        <div className={"upgrade-name"}>
          {props.upgradeProps.quantity > 0
            ? props.upgradeProps.upgradeName
            : "???"}
        </div>
        <div className={"upgrade-level"}>
          {props.upgradeProps.quantity > 0
            ? "Lv." + props.upgradeProps.quantity
            : ""}
        </div>
        <div className={"upgrade-cost"}>
          {props.upgradeProps.upgradeCost * appState.buyQuantity} Embers
        </div>
      </div>
    );
  }
}
