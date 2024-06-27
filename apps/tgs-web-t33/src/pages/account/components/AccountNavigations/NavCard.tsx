import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import Icon from "@/components/project/Icon";

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc((100% - 2 * 8px) / 3);
  padding: 6.5px 0 0;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;
  background: ${({ theme }) => theme.grey00};
`;

const LabelContainer = styled.div`
  padding: 6px;
  text-align: center;
  background: ${({ theme }) => theme.maskWhite20};
  width: 100%;
  height: 40px;
  font-size: 0.75rem;
  font-weight: 400;
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
        width={"26px"}
        height={"26px"}
        style={{
          marginBottom: "6.5px",
        }}
      />

      <LabelContainer>{label}</LabelContainer>
    </NavCardContainer>
  );
};

export default NavCard;
