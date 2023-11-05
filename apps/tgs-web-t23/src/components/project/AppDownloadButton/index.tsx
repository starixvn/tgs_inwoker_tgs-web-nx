import styled from "styled-components";
import { NavCardKey, NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import Icon from "@/components/project/Icon";
import { useHistory } from "react-router";

const AppDownloadButtonContainer = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 20px;
  background: ${({ theme }) => theme.mainLightBackground};
  color: ${({ theme }) => theme.white};
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};

const AppDownloadButton = ({ handleClick }: Props) => {
  const history = useHistory();
  const { navItemList, navItemDictionary } = useAccountNavigations();

  const navItem = navItemDictionary[NavCardKey.APP_DOWNLOAD];
  if (navItem.navType !== "route") return null;

  const { label, iconUrl, routePath } = navItem;
  return (
    <AppDownloadButtonContainer onClick={() => history.push(routePath)}>
      <Icon
        iconUrl={iconUrl}
        width={"24px"}
        height={"24px"}
        style={{
          marginRight: "10px",
        }}
      />

      <span>{label}</span>
    </AppDownloadButtonContainer>
  );
};

export default AppDownloadButton;
