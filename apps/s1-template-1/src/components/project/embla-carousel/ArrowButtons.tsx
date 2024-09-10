import { EmblaCarouselType } from "embla-carousel";
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";



type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className="embla__button embla__button--prev" type="button" {...restProps}>
      <svg
        className="icon"
        width="10"
        height="15"
        viewBox="0 0 10 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M1.18581 6.58415L6.67652 1.09343C7.26724 0.502711 8.22125 0.502711 8.81197 1.09343C9.40268 1.68415 9.40268 2.63815 8.81197 3.22887L4.38749 7.65039L8.81197 12.0719C9.40268 12.6626 9.40268 13.6166 8.81197 14.2074C8.22125 14.7981 7.26724 14.7981 6.67652 14.2074L1.18581 8.71664C0.598042 8.12887 0.598042 7.17191 1.18581 6.58415Z"
        />
      </svg>

      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className="embla__button embla__button--next" type="button" {...restProps}>
      <svg
        className="icon"
        width="12"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M9.81432 7.93376L4.3236 2.44304C3.73288 1.85232 2.77887 1.85232 2.18816 2.44304C1.59744 3.03376 1.59744 3.98776 2.18816 4.57848L6.61263 9L2.18816 13.4215C1.59744 14.0122 1.59744 14.9662 2.18816 15.557C2.77887 16.1477 3.73288 16.1477 4.3236 15.557L9.81432 10.0662C10.4021 9.47848 10.4021 8.52152 9.81432 7.93376Z"
        />
      </svg>
      {children}
    </button>
  );
};
