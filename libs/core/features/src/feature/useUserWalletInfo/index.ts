import { useContext } from "react";
import { UserWalletInfoContext } from "./contexts/UserWalletInfoContext";

export const useUserWalletInfoContext = () => useContext(UserWalletInfoContext);
export * from "./contexts/UserWalletInfoContext";
