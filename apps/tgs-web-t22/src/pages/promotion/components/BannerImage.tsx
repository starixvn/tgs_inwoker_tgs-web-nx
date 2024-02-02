import { useMemo } from "react";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1200 / 486;
  border-radius: 16px;
  object-fit: contain;
`;

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
    <Image
      src={imageUrl}
      alt={promotionData.name}
    />
  );
};

export default BannerImage;
