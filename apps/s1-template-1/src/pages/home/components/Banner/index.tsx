import { media } from "@/theme/breakpoints";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";

import { DotButton, useDotButton } from "./dots";

const BannerContainerEmbla = styled.section`
  --slide-height: 6rem;
  --column-size: 4;
  --slide-size: 100%;

  position: relative;

  .embla__slide {
    position: relative;
    border-radius: 1.2rem;

    ${media.lg} {
      border-radius: 1.3rem;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 25%;
      border-radius: 0 0 1.2rem 1.2rem;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 2, 5, 0.7) 100%);
    }
  }

  .banner {
    width: 100%;
    aspect-ratio: 376/208;

    ${media.sm} {
      aspect-ratio: 1200/375;
    }
  }

  .embla__controls {
    position: absolute;
    bottom: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .embla__dots {
    display: flex;
    gap: 0.8rem;
    transition: all 0.3s ease-out;
  }
`;

const Banner = () => {
  const { isMobileSize } = useRwd();
  const [emblaBannerRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const { general } = useGeneralStore();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <BannerContainerEmbla className="embla">
      <div className="embla__viewport" ref={emblaBannerRef}>
        <div className="embla__container">
          {general.banner.map((banner, index) => (
            <div className="embla__slide" key={index}>
              <img
                className="banner"
                src={isMobileSize ? banner.mobileurl : banner.desktopurl}
                alt={banner.alt}
                title={banner.title}
              />
            </div>
          ))}
        </div>
        <div className="embla__controls">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : "",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </BannerContainerEmbla>
  );
};

export default Banner;
