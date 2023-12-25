import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useEffect, useMemo } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import CategoryLabel from "../LobbyCategory/components/CategoryLabel";
import GameTypeTab from "@/pages/home/components/GameTypeTab/mobile";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import DesktopGameTypeTab from "@/pages/home/components/GameTypeTab/desktop";
import productIcon from "@/assets/t32/images/home/product.svg";

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 314px;
  margin: 0 auto;
  padding: 15px 0px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 8px 0px 34px 0px;
  width: 100%;
`;

const CategoryImage = styled.div<{ $imageUrl: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 250px;
  position: relative;
  aspect-ratio: 250/200;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: repeat;
  padding: 15px 0px;
  cursor: pointer;
`;

const CategoryName = styled.div`
  color: #333;
  font-size: 0.9375rem;
  font-weight: 700;
  text-align: center;
`;
// ------------------------------------------------------
const HomeCategoryWrapper = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 15px 0px;
  }
`;

const CategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 20px 0px;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  row-gap: 13px;
  column-gap: 9px;
  align-self: stretch;
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { lobbyCategoryList } = useGetLobbyCategoryList();

  // const launchLobbyGame = (gpcode: string) => {
  //   if (!account.token) {
  //     history.push("/login");
  //     return;
  //   }

  //   if (activeGameType === GameTypeEnum.COCKFIGHT) {
  //     // 以後SM01不會開,多新增AWC_COCKFIGHT(缺對應api)
  //     if (gpcode === "SM01") {
  //       const gameWindow = window.open("", "Cockfight");
  //       if (gameWindow) {
  //         GameService.GetCockfight()
  //           .then((res) => {
  //             gameWindow.document.write(res?.data);
  //             gameWindow.document.close();
  //             gameWindow.focus();
  //           })
  //           .catch(() => {
  //             gameWindow.close();
  //           });
  //       }
  //     } else {
  //       Common.closePreviousPopup();
  //       Common.PopupCenter(`/joinlobbygame/${GameTypeEnum.SPORTS}/${gpcode}`, "gamewindow");
  //     }
  //   } else {
  //     const audioElement = document.getElementById("audio") as HTMLAudioElement | null;
  //     if (audioElement) {
  //       audioElement.volume = 0;
  //     }
  //     Common.closePreviousPopup();
  //     Common.PopupCenter(`/joinlobbygame/${activeGameType}/${gpcode}`, "gamewindow");
  //   }
  // };

  // const handleClick = (gameTypeItem: GameTypeItem) => {
  //   handleChangeGameType(gameTypeItem.gameType);
  //   history.push(`/main/${gameTypeItem.key}`);
  // };

  const hasMappingData = !!lobbyCategoryList.length;

  return (
    <HomeCategoryWrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={productIcon} text={"Product"} />
      </CategoryTitle>
      {isDesktopSize ? <DesktopGameTypeTab /> : <GameTypeTab />}


    </HomeCategoryWrapper>
  );
};

export default HomeCategory;
