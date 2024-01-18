import React from 'react';
import styled from "styled-components";
import CategoryCard from './CategoryCard';
import useHomeCategoryList from '@/hooks/home/useHomeCategoryList';
import { media } from '@/theme/breakpoints';

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
    padding: 12px 0px;
    gap: 20px;
  }
`;

const CategorySection = () => {
  const homeCategoryList = useHomeCategoryList();

  return (
    <Wrapper>
      {homeCategoryList.map(item => (
        <CategoryCard
          key={item.key}
          bgUrl={item.bgUrl}
          imageUrl={item.imageUrl}
          iconUrl={item.iconUrl}
          text={item.text}
          gameType={item.gameType}
          type={item.key}
        />
      ))}
    </Wrapper>
  );
};

export default CategorySection;
