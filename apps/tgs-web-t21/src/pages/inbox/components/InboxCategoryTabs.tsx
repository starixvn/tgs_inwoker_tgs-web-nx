import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";

const InboxCategoryTabsContainer = styled.div`
  max-width: 340px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

type CategoryTabProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const CategoryTab = styled.div<CategoryTabProps>`
  flex: 1;
  background: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? "linear-gradient(180deg, #03A9DD 0%, #09B6ED 50%, #02C3FF 100%)" : theme.gray10};
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.white : theme.gray80)};
  border-radius: 5px;
  padding: 12px;
  text-align: center;
  font-size: 0.812rem;
  line-height: 0.934rem;
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
