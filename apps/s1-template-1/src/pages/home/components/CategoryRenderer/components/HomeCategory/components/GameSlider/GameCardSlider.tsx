import GameCard from "@/pages/home/components/GameCard";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { utility } from "@tgs-web-nx/utils";
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

  return (
    <>
      {data.length === 0 && <NoGame></NoGame>}
      {data.map((gameItem, index) => {
        const { id, isactive, gpcode, code } = gameItem;

        return (
          <div className="embla__slide" key={index}>
            <GameCard
              key={id}
              gameItem={gameItem}
              isActive={isactive}
              imageUrl={utility.getGameNameUrl(gpcode, code, isDesktopSize)}
            />
          </div>
        );
      })}
    </>
  );
};

export default GameCardSlider;
