import styled from "styled-components";
import { GameTypeItem, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const TabContainer = styled.div`
  background: ${({ theme }) => theme.black};
  width: 100%;
  overflow-x: scroll;
  display: flex;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const handleTabClick = (gameType: GameTypeEnum) => {
    if (isMenuOpen) {
      handleToggleMenu(false);
    }

    handleChangeGameType(gameType);
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
            onClick={() => handleTabClick(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default MenuGameTypeList;
