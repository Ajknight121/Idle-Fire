import {IUpgrade} from "./model/Upgrade";

export const fireTenders: IUpgrade[] = [
  {
    unlocked: true,
    upgradeName: "Stick Thrower",
    upgradeCost: 20,
    EPS: 5,
    quantity: 1,
    // description: "",
  },
  {
    unlocked: false,
    upgradeName: "Lighter thrower",
    upgradeCost: 50,
    EPS: 10,
    quantity: 1,
    // description: "",
  },
  {
    unlocked: false,
    upgradeName: "Log chucker",
    upgradeCost: 100,
    EPS: 25,
    quantity: 0,
    // description: "",
  },
  {
    unlocked: false,
    upgradeName: "Gasoline thrower",
    upgradeCost: 250 ,
    EPS: 100,
    quantity: 0,
    // description: "",
  },
  {
    unlocked: false,
    upgradeName: "Tire dumper",
    upgradeCost: 500 ,
    EPS: 250,
    quantity: 0,
    // description: "",
  },
  {
    unlocked: false,
    upgradeName: "Coal shucker",
    upgradeCost: 1000,
    EPS: 400,
    quantity: 0,
    // description: "",
  },
];
