import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";

const InboxCategoryTabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

type CategoryTabProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const CategoryTab = styled.div<CategoryTabProps>`
  flex: 1 1 0%;
  background: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? theme.goldGradient : "transparent"};
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.pureBlack : theme.white)};
  padding: 10px 24px;
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 400;
  cursor: pointer;
  border-radius: 6px;
  border: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? "transparent" : `1px solid ${theme.gray}`};
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
