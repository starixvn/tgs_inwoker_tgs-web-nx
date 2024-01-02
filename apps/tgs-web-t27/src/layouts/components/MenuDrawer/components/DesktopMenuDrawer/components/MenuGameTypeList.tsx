import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import React from "react";

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
  const { isMenuOpen } = useHeader();
  const history = useHistory();

  const handleTabClick = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);

    if (history.location.pathname !== "/") {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
    }
  };

  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType, iconComponent } = gameTypeItem;

        return (
          <MenuGameTab
            key={key}
            imageUrl={iconUrl}
            text={isMenuOpen ? text : ""}
            isActive={gameType === activeGameType}
            onClick={() => handleTabClick(gameType)}
          >
            {iconComponent && React.createElement(iconComponent)}
          </MenuGameTab>
        );
      })}
    </TabContainer>
  );
};

export default MenuGameTypeList;
