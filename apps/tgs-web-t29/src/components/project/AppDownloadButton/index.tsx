import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { NavCardKey } from "@tgs-web-nx/types";
import Icon from "@/components/project/Icon";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const AppDownloadButtonContainer = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 20px;
  background: ${({ theme }) => theme.mainBackground};
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
  const { accountNavItemList } = useGetNavItemList();

  const downloadNavItem = accountNavItemList.find(
    (navItem) => navItem.key === NavCardKey.APP_DOWNLOAD && navItem.navType === "route",
  );

  if (!downloadNavItem) return null;
  if (downloadNavItem.navType !== "route") return null;

  const { label, iconUrl, routePath } = downloadNavItem;
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
