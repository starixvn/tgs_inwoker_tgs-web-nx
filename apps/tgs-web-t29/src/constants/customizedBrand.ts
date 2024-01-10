import config from "@tgs-web-nx/config";

const customizedBrandList = ["MOVN2"];
export const isCustomizedBrand = customizedBrandList.includes(config.brand);