import styled from "styled-components";
import React from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { usePromotionPage } from "@tgs-web-nx/core/hooks";
import { useHistory } from "react-router";
import { i18n } from "@tgs-web-nx/utils";
import Banner from "../../../Banner";
import CardPrompt from "../../../CardPrompt";
import GameTypeCategory from "./GameTypeCategory";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";
import BannerImage from "@/pages/promotion/components/BannerImage";
import VipMedal from "@/components/project/VipMedal";
import homeImg from "@/assets/t21/images/home/ReferralImg.png";
import DownloadImg from "@/assets/t21/images/home/DownloadImg.png";

const HomeCategoryContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${MAIN_CONTENT_MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  flex-shrink: 0;
  flex: 1;
  position: relative;
  gap: unset;
  height: unset;
`;

const CategoryContentWrapper = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  width: 100%;
  margin: 0 auto;
`;

const CategoryContent = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;
  padding: 10px 0;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    visibility: hidden;
  }
`;

const PromotionImg = styled.div`
  max-width: 300px;
  max-height: 100px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: start;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.black};
`;

const ContentText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.black};
  white-space: pre-wrap;
`;

const Wrapper = styled(CategoryContent)`
  display: block;
  max-width: 1200px;
`;

const VIPList = styled(CategoryContent)`
  gap: 40px;
  flex-wrap: wrap;
`;

const GameContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const HomeCategory = () => {
  const { gameTypeItemList, gameTypeDictionary } = useGetHomeCategoryListV2();
  const { promotionList } = usePromotionPage();
  const levelList = Array.from({ length: 9 }, (_, i) => i + 1);
  const history = useHistory();

  return (
    <HomeCategoryContainer>
      <Banner />
      <CardPrompt />
      <CategoryContentWrapper>
        {
          <CategoryContent>
            {promotionList
              .sort((a, b) => a.order - b.order)
              .map((promotionData) => (
                <PromotionImg
                  key={promotionData.id}
                  onClick={() => {
                    history.push("/promotion/" + promotionData.id);
                  }}
                >
                  <BannerImage promotionData={promotionData} />
                </PromotionImg>
              ))}
          </CategoryContent>
        }

        <Wrapper>
          <Title>VIP</Title>
          <VIPList>
            {levelList.map((level) => {
              return <VipMedal key={level} vipLevel={level} width="88px" height="89px" />;
            })}
          </VIPList>
        </Wrapper>
        <Wrapper>
          <Title>Referral program</Title>
          <ContentText>
            PG online casino is well known for its vast selection of games, and with the PG
            Affiliate Program, you can share in the casino’s success while boosting your revenue.
            Become an affiliate for free, share your casino enthusiasm and earn along the way. Your
            success is in your hands!
          </ContentText>
        </Wrapper>
        <Wrapper>
          <img src={homeImg} alt="home" />
        </Wrapper>
        <GameContainer>
          {gameTypeItemList
            .filter(
              (gameTypeItem) =>
                gameTypeItem.gameType === GameTypeEnum.LIVELOBBY ||
                gameTypeItem.gameType === GameTypeEnum.SLOT,
            )
            .reverse()
            .map((gameTypeItem) => {
              return (
                <GameTypeCategory
                  key={gameTypeItem.key}
                  gameTypeItem={gameTypeItem}
                  gameList={gameTypeDictionary[gameTypeItem.gameType] || []}
                />
              );
            })}
        </GameContainer>
        <Wrapper>
          <Title>{i18n.t("wap.main.account.appDownload")}</Title>
          <img src={DownloadImg} alt="download" />
        </Wrapper>
      </CategoryContentWrapper>
    </HomeCategoryContainer>
  );
};

export default React.memo(HomeCategory);
