import styled from "styled-components";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import CurrentLevelBanner from "@/components/project/BettingBonus/CurrentLevelBanner";
import LevelTable from "@/components/project/BettingBonus/LevelTable";
import Loading from "@/components/UI/Loading";
import { media } from "@/theme/breakpoints";

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
  }
`;

const TitleText = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: start;
`;

const BettingBonusPage = () => {
  const { isLoading, currentLevel, productRebateByLevel } = useBettingBonus();

  if (isLoading) return <Loading show={true} />;
  return (
    <Container>
      <CurrentLevelBanner level={currentLevel} productRebateByLevel={productRebateByLevel} />
      <TitleText>Ratio of Bet Bonus</TitleText>
      <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
    </Container>
  );
};

export default BettingBonusPage;
