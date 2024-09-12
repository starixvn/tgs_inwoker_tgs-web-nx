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
  --slide-spacing: 0;



  position: relative;
  .emble {
    container-type: inline-size;
    overflow-x: clip;
    overflow: hidden;
  }
  .embla__slide {
    position: relative;
    border-radius: 1.2rem;
    flex: 0 0 100%;
    

    ${media.lg} {
      border-radius: 1.3rem;
      flex: 0 0 calc(33% - 8px);
      margin-right: 1.6rem;
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
    max-width: 100%;
    aspect-ratio: 376/246;

    ${media.sm} {
      aspect-ratio: 388/254;
    }
  }

  .embla__controls {
    display: flex;
    justify-content: center;
    margin: 1.6rem 0 2.4rem;
  }

  .embla__dots {
    display: flex;
    gap: 0.8rem;
    transition: all 0.3s ease-out;
  }
`;

const Banner = () => {
  const { isMobileSize } = useRwd();
  const [emblaBannerRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: true, align: "start" }, [
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
                src={banner.mobileurl}
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
