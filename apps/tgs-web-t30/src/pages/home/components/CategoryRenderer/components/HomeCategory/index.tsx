import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import React from "react";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import GameTypeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";

const DesktopContainer = styled.div`
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
  }
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { gameTypeItemList } = useGetHomeCategoryListV2();

  const handleClick = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  return (
    <DesktopContainer>
      {gameTypeItemList.map((gameTypeItem) => {
        return <GameTypeCategory key={gameTypeItem.key} gameTypeItem={gameTypeItem} />;
      })}
    </DesktopContainer>
  );
};

export default React.memo(HomeCategory);
