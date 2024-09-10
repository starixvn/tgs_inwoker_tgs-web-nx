import GameCard from "@/pages/home/components/GameCard";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
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

  return (
    <>
      {data.length === 0 && <NoGame></NoGame>}
      {data.map((gameItem, index) => {
        return (
          <div className="embla__slide" key={index}>
            <GameCard
              key={gameItem.id}
              gameItem={gameItem}
              isActive={gameItem.isactive}
              imageUrl={`${
                config.sourceUrl
              }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                gameItem.code
              }.jpg`}
            />
          </div>
        );
      })}
    </>
  );
};

export default GameCardSlider;
