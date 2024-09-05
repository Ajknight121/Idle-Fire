# Idle Fire

A Clicker game about growing your own fire. Link to game HERE: <a>aokspace.com</a>

## Overview
Idle Fire is a clicker game where the aim of the game is to click to create embers and to use those embers to purchase upgrades that help make more embers by either producing embers automatically or increasing the amount of embers you make when you click. Watch out for firemen they want to spoil the fun and slow the growth of your fire.

This project was coded in Reactjs and Typescript and uses React's useReducer to follow the Redux design pattern. A factory design pattern is used for managing the game's upgrades.

## Project Breakdown
### Managing State
The game's immutable state is defined in `GlobalAppState.tsx` and keeps track of all game data and functions that control the game.

When the user's action needs to modify the `GlobalAppState`, React's `useReducer` hook is used with a Record<> that maps actions to `GlobalAppState` functions that return a new state with modified values. When the action is needed, React.Dispath is used to dispatch an `IAppAction` object that specifies the action and payload to use the the Record<> defined in `appActions.ts`.

Example: \
When the user clicks on an upgrade a dispatch is made with the "UPGRADE_PURCHASE" action name and a payload of upgradeProps to the reducer which accesses the GlobalAppState.buyUpgrade function through the Record<>. The buyUpgrade() function then return a new state with the updated upgrade.

### Storing game data
All data is stored in `GlobalAppState` which is saved to the browser's LocalStorage.

### Making the game ``idle``
The games idle feature of adding embers automatically after an upgrade is purchased is done by having a setting a 1 second interval with a dispatch to `addEmbersPerSecondOnTick` in `GlobalAppState` the embers added is a sum that is modified when a upgrade is purchased, multipliers are then applied to the sum.
Because React re-renders on any values changed the interval is in a React `useEffect` which will not rerender during regular gameplay.

The game's ember producers and click upgrades implement the `IUpgrade` interface. The default initialization of upgrades and their requirements for being revealed are managed by the `GameUpgradesFactory` in `gameUpgrades.ts`.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project, so you have full control over them. All the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
