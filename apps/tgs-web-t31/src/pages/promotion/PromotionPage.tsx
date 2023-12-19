import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { Dialog, Button as MuiButton, styled as muiStyled } from "@mui/material";
import { useHistory } from "react-router";
import PromotionDetail from "./PromotionDetailPage";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PageContainer } from "@/components/styled-component/PageContainer";
import useBanner from "@/hooks/home/useBanner";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import MobileSlider from "@/pages/home/components/Slider";
import Banner from "@/pages/home/components/Banner";
const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* margin-top: 40px; */
  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const BannerWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;

  ${media.sm} {
    height: 100%;
    max-height: 450px;
  }
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 450px;
  margin: 0 auto;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const PromotionCardContaner = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.iconLable};
  ${media.sm} {
    width: calc((100% - 300px) / 2);
  }
`;

const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  background: theme.palette.secondaryGradient,
  fontSize: "16px",
  fontWeight: 590,
  lineHeight: "19px",
  letterSpacing: "0em",
  textAlign: "center",
  width: "100%",
  height: "44px",
  padding: " 10px, 12px, 10px, 12px",
  borderRadius: "4px",
  marginTop: "8px",
}));

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  const { isMobileSize, isDesktopSize } = useRwd();
  const history = useHistory();
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();

  const { activeGameType, activeGameTypeKey, activeNavPopupGameType } = useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const hasNavData = !!navPopupCategoryList.length;

  const isNonLobbyList: number[] = [GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME];

  const isNonLobby = isNonLobbyList.includes(activeGameType);
  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PageContainer>
      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
      {isMobileSize && hasActiveMobileBanner() && <MobileSlider />}
      {isMobileSize && hasActiveDesktopBanner() ? (
        <BannerWrapper>
          {isDesktopSize && !!activeGameType && !isNonLobby && (
            <GameTypeBanner
              $imageUrl={
                activeGameTypeKey
                  ? `${
                      import.meta.env.BASE_URL
                    }assets/images/home/gameType_banner/${activeGameTypeKey}.png`
                  : ""
              }
            />
          )}
          {isDesktopSize && !activeGameType && <Banner />}
        </BannerWrapper>
      ) : null}
      <PromotionCardListContainer>
        {promotionList
          .sort((a, b) => a.order - b.order)
          .map((promotionData) => (
            <PromotionCardContaner key={promotionData.id}>
              <PromotionCard promotionData={promotionData} />
              {isMobileSize && (
                <StyledButton
                  onClick={() => {
                    history.push("/promotion/" + promotionData.id);
                  }}
                >
                  {i18n.t("promotion.details").toLocaleUpperCase()}
                </StyledButton>
              )}
            </PromotionCardContaner>
          ))}
      </PromotionCardListContainer>
    </PageContainer>
  );
};

export default PromotionPage;
