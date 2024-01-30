import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";

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
    $isActive ? "linear-gradient(180deg, #922ACF 0%, #2F26AD 100%)" : theme.primaryLight};
  color: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? theme.white : theme.tertiaryMiddle};
  border-radius: 5px;
  padding: 12px;
  text-align: center;
  font-size: 0.875rem;
  line-height: 0.875rem;
  font-weight: 700;
  cursor: pointer;
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
