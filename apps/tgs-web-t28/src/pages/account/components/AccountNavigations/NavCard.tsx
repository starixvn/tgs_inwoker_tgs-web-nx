import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";

const NavCardContainer = styled.div`
  background: ${({ theme }) => theme.NavBGC};
  position: relative;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc((100% - 3 * 8px) / 3);
  padding: 28px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;
  & span {
    margin-top: 12px;
    white-space: normal;
    text-align: center;
  }
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
const NavCard = ({ navItem, handleClick }: Props) => {
  const { label, Icon } = navItem;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon $color={theme.white} />
      <span>{label}</span>
    </NavCardContainer>
  );
};

export default NavCard;
