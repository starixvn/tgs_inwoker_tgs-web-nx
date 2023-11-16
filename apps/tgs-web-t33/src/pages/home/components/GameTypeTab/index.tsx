import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Tab from "./Tab";
import useHomeGameTypeList from "@/hooks/home/useHomeGameTypeList";
import { media } from "@/theme/breakpoints";

const TabContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${media.sm} {
    margin-bottom: unset;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      background: ${(props) => props.theme.tertiaryDark};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

const GameTypeTab = () => {
  const gameTypeList = useHomeGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMobileSize } = useRwd();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag } = useHomeGameContext();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const switchGameType = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    // 把filter tag的狀態清空
    handleChangeActiveProviderFilterTag(allTag);
    handleChangeActiveFilterTag(allTag);
  };

  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType } = gameTypeItem;

        if (isMobileSize && gameType === GameTypeEnum.NONE) {
          return null;
        }

        return (
          <Tab
            key={key}
            imageUrl={iconUrl}
            text={text}
            isActive={gameType === activeGameType}
            onClick={() => switchGameType(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;
