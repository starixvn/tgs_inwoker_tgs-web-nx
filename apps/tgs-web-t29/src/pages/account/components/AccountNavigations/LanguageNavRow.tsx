import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.gray50};
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;

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
const LanguageNavRow = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl, iconSecondaryUrl } = navItem;
  const { isDesktopSize } = useRwd();

  const imageUrl = !isDesktopSize ? iconSecondaryUrl ?? iconUrl : iconUrl;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon iconUrl={imageUrl} width={"24px"} height={"24px"} />

      <span>{label}</span>
    </NavCardContainer>
  );
};

export default LanguageNavRow;
