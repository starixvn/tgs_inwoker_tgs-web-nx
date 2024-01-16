import modalReducer from "../../api-services/reducers/modalReducer";
import rootReducer from "../../api-services/reducers/rootReducer";
import uiReducer from "../../api-services/reducers/uiReducer";
import walletReducer from "./walletReducer";
import accountReducer from "./accountReducer";

// export * from "../../api-services/reducers/accountReducer";
export * from "../../api-services/reducers/bonusReducer";
export * from "../../api-services/reducers/gameReducer";
export * from "../../api-services/reducers/generalReducer";

export { modalReducer, rootReducer, uiReducer, walletReducer, accountReducer };
