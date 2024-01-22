import Slick from "react-slick";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const SlickWrapper = styled(Slick)<{ $maxHeight?: string }>`
  max-height: ${(props) => props.$maxHeight};
  margin: 0 auto;
`;

const SlickImage = styled.img`
  display: block;
  max-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
`;

const SlickDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4d8ab9;
`;

const DotsContainer = styled.div`
  padding-bottom: 11px;
  li {
    width: 8px;
    height: 8px;
  }
  & .slick-active {
    & div {
      background: white;
    }
  }
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
  autoplay: true,

  appendDots: (dots: any) => (
    <DotsContainer
      style={{
        marginBottom: "30px",
      }}
    >
      <ul>{dots}</ul>
    </DotsContainer>
  ),
  customPaging: (i: number) => {
    return <SlickDot key={i} />;
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

const Slider = ({ settings, maxHeight }: Props) => {
  const { general } = useGeneralStore();
  const { isDesktopSize } = useRwd();
  const sliderSettings = { ...baseSettings, ...settings };
  return (
    <SlickWrapper {...sliderSettings} $maxHeight={maxHeight}>
      {general.banner.map((item: bannerProps) => (
        <a href={item.navurl} key={item.id} target="_blank" rel="noreferrer">
          <SlickImage src={!isDesktopSize ? item.mobileurl : item.desktopurl} alt={item.alt} />
        </a>
      ))}
    </SlickWrapper>
  );
};

export default Slider;
