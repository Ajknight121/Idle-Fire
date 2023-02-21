import React, { useContext } from "react";
import { AppActionsNames, createActionWithPayload } from "../domain/appActions";
import { AppStateContext } from "../domain/appContext";
import {IClickUpgrade} from "../model/Upgrade";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import {UpgradeNames} from "../domain/gameUpgrades";

export interface UpgradeComponentProps {
    upgradeProps: IClickUpgrade;
    classname: string;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement={'right'} disableInteractive/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#FAEBD7FF',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 400,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',

    },
}));

export default function ClickPowerUpgrade(props: UpgradeComponentProps) {
    const { appState, dispatchAppAction } = useContext(AppStateContext);
    const handleUpgradeClick = () => {
        if (
            appState.embers <
            props.upgradeProps.upgradeCost * appState.buyQuantity
        ) {
            return;
        } else {
            switch (props.upgradeProps.upgradeName) {
                case UpgradeNames.clickPower:
                    dispatchAppAction(
                        createActionWithPayload(
                            AppActionsNames.CLICK_PURCHASE,
                            props.upgradeProps
                        )
                    );
                    break;
                case UpgradeNames.globalMultiplier:
                    dispatchAppAction(
                        createActionWithPayload(
                            AppActionsNames.GLOBAL_MULTIPLIER_PURCHASE,
                            props.upgradeProps
                        )
                    );
                    break;
            }

        }
    };
    let Description;
    switch (props.upgradeProps.upgradeName) {
        case UpgradeNames.clickPower:
            Description = (
                <div className={"tooltip-values"}>
                    <div>{`Each fire click produces ${props.upgradeProps.EPC} ${props.upgradeProps.EPC > 1 ? "embers" : "ember"}`}</div>
                </div>)
            break;
        case UpgradeNames.globalMultiplier:
            Description = (
                <div className={"tooltip-values"}>
                    <div>{`Current multiplier: x${props.upgradeProps.EPC}`}</div>
                </div>)
            break;
    }
    return (
      <HtmlTooltip
        title={
          <React.Fragment>
            <div className={"tooltip-name"}>
              {props.upgradeProps.upgradeName}
            </div>
            <div className={"tooltip-description"}>
              {props.upgradeProps.description}
            </div>
            <hr />
              {Description}
            <div className={"tooltip-cost"}>
              Ember cost:{" "}
              {(
                props.upgradeProps.upgradeCost * appState.buyQuantity
              ).toLocaleString()}
            </div>
          </React.Fragment>
        }
      >
        <div
          className={props.classname}
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleUpgradeClick()
          }
        >
          <div className={"upgrade-name"}>{props.upgradeProps.upgradeName}</div>
          <div className={"upgrade-level"}>
            {props.upgradeProps.quantity > 0
              ? "Lv." + props.upgradeProps.quantity
              : ""}
          </div>
          <div className={"upgrade-cost"}>
            {(
              props.upgradeProps.upgradeCost * appState.buyQuantity
            ).toLocaleString()}{" "}
            Embers
          </div>
        </div>
      </HtmlTooltip>
    );
}
