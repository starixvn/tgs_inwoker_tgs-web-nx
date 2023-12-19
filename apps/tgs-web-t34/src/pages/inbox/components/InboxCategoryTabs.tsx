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
    $isActive ? theme.black : theme.white};
  border: 1px solid
    ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.black : "#00000033")};
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.white : theme.text)};
  padding: 12px;
  text-align: center;
  font-size: 0.812rem;
  line-height: 0.934rem;
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
