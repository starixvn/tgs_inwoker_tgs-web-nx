import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const DesktopContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 0.2rem 0 1.8rem;

  ${media.md} {
    padding: 3rem 0px 2.4rem;
  }
`;

export const GameContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  gap: 0.8rem;

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
  margin-bottom: 1.8rem;
  gap: 0.8rem;
  text-transform: capitalize;

  & > img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const ViewAll = styled.div`
  position: absolute;
  right: 7.6rem;
  display: flex;
  align-items: center;
  height: 3.2rem;
  line-height: 1;
  padding: 0 3.2rem 0 0.8rem;
  border-radius: 0.8rem;
  background: #2e353e;
  color: ${({ theme }) => theme.white};
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: capitalize;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.slideNextButtonBackground};
  }

  &:after {
    content: "";
    position: absolute;
    right: 1rem;
    width: 0.9rem;
    height: 1.4rem;
    background: url("/assets/images/common/icon-view-all.svg") center;
  }
`;

export const GameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;

  ${media.md} {
    gap: 5rem;
  }
`;

export const ProviderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.providerItemBackground};
  min-width: 11.3rem;
  height: 6rem;
  padding: 0 0.8rem;
  border-radius: 1rem;

  > img {
    max-width: 100%;
  }
`;

export const Group = styled.div`
  position: relative;

  &.game-area {
    .embla {
      position: relative;
      container-type: inline-size;
      margin-inline: -4rem;
      overflow-x: clip;
      padding-inline: 4rem;
      width: calc(100% + 8rem);

      &:after {
        --shadow-width: 4rem;
        display: none;
        content: "";
        height: 120%;
        pointer-events: none;
        position: absolute;
        top: -10%;
        left: -1px;
        width: calc(100% + 2px);
        background: linear-gradient(to right, #0d131c 0, rgba(13, 19, 28, 0) var(--shadow-width)),
          linear-gradient(to left, #0d131c 0, rgba(13, 19, 28, 0) var(--shadow-width));
      }

      .embla__viewport {
        overflow: initial;
        width: calc(100%);
        &:before {
          content: "";
        }
      }
    }

    @supports ((-moz-text-align-last: right) or (text-align-last: right)) {
      .embla:after {
        display: block;
      }
    }

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

      @media (min-width: 555px) {
        --column-count: 3 !important;
        grid-auto-columns: var(--column-width, var(--single-column-width));
      }

      @media (min-width: 729px) {
        --gap: 1.6rem;
        --column-count: 4 !important;
      }

      @media (min-width: 995px) {
        --column-count: 5 !important;
      }

      @media (min-width: 1171px) {
        --column-count: 6 !important;
      }

      @media (min-width: 1347px) {
        --column-count: 7 !important;
      }

      @media (min-width: 1523px) {
        --column-count: 8 !important;
      }

      @media (min-width: 1699px) {
        --column-count: 9 !important;
      }
    }
  }

  .embla__container.providers {
    --slide-size: 11.3rem;
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
    background-color: ${({ theme }) => theme.slideNextButtonBackground};
    color: ${({ theme }) => theme.slideNextButtonColor};

    &[disabled] {
      background-color: ${({ theme }) => theme.disabledSlideNextButtonBackground};
      .icon {
        color: ${({ theme }) => theme.disabledSlideNextButtonColor};
      }
    }

    &:hover:not([disabled]) {
      background-color: ${({ theme }) => theme.slideNextButtonBackgroundHover};
    }
  }
`;
