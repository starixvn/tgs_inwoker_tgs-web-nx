import styled from "styled-components";
import { useUiStore } from "@tgs-web-nx/core";
import Slider from "@/pages/home/components/Slider";
import notification from "@/assets/t29/images/home/notify.svg";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Jackpot from "@/components/project/Jackpot";

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
