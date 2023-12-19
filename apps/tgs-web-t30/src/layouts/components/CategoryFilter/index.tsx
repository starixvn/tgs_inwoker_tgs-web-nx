import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import DrawerButton from "@/layouts/components/CategoryFilter/components/DrawerButton";

const CategoryFilterContainer = styled.div`
  width: 100%;
  height: 64px;
  background: ${({ theme }) => theme.bg};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
`;

const CategoryFilter = () => {
  const { activeGameType } = useHomeGameContext();

  if (activeGameType === GameTypeEnum.NONE) return null;

  return (
    <CategoryFilterContainer>
      <DrawerButton drawerType={"provider"} />
      <DrawerButton drawerType={"category"} />
    </CategoryFilterContainer>
  );
};

export default CategoryFilter;
