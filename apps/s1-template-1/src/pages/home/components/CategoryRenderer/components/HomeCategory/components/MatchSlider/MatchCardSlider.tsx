// import MatchCard from "@/pages/home/components/MatchCard";
import MatchCard from "@/pages/home/components/MatchCard";
import { HightLightMatchDto } from "@tgs-web-nx/types";
import styled from "styled-components";

const NoGame = styled.div`
  border: 1px solid grey;
  width: 14rem;
  height: 18.9rem;
  border-radius: 1rem;
`;

interface IMatchSlider {
  matches: HightLightMatchDto[];
  extraClassName?: string;
}

const MatchCardSlider: React.FC<IMatchSlider> = (props: IMatchSlider) => {
  const { matches } = props;
  return (
    <>
      {matches && matches.length === 0 && <NoGame></NoGame>}
      {matches?.map((match, index) => {
        return (
          <div key={index}>
            <MatchCard
                    key={match.eventId}
                    match={match}/>
          </div>
        );
      })}
    </>
  );
};

export default MatchCardSlider;
