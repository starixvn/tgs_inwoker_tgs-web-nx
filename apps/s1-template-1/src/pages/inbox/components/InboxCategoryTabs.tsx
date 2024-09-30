import { BadgeContainer } from "@/components/styled-component/ProfileForms";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { theme } from "@/theme";
import { InboxCategoryTab } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";

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
  background: ${({ $isActive, theme }: CategoryTabProps) => theme.secBTNBGC};
  color: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? theme.lightPurple : theme.gray50};
  border: ${({ $isActive, theme }: CategoryTabProps) =>
    $isActive ? `1px solid ${theme.lightPurple}` : `2px solid ${theme.secBTNBGC}`};
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
    <BadgeContainer>
      {tabList.map((tab) => {
        const { key, label } = tab;
        return (
          <Badge
            key={key}
            text={label}
            isActive={key === selectedTab.key}
            handleClick={() => handleClickTab(tab)}
          />
        );
      })}
    </BadgeContainer>
  );
};

export default InboxCategoryTabs;
