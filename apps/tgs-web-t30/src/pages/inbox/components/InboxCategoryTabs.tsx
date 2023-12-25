import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const InboxCategoryTabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

type CategoryTabProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const CategoryTab = styled.div<CategoryTabProps>`
  flex: 1;
  background: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? " linear-gradient(180deg, #91C538 0%, #648626 100%)" : theme.darkBlue};
  border: 1px solid
    ${({ $isActive, theme }: CategoryTabProps) =>
      $isActive ? "transparent" : theme.mainLightBackground};
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.white : theme.dae3)};
  padding: 12px;
  text-align: center;
  font-size: 0.812rem;
  line-height: 0.934rem;
  cursor: pointer;

  ${media.sm} {
    background: ${({ $isActive, theme }: CategoryTabProps) =>
      $isActive ? theme.main : theme.dae3};
    border: 1px solid
      ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? "transparent" : theme.main)};
    color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.white : "#23507D")};
  }
`;

type Props = {
  tabList: InboxCategoryTab[];
  selectedTab: InboxCategoryTab;
  handleClickTab: (newTab: InboxCategoryTab) => void;
};

const InboxCategoryTabs = ({ selectedTab, tabList, handleClickTab }: Props) => {
  return (
    <InboxCategoryTabsContainer>
      {tabList.map((tab) => {
        const { key, label } = tab;
        return (
          <CategoryTab
            key={key}
            onClick={() => handleClickTab(tab)}
            $isActive={key === selectedTab.key}
          >
            {label}
          </CategoryTab>
        );
      })}
    </InboxCategoryTabsContainer>
  );
};

export default InboxCategoryTabs;
