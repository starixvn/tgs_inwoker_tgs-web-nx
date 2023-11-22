import styled from "styled-components";
import Icon from "@/components/project/Icon";
import { NavItem } from "@/layouts/hooks/useGetNavItemList";

const NavCardContainer = styled.div`
  cursor: pointer;
  height: 58px;
  width: 254px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.304rem;
  padding: 19px 0;

  & > div:first-child {
    margin-right: 10px;
  }
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
const SideMenuNavItem = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl } = navItem;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon iconUrl={iconUrl} width={"20px"} height={"20px"} />

      <span>{label}</span>
    </NavCardContainer>
  );
};

export default SideMenuNavItem;
