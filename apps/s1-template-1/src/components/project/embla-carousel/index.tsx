import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowButtons";

interface IEmblaCarousel {
  options: EmblaOptionsType;
  children: any;
  hasControlButton?: boolean;
  extraClassName?: string;
  plugins?: EmblaPluginType[];
}

const EmblaCarousel: React.FC<IEmblaCarousel> = (props: IEmblaCarousel) => {
  const { extraClassName, children, hasControlButton, options, plugins } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className={`embla__container ${extraClassName}`}>{children}</div>
        </div>
      </div>
      {hasControlButton && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      )}
    </>
  );
};

export default EmblaCarousel;
