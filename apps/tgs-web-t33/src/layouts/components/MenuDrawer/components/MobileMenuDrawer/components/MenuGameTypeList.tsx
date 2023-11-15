import styled from "styled-components";
import { GameTypeItem, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
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
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const history = useHistory();

  const handleTabClick = (gameTypeItem: GameTypeItem) => {
    if (history.location.pathname !== "/") {
      history.push("/");
    }

    handleChangeGameType(gameTypeItem.gameType);
    handleToggleMenu(false);
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
