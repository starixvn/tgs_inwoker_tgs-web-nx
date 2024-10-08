import { brandConfig, defaultConfig, mapBrandName } from "./config/brand";
import config from "./config/config";
import featureList from "./config/features";

declare global {
  interface Window {
    envConfig: any;
  }
}

let mergedConfigs: any = null;

const getConfig = () => {
  if (mergedConfigs) {
    return mergedConfigs;
  }
  mergedConfigs = config;
  console.log("window", window);
  if (window) {
    mergedConfigs = window.envConfig ? { ...config, ...window.envConfig } : config;
  }
  return mergedConfigs;
};

export default getConfig();
export { featureList, brandConfig, defaultConfig, mapBrandName };
