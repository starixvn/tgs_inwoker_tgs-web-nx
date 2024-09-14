import { media } from "@/theme/breakpoints";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useAccountStore } from "@tgs-web-nx/core";
import { DotButton, useDotButton } from "./dots";
import { Common } from "@tgs-web-nx/utils";

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
    gap: 0.8rem;
    transition: all 0.3s ease-out;
  }

  .embla__dot {
    width: 1.4rem;
    height: 0.7rem;
    border-radius: 2rem;
  }
  .embla__dot--selected {
    width: 4.4rem;
    background: ${({ theme }) => theme.primary};
  }
`;

const Banner = () => {
  const [emblaBannerRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: true, align: "start" },
    [Autoplay({ playOnInit: true, delay: 3000 })],
  );
  const { general } = useGeneralStore();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { account } = useAccountStore();
  const isLogin = !!account.token;
  const history = useHistory();

  const launchGame = (navurl: any) => {
    if (!isLogin) {
      history.push("/login");
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
            <div className="embla__slide" key={index} onClick={() => {launchGame(banner.navurl)}}>
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
