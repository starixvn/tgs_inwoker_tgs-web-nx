import React from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameItem } from "@tgs-web-nx/types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import CategorySlider from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory/CategorySlider";
import Icon from "@/components/project/Icon";

const GameTypeCategoryContainer = styled.div`
  padding: 14.49px;
`;

export const CategoryHeader = styled.div`
  color: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  gap: 8px;
`;

export const MoreButton = styled.div`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.black02};
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 8px 12px;
  cursor: pointer;
`;

type Props = {
  gameTypeItem: GameTypeItem;
  gameList: GameItem[];
};

const GameTypeCategory = ({ gameTypeItem, gameList }: Props) => {
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const handleClick = () => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  return (
    <GameTypeCategoryContainer>
      <CategoryHeader>
        {gameTypeItem.text}

        <MoreButton onClick={handleClick}>{i18n.t("web.slotGame.more")}</MoreButton>
      </CategoryHeader>

      {!!gameList.length && <CategorySlider gameType={gameTypeItem.gameType} gameList={gameList} />}
    </GameTypeCategoryContainer>
  );
};

export default React.memo(GameTypeCategory);
