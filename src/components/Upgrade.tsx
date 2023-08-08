import React, { useContext } from "react";
import { AppActionsNames, createActionWithPayload } from "../mechanics/appActions";
import { AppStateContext } from "../mechanics/appContext";
import { IUpgrade } from "../mechanics/Upgrade";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export interface UpgradeComponentProps {
  upgradeProps: IUpgrade;
  classname: string;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement={"right"}
    disableInteractive
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FAEBD7FF",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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
    const epsDisplay: string = `Each ${props.upgradeProps.upgradeName} produces ${props.upgradeProps.power} embers per second`;
    const epsDisplayTotal: string = `${
      props.upgradeProps.upgradeName
    } produces a total of ${
      props.upgradeProps.power * props.upgradeProps.quantity
    } embers per second`;
    const upgradeContent = (
      <div className={"tooltip-values"}>
        <div>{epsDisplay}</div>
        <div>{epsDisplayTotal}</div>
      </div>
    );
    return (
      <HtmlTooltip
        title={
          <React.Fragment>
            <div className={"tooltip-name"}>
              {props.upgradeProps.quantity > 0
                ? props.upgradeProps.upgradeName
                : "???"}
            </div>
            <div className={"tooltip-description"}>
              {props.upgradeProps.quantity > 0
                ? props.upgradeProps.description
                : "???"}
            </div>
            <hr />
            {props.upgradeProps.quantity > 0 ? upgradeContent : ""}
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
            {(
              props.upgradeProps.upgradeCost * appState.buyQuantity
            ).toLocaleString()}{" "}
            Embers
          </div>
        </div>
      </HtmlTooltip>
    );
  }
}
