import styled from "styled-components";
import FlipMove from "react-flip-move";
import { useRwd } from "@tgs-web-nx/core/hooks";
import WinnerRankRow, { RankItem } from "./components/WinnerRankRow";
import { theme } from "@/theme";
import winnerBanner from "@/assets/t23/images/home/winner-banner.png";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 44%;
  min-height: 407px;
  box-sizing: border-box;
  padding: 0px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    height: 100%;
    padding: 20px 20px 20px 20px;
    min-height: 395px;
    min-width: 580px;
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 32.51%;
  padding: 20px 20px 0px 20px;
  border-radius: 20px 20px 0px 0px;
  background:  rgba(0, 0, 0, 0.83);

  ${media.sm} {
    display: none;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 19px;
`;

const Text = styled.div<{ color: string }>`
  font-size: 2.19rem;
  font-weight: 400;
  color: ${(props) => props.color};
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  top: 32.51%;
  margin-top: 19px;
  
  ${media.sm} {
    position: relative;
    top:0;
    margin-top: 0px;
  }
`;

type Props = {
  leaderboard: RankItem[];
};

const WinnerCard = ({ leaderboard }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <Wrapper>
      <Banner>
        <img src={winnerBanner} alt="latest winner" />
        <Title>
          <Text color={theme.white}>LATEST</Text>
          <Text color={theme.secondary}>WINNER</Text>
        </Title>
      </Banner>

      <Content>
        <FlipMove style={{ width: "100%", display: "flex", gap: isMobileSize ? "19px" : "28px", flexDirection: "column" }}>
          {leaderboard.map((rankItem) => {
            return <WinnerRankRow key={rankItem.key} rankItem={rankItem} />;
          })}
        </FlipMove>
      </Content>
    </Wrapper>
  );
};

export default WinnerCard;
