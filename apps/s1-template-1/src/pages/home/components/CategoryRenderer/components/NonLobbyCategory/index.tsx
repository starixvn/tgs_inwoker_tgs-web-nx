import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import {
  FilterTag,
  useGetLobbyCategoryList,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n, utility } from "@tgs-web-nx/utils";
import styled from "styled-components";

import { GameTypeTitle } from "../HomeCategory/style";
import LoadMore from "../LoadMore";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    /* max-width: ${SUB_CONTENT_MAX_WIDTH}; */
    margin: 0 auto;
    padding: 15px 0px;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
  padding: 0 20px;
`;

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  gap: 10px 6px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 24px 0;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  row-gap: 10px;
  column-gap: 9px;
  align-self: stretch;

  ${media.sm} {
    row-gap: 5px;
    column-gap: 9px;
  }
`;

const DesktopWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.gray50};
  font-size: 18px;
  font-weight: 700;
`;

const GameList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  list-style: none;

  li {
    min-width: 14rem;
    flex: 0 0 1.4rem;
  }
`;

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
