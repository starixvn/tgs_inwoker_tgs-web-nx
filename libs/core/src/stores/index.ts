import { applyMiddleware, legacy_createStore as createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./index";

export * from "./actions";
export * from "./reducers";

export * from "./useAccountStore";
export * from "./useBonusStore";
export * from "./useGameStore";
export * from "./useGeneralStore";
export * from "./useInboxStore";
export * from "./useModalStore";
export * from "./useUiStore";
export * from "./useWalletStore";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
) as Store<any>;
