import { NoGameIconWrapper, SpinnerBox } from "@/pages/home/components/GameCard/style";
import { PlayButton } from "@/pages/home/components/PlayIcon";
import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

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
  display: flex;
  justify-content: center;
  position: relative;
  width: 7.4rem;
  height: 9.9rem;
  background: ${({ theme }) => theme.gameCardBackground};
  backdrop-filter: blur(2px);
  border-radius: 0.8rem;
  overflow: hidden;

  .icon {
    width: 100%;
    flex-shrink: 0;
  }

  ${NoGameIconWrapper} {
    transform: scale(0.5);
  }

  ${SpinnerBox} {
    transform: scale(0.5);
  }
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }

  ${media.sm} {
    &:hover {
      ${GameIcon} {
        border: 1px solid ${({ theme }) => theme.gameCardBorder};
      }
      ${CardHoverBg} {
        opacity: 1;
      }
    }
  }
`;

export const RecentBigWinsSlide = styled.div`
  --slide-size: 7.4rem;
`;

export const GameName = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.white};
`;

export const BigWinsAmount = styled.div`
  color: ${({ theme }) => theme.bigWinsAmountColor};
  text-align: right;
`;

export const CustomPlayButton = styled(PlayButton)`
  transform: scale(0.5) !important;
`;
