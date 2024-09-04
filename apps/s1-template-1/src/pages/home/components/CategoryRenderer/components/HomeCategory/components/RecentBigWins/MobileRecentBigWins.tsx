import { Button as MuiButton, styled as muiStyled } from "@mui/material";
import { getFormatAmount } from "@tgs-web-nx/utils";
import styled from "styled-components";

import { GameContainer, GameTypeTitle } from "../..";

const RecentBigWinsSection = styled.div`
  position: relative;
  width: 100%;
  min-width: 37.5rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: ${({ theme }) => theme.recentBigWinsBackground};
  border-radius: 1rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 8rem;
    background: ${({ theme }) => theme.recentBigWinsBottomBackground};
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 3.8rem 1fr 1fr 9rem;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const GameName = styled.div`
  color: ${({ theme }) => theme.white};
`;

const BigWinsAmount = styled.div`
  color: ${({ theme }) => theme.bigWinsAmountColor};
  text-align: right;
`;

const PlayNowButton = muiStyled(MuiButton)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  background: theme.palette.playNowButtonBackground,
  height: "3.6rem",
  padding: "0.6rem",
  color: theme.palette.white,
  fontFamily: "inherit",
  fontSize: "1.3rem",
}));

type BigWinType = {
  name: string;
  amount: number;
  code: string;
};

const MobileRecentBigWins: React.FC<{ recentBigWins: BigWinType[] }> = ({ recentBigWins }) => {
  return (
    <>
      <GameTypeTitle>
        <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
        Recent Big Wins
      </GameTypeTitle>
      <GameContainer>
        <RecentBigWinsSection>
          {recentBigWins &&
            recentBigWins.map((item, index) => {
              return (
                <Row key={index}>
                  <img src={`/assets/images/big-wins/${item.code}.png`} alt={item.name} />
                  <GameName>{item.name}</GameName>
                  <BigWinsAmount>{`đ${getFormatAmount(item.amount)}`}</BigWinsAmount>
                  <PlayNowButton>
                    Play now
                    <img src={`/assets/images/big-wins/icon-arrow-right.svg`} alt="arrow right" />
                  </PlayNowButton>
                </Row>
              );
            })}
        </RecentBigWinsSection>
      </GameContainer>
    </>
  );
};

export default MobileRecentBigWins;
