import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useEffect, useMemo, useState } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import CategoryLabel from "../LobbyCategory/components/CategoryLabel";
import HomeLobbyCategory from "./mobile/components/HomeLobbyCategory";
import HomeNonLobbyCategory from "./mobile/components/HomeNonLobbyCategory";
import GameTypeTab from "@/pages/home/components/GameTypeTab/mobile";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import DesktopGameTypeTab from "@/pages/home/components/GameTypeTab/desktop";
import productIcon from "@/assets/t32/images/home/product.svg";

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeCategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  const { isDesktopSize, isMobileSize } = useRwd();
  const { activeGameType, activeGameTypeKey, handleChangeGameType } = useHomeGameContext();
  const [activeLocalGameType, setActiveLocalGameType] = useState<GameTypeEnum>(GameTypeEnum.SPORTS);

  const isNonLobbyType = [
    GameTypeEnum.SLOT,
    GameTypeEnum.FISH,
    GameTypeEnum.TABLEGAME,
  ].includes(activeLocalGameType)

  return (
    <HomeCategoryWrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={productIcon} text={"Product"} />
      </CategoryTitle>
      {isDesktopSize && <DesktopGameTypeTab />}
      {isMobileSize && <>
        <GameTypeTab activeLocalGameType={activeLocalGameType} setActiveLocalGameType={setActiveLocalGameType} />
        {isNonLobbyType
          ? <HomeNonLobbyCategory activeLocalGameType={activeLocalGameType} />
          : <HomeLobbyCategory activeLocalGameType={activeLocalGameType} />
        }
      </>}
    </HomeCategoryWrapper>
  );
};

export default HomeCategory;
