import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

// -------- hover effect for desktop--------------
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
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.gameCardBackgroundHover};
  backdrop-filter: blur(0.2rem);
  transition: opacity 0.15s linear;
  opacity: 0;
`;

export const GameCardContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  overflow: hidden;
`;

export const GameCardBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  aspect-ratio: ${({ theme }) => theme.gameCardAspectRatio};
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.gameCardBackground};
  backdrop-filter: blur(2px);
  opacity: 0;
  animation: appear-game 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes appear-game {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .game-icon {
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: appear-game 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  ${media.sm} {
    flex-shrink: 0;

    &:hover {
      border: 2px solid ${({ theme }) => theme.gameCardBorder};

      .game-icon {
        transform: scale(1.1);
      }

      ${CardHoverBg} {
        opacity: 1;
      }
    }
  }
`;

export const GameStatusBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1.2rem;

  backdrop-filter: blur(2px);
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: ${({ theme }) => theme.gameStatusBackground};

  &.maintenance .status-text {
    color: ${({ theme }) => theme.maintenanceLabelColor};
    background-color: ${({ theme }) => theme.maintenanceLabelBackground};
  }

  &.testing .status-text {
    color: ${({ theme }) => theme.testingLabelColor};
    background-color: ${({ theme }) => theme.testingLabelBackground};
  }

  .status-text {
    display: flex;
    align-items: center;
    max-width: 99%;
    justify-content: center;
    height: 3.4rem;
    padding: 0 1.4rem;
    border-radius: 3rem;
    text-transform: uppercase;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
  }

  &:hover {
    cursor: not-allowed;
  }
`;

export const GameName = styled.div`
  position: absolute;
  top: 2rem;
  color: ${({ theme }) => theme.gameCardGameNameColor};
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-transform: capitalize;
  padding: 0 0.8rem;
`;

export const ProviderName = styled.div`
  position: absolute;
  bottom: 0.8rem;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gameCardGameNameColor};
`;

export const NoGameIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const NoImage = styled.img`
  width: 6.8rem;
  height: 6.8rem;
  transform: scale(0.6);

  ${media.xs} {
    transform: scale(0.7);
  }

  ${media.sm} {
    transform: scale(0.8);
  }

  ${media.md} {
    transform: scale(0.9);
  }

  ${media.lg} {
    transform: 1;
  }
`;

export const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  width: 5rem;
  height: 5rem;
  border: 0.3rem solid #93acd3;
  border-top: 0.3rem solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear 0s infinite;

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
