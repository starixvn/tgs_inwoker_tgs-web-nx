import styled from "styled-components";

export const MatchCardBg = styled.div`
  display: flex;
  flex-shrink: 0;
  position: relative;
  background: url("/assets/images/highlight-matches/soccer-match-bg.webp");
  height: 18.6rem;
  width: 33.7rem;
  backdrop-filter: blur(2px);
  vertical-align: top;
  flex-direction: column;
  padding: 1.2rem;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
`;

export const LeagueName = styled.div`
  color: ${({ theme }) => theme.highlightMatchLeagueName};
`;

export const KickOffTimeContainer = styled.div`
  position: relative;
  margin-top: 0.4rem;
  margin-bottom: 1.4rem;

  color: ${({ theme }) => theme.highlightMatchTime};
`;

export const TeamInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;

  .logo {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
  }
`;

export const BetTypeName = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 1%;
  opacity: 0.5;
  font-size: 12px;
  text-align: left;
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
`;

export const SelectionOdds = styled.div`
  font-size: 1.3rem;
  text-align: right;
`;

export const SelectionPoint = styled.div`
  font-size: 1.3rem;
  text-align: left;
  color: #cbcbcb;
`;

export const Score = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  min-width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.6rem;
  font-weight: 700;
`;

export const LiveIcon = styled.div`
  position: absolute;
  right: 0;
  top: -0.5rem;
  display: flex;
  min-width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%),
    rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
`;
