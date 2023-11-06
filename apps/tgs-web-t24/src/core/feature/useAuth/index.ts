import { useContext } from "react";
import { AuthContext } from "@/core/feature/useAuth/contexts/authContext";

export const useAuth = () => useContext(AuthContext);
