import useEmblaCarousel from "embla-carousel-react";

interface IEmblaCarousel {
  children: any;
  extraClassName?: string;
}

const EmblaCarousel: React.FC<IEmblaCarousel> = (props: IEmblaCarousel) => {
  const { extraClassName, children } = props;
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className={`embla__container ${extraClassName}`}>{children}</div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
