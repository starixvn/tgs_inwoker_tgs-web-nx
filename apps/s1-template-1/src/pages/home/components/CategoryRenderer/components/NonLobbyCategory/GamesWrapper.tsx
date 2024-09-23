import { Loading } from "@tgs-web-nx/core";
import { GameItem } from "@tgs-web-nx/types";
import { i18n, utility } from "@tgs-web-nx/utils";

import GameCard from "../../../GameCard";
import HomeGameFilterTag from "../../../HomeGameFilterTag";
import LoadMore from "../LoadMore";
import { DesktopCategoryContentWrapper, DesktopWrapper, GameList, NoData, Wrapper } from "./style";

const GamesWrapper: React.FC<{
  gameList: GameItem[];
  isLoading: boolean;
  totalGames: number;
  isHideProviderDropdown?: boolean;
  isHideOrderDropdown?: boolean;
}> = ({ gameList, isLoading, totalGames, isHideProviderDropdown, isHideOrderDropdown }) => {
  const hasMappingData = !!gameList.length;

  return (
    <Wrapper>
      <DesktopWrapper>
        <HomeGameFilterTag
          isHideProviderDropdown={isHideProviderDropdown}
          isHideOrderDropdown={isHideOrderDropdown}
        />
        <DesktopCategoryContentWrapper>
          <GameList>
            {hasMappingData &&
              gameList.map((gameItem: any, index: number) => {
                const { id, gpcode, code } = gameItem;
                return (
                  <li key={index}>
                    <GameCard
                      key={id}
                      gameItem={gameItem}
                      imageUrl={utility.getGameUrl(gpcode, code)}
                    />
                  </li>
                );
              })}
          </GameList>
          {!hasMappingData && !isLoading && <NoData>{i18n.t("common.nodata")}</NoData>}
        </DesktopCategoryContentWrapper>
        {gameList?.length > 0 && <LoadMore totalGames={totalGames}></LoadMore>}
      </DesktopWrapper>

      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default GamesWrapper;
