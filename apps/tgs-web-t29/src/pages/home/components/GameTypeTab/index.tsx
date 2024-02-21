import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTagTypeEnum, GameTypeItem, useHomeGameContext, useProvider } from "@tgs-web-nx/core/features";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Tab from "./Tab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import LoadingSvg from "@/components/project/LoadingSvg";

const TabContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 72px;
  max-height: 862px; //826/926
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  flex-shrink: 0;
  gap: 3px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};

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

const SvgContainer = styled.div`
  height: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 72px;
  flex-shrink: 0;
`;

const GameTypeTab = () => {
  const history = useHistory();
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag } = useHomeGameContext();
  const { providerList, isLoading } = useProvider();
  const [filteredGameTypeList, setFilteredGameTypeList] = useState<GameTypeItem[]>([]);

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const switchGameType = (gameTypeItem: GameTypeItem) => {
    // 把filter tag的狀態清空
    handleChangeActiveProviderFilterTag(allTag);
    handleChangeActiveFilterTag(allTag);

    if (gameTypeItem.gameType === GameTypeEnum.NONE) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push(`/`);
    } else {
      handleChangeGameType(gameTypeItem.gameType);
      history.push(`/main/${gameTypeItem.key}`);
    }
  };

  useEffect(() => {
    if (providerList && gameTypeList) {
      const filteredList = gameTypeList.filter((gameTypeItem) => {
        if (providerList.length) {
          const hasData = providerList.some((provider) => {
            return provider.gametypes.includes(gameTypeItem.gameType);
          });
          return hasData;
        }
        return true;
      });

      setFilteredGameTypeList(filteredList);
    }
  }, [providerList, gameTypeList]);
  if (isLoading || !gameTypeList.length || !providerList.length) {
    return <SvgContainer><LoadingSvg /></SvgContainer>
  }

  return (
    <TabContainer>
      {filteredGameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType, fontSize } = gameTypeItem;

        return (
          <Tab
            key={key}
            imageUrl={iconUrl}
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
