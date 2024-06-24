import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc((100% - 3 * 8px) / 4);
  padding: 28px;
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;

  ${media.sm} {
    background: ${({ theme }) => theme.mainLightBackground};
    //width: calc((100% - 7 * 8px) / 8);
  }
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
const NavCard = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl, iconSecondaryUrl } = navItem;
  const { isDesktopSize } = useRwd();

  const imageUrl = !isDesktopSize ? iconSecondaryUrl ?? iconUrl : iconUrl;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <Icon
        iconUrl={imageUrl}
        width={isDesktopSize ? "40px" : "50px"}
        height={isDesktopSize ? "40px" : "50px"}
        style={{
          marginBottom: "16px",
        }}
      />

      <span>{label}</span>
    </NavCardContainer>
  );
};

export default NavCard;
