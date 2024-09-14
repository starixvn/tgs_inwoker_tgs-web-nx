import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import {
  FilterTag,
  useGetLobbyCategoryList,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n, utility } from "@tgs-web-nx/utils";

import { GameTypeTitle } from "../HomeCategory/style";
import LoadMore from "../LoadMore";
import { DesktopCategoryContentWrapper, DesktopWrapper, GameList, Text, Wrapper } from "./style";

const NonLobbyCategory = () => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const { activeGameTypeKey } = useHomeGameContext();
  const hasMappingData = !!gameList.length;
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  return (
    <Wrapper>
      <DesktopWrapper>
        <HomeGameFilterTag />
        <GameTypeTitle>
          {activeGameTypeKey !== "fishing"
            ? i18n.t(`common.${activeGameTypeKey}`)
            : i18n.t(`common.fish`)}
        </GameTypeTitle>
        <DesktopCategoryContentWrapper>
          <GameList>
            {hasMappingData &&
              gameList.map((gameItem) => (
                <li>
                  <GameCard
                    key={gameItem.id}
                    gameItem={gameItem}
                    isActive={gameItem.isactive}
                    imageUrl={`${utility.imagePathGenerator(
                      `${gameItem.gpcode.toLowerCase()}/en-US/${gameItem.code}${
                        isDesktopSize ? "@2x" : "@1x"
                      }.webp`,
                    )}`}
                  />
                </li>
              ))}
            {!hasMappingData && !isLoading && <Text>{i18n.t("common.nodata")}</Text>}
          </GameList>
        </DesktopCategoryContentWrapper>
        <LoadMore></LoadMore>
      </DesktopWrapper>

      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
