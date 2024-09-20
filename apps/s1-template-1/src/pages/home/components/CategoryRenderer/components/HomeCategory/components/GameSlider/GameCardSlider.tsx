import GameCard from "@/pages/home/components/GameCard";
import { GameCardBg } from "@/pages/home/components/GameCard/style";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { utility } from "@tgs-web-nx/utils";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const NoGame = styled.div`
  border: 1px solid grey;
  width: 14rem;
  height: 18.9rem;
  border-radius: 1rem;
`;

interface IGameSlider {
  data: Array<any>;
  extraClassName?: string;
}

const GameCardSlider: React.FC<IGameSlider> = (props: IGameSlider) => {
  const { data } = props;
  const { isDesktopSize } = useRwd();

  const gameListTmp = Array.from(Array(9).keys());
  const loadGameList = () => {
    return gameListTmp.map((index) => {
      return <GameCardBg key={index} />;
    });
  };

  return (
    <>
      {data.length === 0 && loadGameList()}
      {data.map((gameItem, index) => {
        const { id, gpcode, code } = gameItem;

        return (
          <div className="embla__slide" key={index}>
            <GameCard
              key={id}
              gameItem={gameItem}
              imageUrl={utility.getGameNameUrl(gpcode, code, isDesktopSize)}
            />
          </div>
        );
      })}
    </>
  );
};

export default GameCardSlider;
