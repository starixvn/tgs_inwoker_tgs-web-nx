import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

import { CardHoverBg } from "../GameCard/style";

export const MatchCardBg = styled.div`
  display: flex;
  flex-shrink: 0;
  position: relative;
  height: 18.6rem;
  width: 33.7rem;
  backdrop-filter: blur(2px);
  background: url("/assets/images/highlight-matches/soccer-match-bg.webp");
  box-shadow: ${({ theme }) => theme.gameCardShadow};
  vertical-align: top;
  flex-direction: column;
  padding: 1.2rem;
  border-radius: 1.2rem;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  overflow: hidden;

  ${media.sm} {
    &:hover {
      ${CardHoverBg} {
        border: 2px solid ${({ theme }) => theme.gameCardBorder};
        opacity: 1;
      }
    }
  }
`;

const TruncateText = styled.div`
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 47%, rgba(0, 0, 0, 0) 94%);
  overflow: hidden;
  white-space: nowrap;
`;

export const LeagueName = styled(TruncateText)`
flex-shrink: 0;
  color: ${({ theme }) => theme.highlightMatchLeagueName};
  text-transform: lowercase;


  &::first-letter,
  &::first-line {
    text-transform: capitalize;
  }
}
`;

export const KickOffTimeContainer = styled.div`
  position: relative;
  margin-top: 0.4rem;
  margin-bottom: 1.4rem;

  color: ${({ theme }) => theme.highlightMatchTime};
`;

export const TeamInfo = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0.2rem;
  border-radius: 50%;
  background: rgba(212, 212, 212, 0.4);
  backdrop-filter: blur(0.2rem);
  overflow: hidden;

  .logo {
    border-radius: 50%;
    width: 100%;
    max-width: 100%;
  }
`;

export const TeamName = styled(TruncateText)`
  color: ${({ theme }) => theme.highlightMatchTextColor};
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.6rem;
  color: ${({ theme }) => theme.highlightMatchTextColor};
`;

export const SelectionContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 3.6rem;
  align-items: stretch;
  gap: 0.8rem;
  width: 100%;
`;

export const SelectionButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  font-size: 1.3rem;
`;

export const SelectionOdds = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.highlightMatchTextColor};
`;

export const SelectionPoint = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.highlightMatchLeagueName};
`;

export const LiveIcon = styled.div`
  position: absolute;
  right: 0;
  top: -0.5rem;
  display: flex;
  min-width: 3rem;
  height: 2.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.highlightMatchLiveIconBackground};
  backdrop-filter: blur(2px);
  overflow: hidden;
`;
