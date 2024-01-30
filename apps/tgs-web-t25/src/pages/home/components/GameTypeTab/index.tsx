import styled from "styled-components";
import { FilterTagTypeEnum, GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import Tab from "./Tab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  flex-shrink: 0;
  gap: 10px;
  padding: 12px 12px 4px;

  ${media.sm} {
    background: ${({ theme }) => theme.black02};
    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background: ${(props) => props.theme.mainBackground};
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
    <TabContainer>
      {filteredGameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, iconActiveUrl, text, gameType, fontSize } = gameTypeItem;

        return (
          <Tab
            key={key}
            imageUrl={iconUrl}
            imageActiveUrl={iconActiveUrl || iconUrl}
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
