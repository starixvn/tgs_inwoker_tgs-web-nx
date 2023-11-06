import { useContext } from "react";
import { HeaderContext } from "@/core/feature/useHeader/contexts/headerContext";

export const useHeader = () => useContext(HeaderContext);
