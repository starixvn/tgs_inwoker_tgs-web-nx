import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const DesktopContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.desktopContainerPaddingTop};

  ${media.md} {
    padding-top: ${({ theme }) => theme.desktopContainerPaddingTopMd};
  }
`;

export const GameContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GameTypeTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.gameTypeTitle};

  & > img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const ViewAll = styled.div`
  position: absolute;
  right: 7.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 6.2rem;
  height: 3.2rem;
  line-height: 1;
  padding: 0 0.8rem;
  border-radius: 0.8rem;
  border: ${({ theme }) => theme.viewAllBorder};
  box-shadow: ${({ theme }) => theme.viewAllBoxShadow};
  background: ${({ theme }) => theme.viewAllBackground};
  color: ${({ theme }) => theme.viewAllTextColor};
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: capitalize;
  cursor: pointer;

  ${media.sm} {
    &:hover {
      border: ${({ theme }) => theme.viewAllBorderHover};
      color: ${({ theme }) => theme.viewAllTextColorHover};
      background: ${({ theme }) => theme.viewAllBackgroundHover};
    }
  }
`;

export const GameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gameTypeContainerGapSmall};

  ${media.md} {
    gap: ${({ theme }) => theme.gameTypeContainerGapLarge};
  }
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.blockGapMobile};
  width: 100%;
  background: ${({ theme }) => theme.blockBackground};
  border: ${({ theme }) => theme.blockBorder};
  border-radius: ${({ theme }) => theme.blockBorderRadiusMobile};
  box-shadow: ${({ theme }) => theme.blockBoxShadow};
  padding: ${({ theme }) => theme.blockPaddingMobile};

  ${media.sm} {
    gap: ${({ theme }) => theme.blockGap};
    padding: ${({ theme }) => theme.blockPadding};
    border-radius: ${({ theme }) => theme.blockBorderRadius};
  }
`;

export const Group = styled.div`
  position: relative;

  .embla__viewport {
    margin-left: ${({ theme }) => theme.gameAreaMargin};
    margin-right: ${({ theme }) => theme.gameAreaMargin};
    padding: ${({ theme }) => theme.gameAreaPaddingMobile};

    ${media.sm} {
      padding: ${({ theme }) => theme.gameAreaPadding};
    }
  }

  &.game-area {
    .embla__container {
      --gap: 1.2rem;
      --min-width: 13.1rem;
      --single-column-width: calc(
        (100% - (var(--column-count) - 1) * var(--gap)) / var(--column-count)
      );

      display: grid;
      gap: var(--gap);
      grid-auto-flow: column;
      grid-auto-columns: calc(var(--min-width) + var(--gap));

      @media (min-width: 420px) {
        --column-count: 3;
        grid-auto-columns: var(--column-width, var(--single-column-width));
      }

      @media (min-width: 729px) {
        --gap: 1.6rem;
        --column-count: 4;
      }

      @media (min-width: 995px) {
        --column-count: 5;
      }

      @media (min-width: 1171px) {
        --column-count: 6;
      }

      @media (min-width: 1347px) {
        --column-count: 7;
      }

      @media (min-width: 1523px) {
        --column-count: 8;
      }

      @media (min-width: 1699px) {
        --column-count: 9;
      }
    }
  }

  .embla__container.providers {
    --slide-size: 11.3rem;

    ${media.sm} {
      --slide-size: 13.8rem;
    }
  }

  .embla__container.highlight-matches {
    display: flex;
    --slide-size: 33.7rem;
  }

  .embla__controls {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 0;
    gap: 0;
  }

  .embla__buttons {
    gap: 0.4rem;
  }

  .embla__button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 3.2rem;
    height: 3.2rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    border: ${({ theme }) => theme.slideNextButtonBorder};
    box-shadow: ${({ theme }) => theme.slideNextButtonShadow};
    background: ${({ theme }) => theme.slideNextButtonBackground};
    color: ${({ theme }) => theme.slideNextButtonColor};

    &[disabled] {
      background: ${({ theme }) => theme.disabledSlideNextButtonBackground};
      .icon {
        color: ${({ theme }) => theme.disabledSlideNextButtonColor};
      }
    }

    ${media.sm} {
      &:hover:not([disabled]) {
        border: ${({ theme }) => theme.slideNextButtonBorderHover};
        color: ${({ theme }) => theme.slideNextButtonColorHover};
        background: ${({ theme }) => theme.slideNextButtonBackgroundHover};
      }
    }
  }
`;
