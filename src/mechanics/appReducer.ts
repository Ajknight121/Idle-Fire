import { IGlobalAppState } from "./GlobalAppState";
import { ActionToFuncMap, IAppAction } from "./appActions";

export const AppReducer = (
  state: IGlobalAppState,
  action: IAppAction
): IGlobalAppState => {
  return ActionToFuncMap[action.type](state, action.payload);
};
