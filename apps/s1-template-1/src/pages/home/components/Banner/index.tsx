import AppearSensor from "@/components/project/AppearSensor";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common } from "@tgs-web-nx/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Img } from "react-image";

import { LoadingIcon, NoGameIcon } from "../GameCard/icons";
import { DotButton, useDotButton } from "./dots";
import { BannerContainerEmbla } from "./style";

const Banner = () => {
  const { isDesktopSize } = useRwd();

  const [emblaBannerRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: true, align: "start" },
    [Autoplay({ playOnInit: true, delay: 6000 })],
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
          {general.banner.map((banner, index) => {
            const { navurl, desktopurl, mobileurl, title, alt } = banner;

            return (
              <AppearSensor key={index}>
                {
                  // @ts-ignore
                  ({ hasBeenVisible }) => (
                    <div
                      className="embla__slide"
                      onClick={() => {
                        navurl && launchGame(navurl);
                      }}
                    >
                      {hasBeenVisible && (
                        <Img
                          className="banner"
                          src={isDesktopSize ? desktopurl : mobileurl}
                          loader={<LoadingIcon />}
                          unloader={<NoGameIcon gameName={title} />}
                          alt={alt}
                        />
                      )}
                    </div>
                  )
                }
              </AppearSensor>
            );
          })}
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
