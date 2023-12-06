import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import BottomNav from "./BottomNav";
import { BottomNavItem, useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: black;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 20px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
`;

const BottomAppBar = () => {
  const { bottomNavItemList, selectedBottomNavItem, handleClickBottomNavItem } =
    useGetBottomNavItemList();
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const handleClick = (bottomNavItem: BottomNavItem) => {
    if (bottomNavItem.routePath === "/") {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
      return;
    }
    handleClickBottomNavItem(bottomNavItem);
  };

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={() => handleClick(bottomNavItem)}
            isSelected={selectedBottomNavItem?.label === bottomNavItem.label}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;
