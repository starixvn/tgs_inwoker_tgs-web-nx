import React, { useEffect } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useParams } from "react-router-dom";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { theme } from "@/theme";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

type MainWrapperProps = {
  $isDark: boolean;
  theme: typeof theme;
};

const MainWrapper = styled.div<MainWrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ $isDark, theme }: MainWrapperProps) =>
    $isDark ? "#141B1F" : theme.mainBackground};
  color: ${({ theme }) => theme.white};
  padding: 0px 8px 12px 8px;
  flex-shrink: 0;
  flex: 1;
  position: relative;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    height: unset;
    padding: 0 20px;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
  }
`;

const HomePage = () => {
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const { activeGameType, handleChangeGameType, activeNavPopupGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();
  const isNonLobbyList: number[] = [GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME];

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
    <MainWrapper $isDark={false}>
      <GameTypeTab />

      <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
