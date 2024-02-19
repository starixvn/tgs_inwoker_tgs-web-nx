import styled from "styled-components";
import CarouselArrowLeft from "@/assets/t18/images/promotion/icon_arrow_left.svg";
import CarouselArrowRight from "@/assets/t18/images/promotion/icon_arrow_right.svg";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Carousel from "@/components/account/Carousel";

const NextArrowContainer = styled.div`
  position: absolute;
  top: 40%;
  right: 0;
  cursor: pointer;
  z-index: 99;
  width: 22px;
  height: 44px;
  background: url(${CarouselArrowRight}) no-repeat center center;
`;

const PrevArrowContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 0;
  cursor: pointer;
  z-index: 99;
  width: 22px;
  height: 44px;
  background: url(${CarouselArrowLeft}) no-repeat center center;
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
  },
};

const CarouselContainer = ({ children }: { children: React.ReactNode }) => {
  return <Carousel settings={settings}>{children}</Carousel>;
};

export default CarouselContainer;
