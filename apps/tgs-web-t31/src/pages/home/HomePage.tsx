import React, { useEffect } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useParams } from "react-router-dom";
import { Button as MuiButton, styled as muiStyled } from "@mui/material";
import { useUiStore } from "@tgs-web-nx/core";
import MemberInfo from "./components/MemberInfo";
import GameTypeTab from "./components/GameTypeTab";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import MobileSlider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import useBanner from "@/hooks/home/useBanner";
import { PageContainer } from "@/components/styled-component/PageContainer";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  padding: 0px 8px 12px 8px;
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    height: unset;
    padding: 0px 0px 0px 0px;
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

const MainContentWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.white};
  gap: 10px;
  flex-shrink: 0;

  ${media.sm} {
    max-width: calc(961px + 20px * 2);
    gap: 20px;
    padding: unset;
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const Button = muiStyled(MuiButton)(({ theme }) => ({
  height: "56px",
  whiteSpace: "nowrap",
  padding: "10px 12px",
  color: theme.palette.white,
  background: theme.palette.primaryGradient,
  fontFamily: "SF Pro",
  fontSize: "16px",
  fontWeight: 590,
  lineHeight: "19.09px",
  letterSpacing: "0em",
  textAlign: "center",
  flexGrow: 1,
})) as typeof MuiButton;

const RegisterButton = styled(Button)`
  color: ${({ theme }) => theme.primary} !important;
  background: ${({ theme }) => theme.secondaryGradient} !important;
`;

const HomePage = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { isLogin } = useAuth();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();

  const { activeGameType, activeGameTypeKey, handleChangeGameType } = useHomeGameContext();
  const history = useHistory();
  const gameTypeList = useGameTypeList();

  const isNonLobbyList: number[] = [GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME];

  const isNonLobby = isNonLobbyList.includes(activeGameType);
  const {
    ui: { marquees },
  } = useUiStore();

  const hasData = marquees && marquees.length > 0;

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
    <PageContainer>
      {/* {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />} */}
      {isMobileSize && hasActiveMobileBanner() && <MobileSlider />}
      {hasActiveDesktopBanner() ? (
        <BannerWrapper>{isDesktopSize && <Banner />}</BannerWrapper>
      ) : null}

      <MainContentContainer>
        <MainContentWrapper>
          {isMobileSize && <CardPrompt />}

          {isMobileSize ? (
            isLogin ? (
              <MemberInfo />
            ) : (
              <ButtonContainer>
                <Button onClick={() => history.push("/login")}>{i18n.t("common.login")}</Button>
                <RegisterButton onClick={() => history.push("/register")}>
                  {i18n.t("common.register")}
                </RegisterButton>
              </ButtonContainer>
            )
          ) : null}
          {isMobileSize && <GameTypeTab />}
          <CategoryRenderer />
        </MainContentWrapper>
      </MainContentContainer>
    </PageContainer>
  );
};

export default React.memo(HomePage);
