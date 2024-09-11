import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

const config = {
  // baseUrl: import.meta.env.PROD ? "/api/" : "https://stg-t1.rpgp.cc/api/",
  baseUrl: "", // LOCAL
  //baseUrl: "https://player-site-t28.nexentgame.com", //dev
  operatorPath: "/operator/api/",
  // operatorPath: "https://localhost:7001/api/", //dev
  brandPath: "/brand/api/",
  // brandPath: "http://localhost:5006/api/", // dev
  assetsPath: "https://assets.nexentgame.com/", //dev
  //assetsPath: "/repository/",
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
  offeredGameType: []
};

config.isPC = isMobileOnly ? 1 : 0;

export default config;
