import React from "react";
import styled from "styled-components";
import { GameTypeItem, useAuthContext, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all ease-in-out 0.2s;
  }
`;

const Label = styled.div`
  position: relative;
  font-size: 1.25rem;
  transition: all ease-in-out 0.2s;
  z-index: 1;
`;

const BlueBorder = styled.div`
  margin-top: 10px;
  height: 1px;
  width: 27px;
  border-bottom: 1px solid #76b7ec;
  transition: all ease-in-out 0.2s;
`;

const Border = styled.div`
  position: relative;
  margin-top: 10px;
  height: 1px;
  width: 46px;
  border-bottom: 1px solid ${({ theme }) => theme.white};
  transition: all ease-in-out 0.2s;
  z-index: 1;
`;

const HoverMask = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 0;
  background: #0a2a424d;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ease-in-out 0.2s;
`;

const GameTypeCategoryCardContainer = styled.div`
  height: 160px;
  width: calc(100% / 3);
  padding: 20px;
  cursor: pointer;
  border: 1px solid #1f72ad;
  position: relative;

  &:hover {
    border: 1px solid ${({ theme }) => theme.green};

    ${Label} {
      margin-top: -50%;
    }

    ${Border} {
      margin-top: -50%;
    }

    ${HoverMask} {
      top: 0;
      opacity: 1;
    }

    & img {
      transform: scale(1.2);
    }
  }
`;

type Props = {
  gameTypeItem: GameTypeItem;
};

const GameTypeCategoryCard = ({ gameTypeItem }: Props) => {
  const { handleChangeGameType } = useHomeGameContext();

  const history = useHistory();
  const handleClick = () => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };
  return (
    <GameTypeCategoryCardContainer onClick={handleClick}>
      <Label>{gameTypeItem.text}</Label>
      <Border />
      <BackGround>
        <img src={gameTypeItem.bgUrl || ""} />
      </BackGround>

      <HoverMask>
        Go
        <BlueBorder />
      </HoverMask>
    </GameTypeCategoryCardContainer>
  );
};

export default GameTypeCategoryCard;
