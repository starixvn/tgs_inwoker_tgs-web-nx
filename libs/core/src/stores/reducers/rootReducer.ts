import { combineReducers } from "redux";
import {
  uiReducer,
  accountReducer,
  bonusReducer,
  generalReducer,
  gameReducer,
  walletReducer,
  modalReducer,
} from "./index";

const rootReducer = combineReducers({
  ui: uiReducer,
  account: accountReducer,
  bonus: bonusReducer,
  modal: modalReducer,
  general: generalReducer,
  wallet: walletReducer,
  game: gameReducer,
});

export default rootReducer;
