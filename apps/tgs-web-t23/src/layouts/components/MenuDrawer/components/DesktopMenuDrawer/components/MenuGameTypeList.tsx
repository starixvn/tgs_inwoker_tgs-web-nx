import styled from "styled-components";
import { useHeader, FilterTagTypeEnum, useHomeGameContext, GameTypeItem } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const gameTypeList = useGameTypeList();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag } = useHomeGameContext();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMenuOpen } = useHeader();
  const history = useHistory();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const handleTabClick = (gameTypeItem: GameTypeItem) => {
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

  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType } = gameTypeItem;

        return (
          <MenuGameTab
            key={key}
            imageUrl={iconUrl}
            text={isMenuOpen ? text : ""}
            isActive={gameType === activeGameType}
            onClick={() => handleTabClick(gameTypeItem)}
          />
        );
      })}
    </TabContainer>
  );
};

export default MenuGameTypeList;
