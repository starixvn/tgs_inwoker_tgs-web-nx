import { media } from "@/theme/breakpoints";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { Common } from "@tgs-web-nx/utils";
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
    flex: 0 0 100%;

    ${media.sm} {
      flex: 0 0 calc(50% - 8px);
      margin-right: 1.6rem;
    }

    ${media.md} {
      flex: 0 0 calc(33% - 8px);
      margin-right: 1.6rem;
    }
  }

  .banner {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 376/209;
    border-radius: 1.2rem;

    ${media.sm} {
      border-radius: 1.3rem;
    }
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

const Banner = () => {
  const [emblaBannerRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: true, align: "start" },
    [Autoplay({ playOnInit: true, delay: 6500 })],
  );
  const { general } = useGeneralStore();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { account } = useAccountStore();
  const isLogin = !!account.token;
  const { goToLogin } = useAuth();

  const launchGame = (navurl: any) => {
    if (!isLogin) {
      goToLogin();
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(navurl, "gamewindow");
    }
  };
  return (
    <BannerContainerEmbla className="embla">
      <div className="embla__viewport" ref={emblaBannerRef}>
        <div className="embla__container">
          {general.banner.map((banner, index) => (
            <div
              className="embla__slide"
              key={index}
              onClick={() => {
                launchGame(banner.navurl);
              }}
            >
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
