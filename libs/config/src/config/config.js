import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

const config = {
  baseUrl: import.meta.env.PROD ? "/api/" : "https://stg-momotest.rpgp.cc/api/",
  client: "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: "HKD",
  brand: import.meta.env.VITE_APP_BRAND || "PGG",
  brandName: import.meta.env.VITE_APP_BRAND || "PGG",
  sourceUrl: "https://images.srvptt.com/",
  defaultLanguage: "en-US",
  affiliateId: "",
  features: featureList["default"],
  brandTitle: "",
  AgentAdminUrl:null
};

config.isPC = isMobileOnly ? 1 : 0;

export default config;
