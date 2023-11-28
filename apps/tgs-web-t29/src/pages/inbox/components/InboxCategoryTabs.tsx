import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@/pages/inbox/hooks/useInboxCategoryTabs";

const InboxCategoryTabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

type CategoryTabProps = {
  $isActive: boolean;
};
const CategoryTab = styled.div<CategoryTabProps>`
  flex: 1;
  background: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? theme.blue40 : theme.blue20};
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.white : theme.gray50)};
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
