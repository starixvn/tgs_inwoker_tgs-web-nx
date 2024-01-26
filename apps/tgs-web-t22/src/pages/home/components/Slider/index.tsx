import Slick from "react-slick";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";


const SlickDot = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 1px solid ${({theme}) => theme.white};
`;

const SlickWrapper = styled(Slick) <{ $maxHeight?: string }>`
  margin: 0 auto;
  max-height: ${(props) => props.$maxHeight};
  width: 100%;

  & ul li {
    width: 6px;
    height: 6px;
  }

  & ul li.slick-active ${SlickDot} {
    background: ${({theme}) => theme.white} !important;
  }

  & .slick-slide {
    line-height: 0;
  }
`;

const SlickImage = styled.img`
  width: 100%;
  aspect-ratio: 430 / 195;
  object-fit: fill;
`;

const baseSettings = {
  dots: true,
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  arrows: false,
  autoplay: false,

  appendDots: (dots: any) => (
    <div
      style={{
        bottom: 0,
      }}
    >
      <ul>{dots}</ul>
    </div>
  ),
  customPaging: (i: number) => {
    return (
      <SlickDot key={i} />
    );
  },
};

type bannerProps = {
  desktopurl: string;
  id: string;
  mobileurl: string;
  navurl: string;
  alt: string;
  title: string;
};

type Props = {
  settings?: { [key: string]: any };
  maxHeight?: string;
};

const Slider = ({
  settings,
  maxHeight = '200px'
}: Props) => {
  const { general } = useGeneralStore();
  const { isMobileSize } = useRwd();
  const sliderSettings = { ...baseSettings, ...settings };

  return (
    <SlickWrapper {...sliderSettings} $maxHeight={maxHeight}>
      {general.banner.map((item: bannerProps) => (
        <a href={item.navurl} key={item.id} target="_blank" rel="noreferrer">
          <SlickImage
            src={isMobileSize ? item.mobileurl : item.desktopurl}
            alt={item.alt}
          />
        </a>
      ))}
    </SlickWrapper>
  );
};

export default Slider;
