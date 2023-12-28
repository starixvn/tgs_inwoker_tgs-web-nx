import styled from "styled-components";
import { useUiStore } from "@tgs-web-nx/core";
import Slider from "@/pages/home/components/Slider";
import notification from "@/assets/t28/images/home/notify.svg";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Jackpot from "@/components/project/Jackpot";

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlickWrapper = styled(Slider)`
  max-height: 450px;
  margin: 0 auto;
  width: 100%;
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

const NewsContainer = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const NewsContent = styled.div`
  position: relative;
  overflow: visible;
  height: 100%;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  font-size: 0.875rem;
  padding: 4px 10px;
  color: ${({ theme }) => theme.white};
`;

const MarqueesBackground = styled.div`
  display: inline;
  overflow: visible;
`;

const Banner = () => {
  const {
    ui: { marquees },
  } = useUiStore();

  const hasData = marquees && marquees.length > 0;

  const settings = {
    dots: true,
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    slidesToScroll: 3,
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
