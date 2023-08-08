import {IUpgrade} from "./mechanics/Upgrade";

export const fireTenders: IUpgrade[] = [
  {
    unlocked: true,
    upgradeName: "Stick Thrower",
    upgradeCost: 20,
    power: 5,
    quantity: 1,
    description: "",
  },
  {
    unlocked: false,
    upgradeName: "Lighter thrower",
    upgradeCost: 50,
    power: 10,
    quantity: 1,
    description: "",
  },
  {
    unlocked: false,
    upgradeName: "Log chucker",
    upgradeCost: 100,
    power: 25,
    quantity: 0,
    description: "",
  },
  {
    unlocked: false,
    upgradeName: "Gasoline thrower",
    upgradeCost: 250 ,
    power: 100,
    quantity: 0,
    description: "",
  },
  {
    unlocked: false,
    upgradeName: "Tire dumper",
    upgradeCost: 500 ,
    power: 250,
    quantity: 0,
    description: "",
  },
  {
    unlocked: false,
    upgradeName: "Coal shucker",
    upgradeCost: 1000,
    power: 400,
    quantity: 0,
    description: "",
  },
];
