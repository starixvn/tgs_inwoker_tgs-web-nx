import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

const config = {
  // baseUrl: import.meta.env.PROD ? "/api/" : "https://stg-t1.rpgp.cc/api/",
  // baseUrl: "", // LOCAL
  baseUrl: "", //dev
  operatorPath: "/operator/api/",
  brandPath: "/brand/api/",
  client: "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: "HKD",
  brand: "GPI", //TODO: Need dynamic here
  brandId: "4e86719f-243f-46f6-b010-5c758b7285af",
  brandName: "GPI",
  sourceUrl: "https://images.srvptt.com/",
  defaultLanguage: "en-US",
  affiliateId: "",
  features: featureList["default"],
  brandTitle: "",
  AgentAdminUrl: null,
};

config.isPC = isMobileOnly ? 1 : 0;

export default config;
