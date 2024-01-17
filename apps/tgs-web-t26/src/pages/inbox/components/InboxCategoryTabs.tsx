import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";

const InboxCategoryTabsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

type CategoryTabProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const CategoryTab = styled.div<CategoryTabProps>`
  width: 170px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? theme.primary : "transparent"};
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.black : theme.text)};
  border: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? "none" : `1px solid ${theme.white}`};
  border-radius: 10px;
  padding: 10px 24px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
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
