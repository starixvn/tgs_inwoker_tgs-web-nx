import { Button as MuiButton, styled as muiStyled } from "@mui/material";
import { getFormatAmount } from "@tgs-web-nx/utils";
import styled from "styled-components";

const RecentBigWinsSection = styled.div`
  position: relative;
  width: 100%;
  min-width: 37.5rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: linear-gradient(180deg, #1c2532 0%, #1c2532 100%);
  border-radius: 1rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 8rem;
    background: linear-gradient(180deg, rgba(22, 75, 153, 0) 4.38%, #065cdc 169.37%);
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
  color: #fff;
`;

const BigWinsAmount = styled.div`
  color: #e2fe26;
  text-align: right;
`;

const PlayNowButton = muiStyled(MuiButton)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  background: theme.palette.playNowButtonBackground,
  height: "2.8rem",
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

const RecentBigWins: React.FC<{ recentBigWins: BigWinType[] }> = ({ recentBigWins }) => {
  return (
    <RecentBigWinsSection>
      {recentBigWins &&
        recentBigWins.map((item, index) => {
          return (
            <Row>
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
  );
};

export default RecentBigWins;
