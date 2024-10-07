import { GameName, NoImage, SpinnerBox } from "@/pages/home/components/GameCard/style";
import { PlayButton } from "@/pages/home/components/PlayIcon";
import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const RecentBigWinsContainer = styled.div`
  --gap: 0.8rem;
  --item-width: 7.4rem;
  --item-height: 9.9rem;

  display: grid;
  gap: var(--gap);
  grid-auto-flow: column;
  grid-auto-columns: calc(var(--item-width) + var(--gap));
  padding: ${({ theme }) => theme.gameAreaPaddingMobile};

  ${media.sm} {
    padding: ${({ theme }) => theme.gameAreaPadding};
  }
`;

export const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.gameCardBackgroundHover};
  backdrop-filter: blur(0.2rem);
  transition: opacity 0.15s linear;
  opacity: 0;
`;

export const GameIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: var(--item-width);
  height: 9.9rem;
  background: ${({ theme }) => theme.gameCardBackground};
  backdrop-filter: blur(2px);
  border-radius: 0.8rem;
  overflow: hidden;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.8rem;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
`;

export const RecentBigWinsSlide = styled.div`
  &:last-child {
    margin-right: 0.8rem;
  }

  ${SpinnerBox},${PlayButton}, ${NoImage} {
    transform: scale(0.5);
  }

  ${GameName} {
    top: 0.6rem;
    font-size: 0.9rem;
    line-height: 1;
  }
`;

export const PlayerName = styled.div`
  color: ${({ theme }) => theme.recentBigWinsPlayerNameColor};
`;

export const BigWinsAmount = styled.div`
  color: ${({ theme }) => theme.bigWinsAmountColor};
`;

export const CustomPlayButton = styled(PlayButton)`
  transform: scale(0.5) !important;
`;

export const BottomArea = styled.div`
  ${media.sm} {
    &:hover {
      cursor: pointer;
      font-weight: bold;

      ${PlayerName} {
        color: ${({ theme }) => theme.recentBigWinsPlayerNameColorHover};
        text-shadow: ${({ theme }) => theme.recentBigWinsPlayerNameShadow};
      }

      ${BigWinsAmount} {
        color: ${({ theme }) => theme.bigWinsAmountColorHover};
        text-shadow: ${({ theme }) => theme.bigWinsAmountShadow};
      }
    }
  }
`;

export const Title = styled.div`
  color: #fff;
  text-align: left;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ProfitText = styled.div`
  margin-top: 2rem;
  color: #fff;
  text-align: center;
  font-weight: 700;
`;

export const ProfitValue = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
`;

export const BetArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 6.8rem;
  justify-content: center;
  align-items: center;
  column-gap: 1.6rem;
  color: #fff;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.betSlipBetAreaBackground};
`;

export const BetInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

export const BetInfoText = styled.div`
  font-weight: 400;
`;

export const BetInfoValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 0.3rem;
  border-top: 0.2rem dashed ${({ theme }) => theme.betSlipDividerColor};
  margin-top: 2.4rem;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    border-radius: 1.2rem;
    width: 3.3rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.betSlipDividerPattern};
  }

  &:before {
    left: -3.6rem;
  }

  &:after {
    right: -3.6rem;
  }
`;

export const PlayerArea = styled.div`
  display: grid;
  grid-template-columns: 5.2rem 1fr;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2rem;
  margin-bottom: 1.6rem;
`;

export const Avatar = styled.div`
  border-radius: 50%;
  height: 5.2rem;
  width: 5.2rem;
  border: 0.2rem solid rgba(255, 255, 255, 0.2);

  img {
    width: 100%;
    max-width: 100%;
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.8rem;
`;

export const Game = styled.div`
  display: flex;
  padding: 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.betSlipGameAreaBackground};

  ${media.sm} {
    &:hover {
      background: ${({ theme }) => theme.betSlipGameAreaBackgroundHover};
      cursor: pointer;
    }
  }

  ${GameIcon} {
    width: 6rem;
    height: 8rem;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.8rem;
  flex: 1 0 0;
  font-weight: 700;
`;

export const PlayNow = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.linkColor};
  text-align: right;
  gap: 1rem;

  .icon {
    position: relative;
    top: 0.1rem;
  }
`;

export const BetID = styled.p`
  position: relative;
  width: 100%;
  font-weight: bold;

  .icon-copy {
    position: absolute;
    top: -0.6rem;
    right: 0;
  }
`;
