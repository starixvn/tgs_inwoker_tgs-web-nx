import styled from "styled-components";
import { GameTypeItem } from "@tgs-web-nx/core/features";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import Icon from "@/components/project/Icon";

const NavCardContainer = styled.div`
  cursor: pointer;
  height: 62px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
  padding: 0 12px;
  color: ${({ theme }) => theme.iconLable};
  border-bottom: 1px solid ${({ theme }) => theme.black30};

  & > div:first-child {
    margin-right: 10px;
  }
`;

type Props = {
  navItem: GameTypeItem;
  handleClick: (navItem: any) => void;
};
const SideMenuNavItem = ({ navItem, handleClick }: Props) => {
  const { text, iconUrl } = navItem;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon iconUrl={iconUrl} width={"40px"} height={"40px"} />
      <span>{text}</span>
    </NavCardContainer>
  );
};

export default SideMenuNavItem;
