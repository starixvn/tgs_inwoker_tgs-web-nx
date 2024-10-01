import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const BannerContainerEmbla = styled.section`
  --slide-height: 6rem;
  --column-size: 4;
  --slide-spacing: 0;

  position: relative;
  background: ${({ theme }) => theme.bannerAreaBackground};

  .emble {
    container-type: inline-size;
    overflow-x: clip;
    overflow: hidden;
  }

  .embla__slide {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 100%;
    aspect-ratio: 376/209;
    background: ${({ theme }) => theme.gameCardBackground};
    backdrop-filter: blur(2px);
    border-radius: 1.2rem;
    overflow: hidden;
    margin-right: 1.6rem;

    ${media.sm} {
      flex: 0 0 calc(50% - 8px);
    }

    ${media.md} {
      flex: 0 0 calc(33% - 8px);
    }
  }

  .banner {
    width: 100%;
    height: 100%;
  }

  .embla__controls {
    display: flex;
    justify-content: center;
    margin: 1.6rem 0 0.6rem;
    ${media.sm} {
      margin-bottom: 1.8rem;
    }
  }

  .embla__dots {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    width: 100%;
  }
`;
