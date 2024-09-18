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
  width: 100%;
  height: 100%;
  border-radius: 12px;
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

  .game-icon {
    width: 100%;
    aspect-ratio: ${({ theme }) => theme.gameCardAspectRatio};
  }

  ${media.sm} {
    flex-shrink: 0;

    &:hover {
      border: 2px solid #fff;

      .game-icon {
        transform: scale(1.1);
      }

      ${CardHoverBg} {
        opacity: 1;
      }
    }
  }
`;

export const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.maintenanceBackground};
  backdrop-filter: blur(2px);
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  .maintenance-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94%;
    height: 3.4rem;
    background-color: ${({ theme }) => theme.maintenanceLabelBackground};
    border-radius: 3rem;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.maintenanceLabelColor};
  }

  &:hover {
    cursor: not-allowed;
  }
`;

export const HoverGameName = styled(GameCardContent)`
  position: absolute;
  top: 2rem;
  color: ${({ theme }) => theme.gameCardGameNameColor};
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-transform: capitalize;
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
