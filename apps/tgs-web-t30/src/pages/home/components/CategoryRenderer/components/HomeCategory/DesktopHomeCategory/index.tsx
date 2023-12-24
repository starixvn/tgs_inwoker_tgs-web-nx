import React from "react";
import styled from "styled-components";
import GameTypeCategory from "./GameTypeCategory";
import PromotionList from "./PromotionList";
import PopularGames from "./PopularGames";
import CardPrompt from "@/pages/home/components/CardPrompt";
import MobileSlider from "@/pages/home/components/Slider";

const DesktopHomeCategoryContainer = styled.div``;

const Row = styled.div`
  display: flex;
  gap: 10px;

  & > * {
    flex: 1;
  }
`;

const DesktopHomeCategory = () => {
  return (
    <DesktopHomeCategoryContainer>
      <CardPrompt />

      <Row>
        <GameTypeCategory />
        <MobileSlider />
      </Row>

      <PromotionList />
      <PopularGames />
    </DesktopHomeCategoryContainer>
  );
};

export default DesktopHomeCategory;
