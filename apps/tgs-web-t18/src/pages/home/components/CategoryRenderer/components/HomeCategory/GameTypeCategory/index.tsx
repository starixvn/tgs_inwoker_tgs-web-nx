import React from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameItem } from "@tgs-web-nx/types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import CategorySlider from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory/CategorySlider";

const GameTypeCategoryContainer = styled.div``;

export const CategoryHeader = styled.div`
  color: #9dacd0;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  gap: 8px;
`;

export const MoreButton = styled.div`
  color: ${({ theme }) => theme.tertiaryMiddle};
  background: ${({ theme }) => theme.primaryLight};
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 8px 12px;
  cursor: pointer;
`;

const GameTypeTextWrapper = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  display: flex;
  align-items: center;
  gap: 5px;
  & img {
    width: 28px;
    height: 28px;
  }
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
        <GameTypeTextWrapper>
          <img src={gameTypeItem.iconUrl} alt="gametype" />
          {gameTypeItem.text}
        </GameTypeTextWrapper>

        <MoreButton onClick={handleClick}>{i18n.t("web.slotGame.more")}</MoreButton>
      </CategoryHeader>

      {!!gameList.length && <CategorySlider gameType={gameTypeItem.gameType} gameList={gameList} />}
    </GameTypeCategoryContainer>
  );
};

export default React.memo(GameTypeCategory);
