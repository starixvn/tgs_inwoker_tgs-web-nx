import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n, utility } from "@tgs-web-nx/utils";
import { useEffect, useRef } from "react";

import LoadMore from "../LoadMore";
import { DesktopCategoryContentWrapper, DesktopWrapper, GameList, NoData, Wrapper } from "./style";

const NonLobbyCategory: React.FC<{ isHideProviderDropdown?: boolean }> = ({ isHideProviderDropdown }) => {
  const { isDesktopSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;

  return (
    <Wrapper>
      <DesktopWrapper>
        <HomeGameFilterTag isHideProviderDropdown={isHideProviderDropdown} />
        <DesktopCategoryContentWrapper>
          <GameList>
            {hasMappingData &&
              gameList.map((gameItem, index) => {
                const { id, isactive, gpcode, code } = gameItem;
                return (
                  <li key={index}>
                    <GameCard
                      key={id}
                      gameItem={gameItem}
                      isActive={isactive}
                      imageUrl={utility.getGameNameUrl(gpcode, code, isDesktopSize)}
                    />
                  </li>
                );
              })}
          </GameList>
          {!hasMappingData && !isLoading && <NoData>{i18n.t("common.nodata")}</NoData>}
        </DesktopCategoryContentWrapper>
        {gameList?.length > 0 && <LoadMore></LoadMore>}
      </DesktopWrapper>

      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
