import { useMemo } from "react";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";

const BannerImage = ({ promotionData }: { promotionData: Promotion }) => {
  const { isMobileSize } = useRwd();
  const language = i18n.language;

  const [mobileBanner, desktopBanner] = useMemo(() => {
    if (!promotionData) return "";

    let mobileBanner = promotionData.mobileBanner;
    let desktopBanner = promotionData.desktopBanner;

    const mobileBannerByLocale = promotionData.localization[language]?.mobileBanner;
    const desktopBannerByLocale = promotionData.localization[language]?.desktopBanner;

    if (mobileBannerByLocale) {
      mobileBanner = mobileBannerByLocale;
    }
    if (desktopBannerByLocale) {
      desktopBanner = desktopBannerByLocale;
    }
    return [mobileBanner, desktopBanner];
  }, [promotionData, language]);

  const imageUrl = isMobileSize ? mobileBanner : desktopBanner;
  return (
    <img
      src={imageUrl}
      alt={promotionData.name}
      width={"100%"}
      height={"100%"}
      style={{ objectFit: "cover" }}
    />
  );
};

export default BannerImage;
