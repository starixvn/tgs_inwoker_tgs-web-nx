import Slick from "react-slick";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const SlickWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
`;

const SlickImage = styled.img`
  display: block;
  max-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
`;

const SlickDot = styled.div`
  width: 5.7px;
  height: 5.7px;
  border-radius: 50%;
  background: #CBDEED;
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
    <div
      style={{
        marginBottom: "30px",
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

type Props = {
  desktopurl: string;
  id: string;
  mobileurl: string;
  navurl: string;
  alt: string;
  title: string;
};

const Slider = ({
  settings
}: {
  settings: { [key: string]: any };
}) => {
  const { general } = useGeneralStore();
  const { isMobileSize } = useRwd();
  const sliderSettings = { ...baseSettings, ...settings };
  return (
    <SlickWrapper>
      <Slick {...sliderSettings}>
        {general.banner.map((item: Props) => (
          <a href={item.navurl} key={item.id} target="_blank" rel="noreferrer">
            <SlickImage
              src={isMobileSize ? item.mobileurl : item.desktopurl}
              alt={item.alt}
            ></SlickImage>
          </a>
        ))}
      </Slick>
    </SlickWrapper>
  );
};

export default Slider;
