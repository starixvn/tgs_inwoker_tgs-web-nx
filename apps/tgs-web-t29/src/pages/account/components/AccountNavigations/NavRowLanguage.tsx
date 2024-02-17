import styled from "styled-components";
import Icon from "@/components/project/Icon";
import { NavItem } from "@/layouts/hooks/useGetNavItemList";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  height: 44px;

  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
const NavRowLanguage = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl } = navItem;

  const imageUrl = iconUrl;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon iconUrl={imageUrl} width={"24px"} height={"24px"} />

      <span>{label}</span>

      <LanguageSwitch style={{ width: "129px", height: "32px", marginLeft: "auto" }} />
    </NavCardContainer>
  );
};

export default NavRowLanguage;
