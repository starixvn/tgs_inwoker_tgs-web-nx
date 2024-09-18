import { EmblaCarouselType } from "embla-carousel";
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Dot = styled.button`
  --dot-width: 1.4rem;
  --dot-height: 0.7rem;
  --dot-width--active: 4.4rem;
  --fill-dot-duration: 7000ms;

  width: 100%;
  max-width: var(--dot-width);
  height: var(--dot-height);
  border-radius: 2rem;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  transition:
    max-width 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &.embla__dot--selected {
    max-width: var(--dot-width--active);
    will-change: max-width;
    transition:
      max-width 0.2s ease-in-out,
      background-color 0.2s ease-in-out;

    .fill {
      animation-duration: var(--fill-dot-duration);
      animation-fill-mode: forwards;
      animation-name: fill-dot;
      animation-play-state: running;
      animation-timing-function: ease;
      background-color: ${({ theme }) => theme.primary};
      border-radius: 2rem;
      height: 100%;
      margin-left: -0.6rem;
      transform-origin: center left;
      width: var(--dot-width--active);
      will-change: transform;
    }
  }

  @keyframes fill-dot {
    0% {
      transform: scaleX(0.1);
    }

    to {
      transform: scaleX(1.2);
    }
  }
`;

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Dot type="button" {...restProps}>
      <div className="fill"></div>
      {children}
    </Dot>
  );
};
