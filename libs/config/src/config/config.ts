import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

const config = {
    isPC: isMobileOnly ? 1 : 0,
    features: featureList["default"],
}

export default config;