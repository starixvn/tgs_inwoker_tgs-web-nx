import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

const config = {
    isPC: isMobileOnly ? 1 : 0,
    features: featureList["default"],
    baseUrl: "",
    operatorPath: "",
    brandPath: "",
    assetsPath: "",
    sentryPath: "",
    sabaApiUrl: "",
    operatorSignalr: "",
    client: "",
    currency: "",
    brand: "",
    brandId: "",
    brandName: "",
    sourceUrl: "",
    defaultLanguage: "",
    affiliateId: "",
    brandTitle: "",
    agentAdminUrl: null,
    sabaGamePath: "",
    liveChatDepartment: "",
    offeredGameTypes: "",
    i18nLoadPath: "",
    i18nAddPath: "",
    encryptPublicKey: "",
    theme: ""
}

export default config;