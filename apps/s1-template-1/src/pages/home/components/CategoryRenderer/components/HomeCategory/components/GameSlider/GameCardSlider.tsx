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
        const customeGameIconName = gameItem.code.replace("---mobile", "");

        return (
          <div className="embla__slide" key={index}>
            <GameCard
              key={gameItem.id}
              gameItem={gameItem}
              isActive={gameItem.isactive}
              imageUrl={`${utility.imagePathGenerator(
                `${gameItem.gpcode.toLowerCase()}/en-US/${customeGameIconName}${
                  isDesktopSize ? "@2x" : "@1x"
                }.webp`,
              )}`}
            />
          </div>
        );
      })}
    </>
  );
};

export default GameCardSlider;
