//@ts-nocheck
import { useEffect, useState } from "react";
import config from "@tgs-web-nx/config";
import axios from "axios";
import { GetBrandResDto } from "@tgs-web-nx/types";
import { isMobileOnly } from "react-device-detect";

export function useFeatureToggle() {
  const [isFeatureToggleFetched, setIsFeatureToggleFetched] = useState(false);

  function getJsonData(brandName: string) {
    if (!brandName) return;

    return axios.get(`https://app12.srvptt.com/config_${brandName}.json`);
  }

  useEffect(() => {
    const apiUrl = config.baseUrl;

    async function fetchFeatureToggle() {
      const res = (await axios.get(`${apiUrl}brand`)) as GetBrandResDto;
      const branId = res.data.brandId;
      const brandName = res.data.code;
      const getJsonRes = await getJsonData(brandName || "");
      const jsonData = getJsonRes.data;

      const newConfig = {
        ...config,
        baseUrl: apiUrl,
        client: branId || "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
        currency: jsonData.Currency || config.currency || "HKD",
        brand: brandName,
        brandName: brandName,
        sourceUrl: jsonData.SourceUrl || config.sourceUrl || "https://images.srvptt.com/",
        defaultLanguage: jsonData.DefaultLanguage || config.defaultLanguage || "en-US",
        affiliateId: jsonData.AffiliateId || config.affiliateId || "",
        isPC: isMobileOnly ? 1 : 0,
        features: jsonData,
        brandTitle: jsonData.BrandTitle || config.brandTitle || "",
      };

      config.baseUrl = newConfig.baseUrl;
      config.currency = newConfig.currency;
      config.brand = newConfig.brand;
      config.brandName = newConfig.brandName;
      config.sourceUrl = newConfig.sourceUrl;
      config.defaultLanguage = newConfig.defaultLanguage;
      config.affiliateId = newConfig.affiliateId;
      config.isPC = newConfig.isPC;
      config.features = { ...config.features, ...newConfig.features };
      config.brandTitle = newConfig.brandTitle;
      setIsFeatureToggleFetched(true);
    }

    fetchFeatureToggle();
  }, []);

  return {
    isFeatureToggleFetched,
  };
}
