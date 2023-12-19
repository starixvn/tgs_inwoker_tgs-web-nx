import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import { NavItem } from "@/layouts/hooks/useGetNavItemList";

const NavCardContainer = styled.div`
  position: relative;
  width: calc((100% - 12px * 2) / 3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0 0;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;
`;

const NavCardLabel = styled.div`
  background: ${({ theme }) => theme.maskWhite20};
  padding: 6px 0 16px;
  text-align: center;
  width: 100%;
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
const NavCard = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl, iconSecondaryUrl } = navItem;

  const imageUrl = iconSecondaryUrl || iconUrl;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon iconUrl={imageUrl} width={"32px"} height={"32px"} />

      <NavCardLabel>{label}</NavCardLabel>
    </NavCardContainer>
  );
};

export default NavCard;
