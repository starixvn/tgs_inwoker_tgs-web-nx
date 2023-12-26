import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore, useUiStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useParams } from "react-router-dom";
import { useProvider } from "@tgs-web-nx/core/features";
import CategoryLabel from "./components/CategoryRenderer/components/LobbyCategory/components/CategoryLabel";
import PartnerTags from "./components/PartnerTags";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import GameTypeTab from "@/pages/home/components/GameTypeTab/mobile";
import Features from "@/pages/home/components/Features";
import HomePromotionCard from "@/pages/home/components/HomePromotion";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  
  ${media.sm} {
    /* max-width: ${MAIN_CONTENT_MAX_WIDTH}; */
    margin: 0 auto;
    gap: unset;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 12px 40px 12px;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 10px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 0px;
  }
`;

const Division = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.20);
`;

const VendorLogoWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VendorLogoCard = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & > img {
    width: calc((100% - 20px * 5) / 5);
    height: 100%;
    margin: 10px;
    object-fit: contain;

    ${media.sm} {
      width: calc((100% - 120px * 5) / 5);
    }
  }
`;

const HomePage = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const { activeGameType, activeGameTypeKey, handleChangeGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();
  const { providerList } = useProvider();

  const vendorCodeList = providerList.map((provider) => provider.code);
  const vendorLogoUrlList = vendorCodeList.map((gpCode) => {
    return ({
      gpCode: gpCode,
      logoUrl: `/assets/images/home/provider_logo_gray/${gpCode}.png`
    });
  });

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  useEffect(() => {
    const gameType = getGameTypeFromKey(urlGameType);
    if (gameType) {
      handleChangeGameType(gameType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlGameType]);

  return (
    <MainWrapper>
      <MainContentWrapper>
        {isMobileSize && <><CardPrompt /><Banner /></>}
        {isDesktopSize && <><Banner /><CardPrompt /></>}
        {!activeGameType &&
          <>
            <Features />
            <Division />
          </>
        }
        <CategoryRenderer />
        <HomePromotionCard />
      </MainContentWrapper>
      <VendorLogoWrapper>
        <VendorLogoCard>
          {vendorLogoUrlList.map((vendor) => {
            return <img key={vendor.gpCode} src={vendor.logoUrl} alt={vendor.gpCode} />;
          })}
        </VendorLogoCard>
      </VendorLogoWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
