import { Loading } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameItem } from "@tgs-web-nx/types";
import { i18n, utility } from "@tgs-web-nx/utils";

import GameCard from "../../../GameCard";
import HomeGameFilterTag from "../../../HomeGameFilterTag";
import LoadMore from "../LoadMore";
import { DesktopCategoryContentWrapper, DesktopWrapper, GameList, NoData, Wrapper } from "./style";

const NonLobbyWrapper: React.FC<{
  isHideProviderDropdown?: boolean;
  gameList: GameItem[];
  isLoading: boolean;
}> = ({ isHideProviderDropdown, gameList, isLoading }) => {
  const { isDesktopSize } = useRwd();
  const hasMappingData = !!gameList.length;

  return (
    <Wrapper>
      <DesktopWrapper>
        <HomeGameFilterTag isHideProviderDropdown={isHideProviderDropdown} />
        <DesktopCategoryContentWrapper>
          <GameList>
            {hasMappingData &&
              gameList.map((gameItem: any, index: number) => {
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

export default NonLobbyWrapper;
