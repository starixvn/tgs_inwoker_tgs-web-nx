import styled from "styled-components";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import Icon from "@/components/project/Icon";

const NavCardContainer = styled.div`
  cursor: pointer;
  height: 44px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.black};
  border-bottom: 1px solid ${({ theme }) => theme.maskBlack20};
  font-size: 0.875rem;
  font-weight: 400;
  padding: 10px 12px;

  &:hover {
  background: #00000011;
}
}

  & > div:first-child {
    margin-right: 30px;
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
      <Icon iconUrl={iconUrl} width={"24px"} height={"24px"} />

      <span>{label}</span>
    </NavCardContainer>
  );
};

export default SideMenuNavItem;
