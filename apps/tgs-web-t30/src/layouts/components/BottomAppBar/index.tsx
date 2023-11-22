import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useMemo } from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import live from "@/assets/t33/images/home/gameType/liveCasino.svg";
import sports from "@/assets/t33/images/home/gameType/sports.svg";
import slot from "@/assets/t33/images/home/gameType/slot.svg";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 10px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
  gap: 5px;
`;

const BottomAppBar = () => {
  // const { bottomNavItemList, selectedBottomNavItem, handleClickBottomNavItem } =
  //   useGetBottomNavItemList();
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const bottomNavList = useMemo<GameTypeItem[]>(() => {
    return [
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "smaller",
        gameType: GameTypeEnum.LIVELOBBY,
      },
    ];
  }, []);

  const handleClick = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);

    if (history.location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <BottomAppBarContainer>
      {bottomNavList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.key}
            label={bottomNavItem.text}
            onClick={() => handleClick(bottomNavItem)}
            isSelected={false}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;
