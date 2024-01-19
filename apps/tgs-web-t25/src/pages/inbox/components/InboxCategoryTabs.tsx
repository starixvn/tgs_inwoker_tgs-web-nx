import React from "react";
import styled from "styled-components";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const InboxCategoryTabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  ${media.sm} {
    background: ${({ theme }) => theme.black03};
    border-radius: 10px;
    padding: 8px;
    justify-content: flex-start;
  }
`;

type CategoryTabProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const CategoryTab = styled.div<CategoryTabProps>`
  flex: 1;
  background: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? theme.primary : theme.black02};
  border: 1px solid
    ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.primary : theme.grey06)};
  border-radius: 6px;
  color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.black : theme.grey03)};
  padding: 12px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  ${media.sm} {
    max-width: 170px;
    background: ${({ $isActive, theme }: CategoryTabProps) =>
      $isActive ? theme.primary : theme.black03};
    border: none;
    border-radius: 6px;
    color: ${({ $isActive, theme }: CategoryTabProps) => ($isActive ? theme.black : theme.grey03)};
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
