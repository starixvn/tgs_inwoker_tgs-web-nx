import React, { useEffect } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHistory, useParams } from "react-router-dom";
import { useProvider } from "@tgs-web-nx/core/features";
import config from "@tgs-web-nx/config";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import Features from "@/pages/home/components/Features";
import HomePromotionCard from "@/pages/home/components/HomePromotion";
import { footerCategoriesList } from "@/layouts/components/Footer/footerCategoriesList";
import ImageCard from "@/pages/home/components/ImageCard";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  
  ${media.sm} {
    margin: 0 auto;
    gap: unset;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 0px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 12px 40px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
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

const BrandDescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
`;

const BrandDescription = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
const Content = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const HomeFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  background-color: ${({ theme }) => theme.footerBGC};
  padding: 6px 12px;
`;

const HomeFooterCategory = styled.div`
  width: 100%;
`;

const CmpContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const HomePage = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
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
        <ContentWrapper>
          {!activeGameType &&
            <>
              <Features />
              <Division />
            </>
          }
          <CategoryRenderer />
          <HomePromotionCard />
        </ContentWrapper>
      </MainContentWrapper>
      <VendorLogoWrapper>
        <VendorLogoCard>
          {vendorLogoUrlList.map((vendor) => {
            return <img key={vendor.gpCode} src={vendor.logoUrl} alt={vendor.gpCode} />;
          })}
        </VendorLogoCard>
      </VendorLogoWrapper>
      <BrandDescriptionWrapper>
        <BrandDescription>
          <Title>{config.brand} Gaming: A Winning Casino</Title>
          <Content>{config.brand} Gaming is the leading destination for all online casino players who are looking for a touch of class and elegance in their gaming environment. Our casino provides you with over 400 online casino games – some traditional with modern twists, and some completely new, innovative, and exotic. With irresistible weekly bonus promotions and attractive loyalty and VIP programs, we're sure you'll be sticking around for a while to come. All of our software is developed and maintained by the industry's foremost online gaming software company, Pegasus. Because of this, we are able to offer you the newest cutting-edge games, of the highest quality and ultimate security in a sophisticated, yet engaging atmosphere.</Content>
        </BrandDescription>
      </BrandDescriptionWrapper>

      {isMobileSize && footerCategoriesList.map((category, index) => (
        <HomeFooterWrapper key={index}>
          <HomeFooterCategory>
            {category.content ? (
              <CmpContentWrapper>{category.title}{category.content}</CmpContentWrapper>
            ) : (
              <ImageCard
                title={category.title}
                imageUrl={category.imageUrl}
                text={category.text}
                alignment={category.alignment}
              />
            )}
          </HomeFooterCategory>
        </HomeFooterWrapper>
      ))}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
