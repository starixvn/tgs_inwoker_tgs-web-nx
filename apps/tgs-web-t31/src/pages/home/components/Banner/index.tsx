import styled from "styled-components";
import Slider from "@/pages/home/components/Slider";

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlickDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
`;

const SlickDotWrapper = styled.div`
  margin-bottom: 80px;

  & ul li.slick-active ${SlickDot} {
    background: #f1c137 !important;
  }
`;

const Banner = () => {
  const settings = {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appendDots: (dots: any) => (
      <SlickDotWrapper>
        <ul>{dots}</ul>
      </SlickDotWrapper>
    ),
    customPaging: (i: number) => {
      return <SlickDot key={i} />;
    },
  };

  return (
    <BannerContainer>
      <Slider settings={settings} maxHeight={"450px"} />
    </BannerContainer>
  );
};

export default Banner;
