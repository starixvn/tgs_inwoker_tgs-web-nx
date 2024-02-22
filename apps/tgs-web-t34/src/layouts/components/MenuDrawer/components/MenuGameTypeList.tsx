import styled from "styled-components";
import { GameTypeItem, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const TabContainer = styled.div`
  background: ${({ theme }) => theme.black};
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const history = useHistory();
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const handleTabClick = (gameTypeItem: GameTypeItem) => {
    if (isMenuOpen) {
      handleToggleMenu(false);
    }

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
