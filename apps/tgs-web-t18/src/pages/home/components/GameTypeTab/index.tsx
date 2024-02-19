import styled from "styled-components";
import { FilterTagTypeEnum, GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { HTMLProps } from "react";
import Tab from "./Tab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";

const TabContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* Enable smooth scrolling on iOS */
  margin-bottom: 15px;
  ${media.sm} {
    margin-bottom: unset;
    background-color: ${({ theme }) => theme.primaryLight};
    border-radius: 10px;
    padding: 4px;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
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

const GameTypeTab = (props: HTMLProps<HTMLDivElement>) => {
  const history = useHistory();
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag, providerList } =
    useHomeGameContext();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const switchGameType = (gameTypeItem: GameTypeItem) => {
    // 把filter tag的狀態清空
    handleChangeActiveProviderFilterTag(allTag);
    handleChangeActiveFilterTag(allTag);

    if (gameTypeItem.gameType === activeGameType) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push(`/`);
    } else {
      handleChangeGameType(gameTypeItem.gameType);
      history.push(`/main/${gameTypeItem.key}`);
    }
  };

  const filteredGameTypeList = gameTypeList.filter((gameTypeItem) => {
    if (gameTypeItem.gameType === GameTypeEnum.NONE) return true;

    if (providerList.length) {
      const hasData = providerList.some((provider) => {
        return provider.gametypes.includes(gameTypeItem.gameType);
      });
      return hasData;
    }
    return true;
  });

  return (
    // @ts-ignore
    <TabContainer {...props}>
      {filteredGameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType, fontSize } = gameTypeItem;

        return (
          <Tab
            key={key}
            imageUrl={iconUrl}
            imageActiveUrl={iconUrl}
            text={text}
            isActive={gameType === activeGameType}
            fontSize={fontSize}
            onClick={() => switchGameType(gameTypeItem)}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;
