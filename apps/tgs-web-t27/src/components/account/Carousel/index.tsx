import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const SlickWrapper = styled(Slider)`
  /* height: 300px;
  overflow: scroll; */
`;

const baseSettings = {
  className: "custom-slider-class",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  autoplay: true,
  adaptiveHeight: true,
};

const Carousel = ({
  settings,
  children,
}: {
  settings: { [key: string]: any };
  children: React.ReactNode;
}) => {
  const sliderSettings = { ...baseSettings, ...settings };
  return <SlickWrapper>
    <Slider {...sliderSettings}>{children}</Slider>
  </SlickWrapper>;
};

export default Carousel;
