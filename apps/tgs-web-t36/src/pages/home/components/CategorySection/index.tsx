import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useRwd } from "@tgs-web-nx/core/hooks";
import CategoryCard from "./CategoryCard";
import useHomeCategoryList from "@/hooks/home/useHomeCategoryList";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;

  ${media.sm} {
    width: 100%;
    display: block;
    padding: 0 40px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    box-sizing: border-box;
    gap: 8px;
    &::-webkit-scrollbar {
      visibility: hidden;
    }
    cursor: grab;
  }
`;

const CategorySection = () => {
  const homeCategoryList = useHomeCategoryList();
  const { isMobileSize, isDesktopSize } = useRwd();

  const settings = {
    className: "custom-slider-class",
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  return (
    <Wrapper>
      {isMobileSize &&
        homeCategoryList.map((item) => (
          <CategoryCard
            key={item.key}
            bgUrl={item.bgUrl}
            desktopBgUrl={item.desktopBgUrl}
            introduction={item.introduction}
            // imageUrl={item.imageUrl}
            // iconUrl={item.iconUrl}
            text={item.text}
            gameType={item.gameType}
            type={item.key}
          />
        ))}
      {isDesktopSize && (
        <Slider {...settings}>
          {homeCategoryList.map((item) => (
            <CategoryCard
              key={item.key}
              bgUrl={item.bgUrl}
              desktopBgUrl={item.desktopBgUrl}
              introduction={item.introduction}
              // imageUrl={item.imageUrl}
              // iconUrl={item.iconUrl}
              text={item.text}
              gameType={item.gameType}
              type={item.key}
            />
          ))}
        </Slider>
      )}
    </Wrapper>
  );
};

export default CategorySection;
