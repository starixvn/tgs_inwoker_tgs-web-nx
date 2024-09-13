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

  .embla__container {
    --slide-spacing: 1.2rem;
    ${media.md} {
      --slide-height: 21rem;
      --slide-spacing: 1.6rem;
      --slide-size: 15.6rem;
    }

    &.providers {
      --slide-size: 11.3rem;
    }
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
