import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import { NavItem } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  /* padding: 10px 20px; */
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;

  & > span {
    font-size: 20px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
  }
  &:hover {
    background: ${({ theme }) => theme.gray20};

    ${media.sm} {
      background: ${({ theme }) => theme.mainBackground};
      //width: calc((100% - 7 * 8px) / 8);
    }
  }
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
type IconProps = {
  $color: string;
};
const NavRow = ({ navItem, handleClick }: Props) => {
  const { label } = navItem;
  const Icon = navItem.Icon as React.FC<IconProps>;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon $color={theme.primary} />
      <span>{label}</span>
    </NavCardContainer>
  );
};

export default NavRow;
