import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

export const useAuthContext = () => useContext(AuthContext);
export * from "./contexts/authContext";
export * from "./hooks/useAuth";
