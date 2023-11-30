import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useParams } from "react-router-dom";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import bg from "@/assets/t29/images/home/home_bg.png";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import useGameTypeList from "@/hooks/home/useGameTypeList";

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

const SliderWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;

  ${media.sm} {
    height: 100%;
    max-height: 450px;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    background-image: url(${bg});
    background-size: unset;
    background-repeat: repeat;
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

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();

  const { activeGameType, activeGameTypeKey, handleChangeGameType, activeNavPopupGameType } =
    useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const hasNavData = !!navPopupCategoryList.length;
  const history = useHistory();
  const gameTypeList = useGameTypeList();

  const isNonLobbyList: number[] = [GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME];

  const isNonLobby = isNonLobbyList.includes(activeGameType);

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
      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
      {!!general.banner.length && (
        <SliderWrapper>
          {isMobileSize && <Slider />}
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
        </SliderWrapper>
      )}
      {isMobileSize && <CardPrompt />}

      <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
