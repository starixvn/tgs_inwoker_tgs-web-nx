import CarouselArrow from "@/assets/t23/images/promotion/icon_arrow.svg";
import CarouselArrowYellow from "@/assets/t23/images/promotion/icon_arrow_yellow.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const NextArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  right: -20px;
  cursor: pointer;
  z-index: 99;
  width: 22px;
  height: 44px;
  background: url(${CarouselArrowYellow}) no-repeat center center;
`;

const PrevArrowContainer = styled(NextArrowContainer)`
  left: -23px;
  right: auto;
  background: url(${CarouselArrow}) no-repeat center center;
`;

function SampleNextArrow({ onClick }: { onClick: () => void }) {
  return <NextArrowContainer onClick={onClick} />;
}

function SamplePrevArrow({ onClick }: { onClick: () => void }) {
  return <PrevArrowContainer onClick={onClick} />;
}

const CustomPageIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
`;

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  autoplay: true,
  adaptiveHeight: true,
  nextArrow: (
    <SampleNextArrow
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
  prevArrow: (
    <SamplePrevArrow
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
  customPaging: function (i: number) {
    return (
      <CustomPageIndicator
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#ffffff",
        }}
      />
    );
  }
};

const Carousel = ({ children }: { children: React.ReactNode }) => {
  return <Slider {...settings} >{children}</Slider>;
};

export default Carousel;
