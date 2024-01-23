import styled from "styled-components";
import Slider from "@/pages/home/components/Slider";

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlickWrapper = styled(Slider)`
  max-height: 400px;
  margin: 0 auto;
  width: 100%;
`;

const SlickDot = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({theme}) => theme.lightBlack};
`;

const SlickDotWrapper = styled.div`
  bottom: 20px;

  & li {
    width: 10px;
    height: 10px;
  } 

  & ul li.slick-active ${SlickDot} {
    background: ${({theme}) => theme.white} !important;
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
      <SlickWrapper settings={settings} maxHeight={"400px"} />
    </BannerContainer>
  );
};

export default Banner;
