import React from "react";
import styled from "styled-components";
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
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    &::-webkit-scrollbar {
      visibility: hidden;
    }
  }
`;

const CategorySection = () => {
  const homeCategoryList = useHomeCategoryList();

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default CategorySection;
