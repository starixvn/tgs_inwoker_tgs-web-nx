import useEmblaCarousel from "embla-carousel-react";

import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowButtons";

interface IEmblaCarousel {
  children: any;
  extraClassName?: string;
}

const EmblaCarousel: React.FC<IEmblaCarousel> = (props: IEmblaCarousel) => {
  const { extraClassName, children } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className={`embla__container ${extraClassName}`}>{children}</div>
        </div>
      </section>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
