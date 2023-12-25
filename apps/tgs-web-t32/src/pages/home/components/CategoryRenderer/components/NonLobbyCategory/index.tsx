import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import CategoryLabel from "../LobbyCategory/components/CategoryLabel";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import GameTypeTab from "@/pages/home/components/GameTypeTab/mobile";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

import useGameTypeList from "@/hooks/home/useGameTypeList";

const NonLobbyCategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryContentWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
  padding: 20px 0px;
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
    row-gap: 10px;
    column-gap: 7px;
  }
`;

const CategoryTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NonLobbyCategory = () => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;
  const { activeGameTypeKey } = useHomeGameContext();
  const gameTypeList = useGameTypeList();
  const categoryIcon = gameTypeList.find((item) => item.key === activeGameTypeKey)?.iconUrl;
  const categorytitle = gameTypeList.find((item) => item.key === activeGameTypeKey)?.title;

  return (
    <NonLobbyCategoryWrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={categoryIcon ?? ''} text={categorytitle ?? ''} />
      </CategoryTitle>

      {isMobileSize && <GameFilterTag />}
      {isDesktopSize && <HomeGameFilterTag />}

      <CategoryContentWrapper>
        <CategoryContent>
          {hasMappingData &&
            gameList.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                  }.jpg`}
              />
            ))}
          {!hasMappingData && !isLoading && <div>No data</div>}
        </CategoryContent>
      </CategoryContentWrapper>
      <Loading show={isLoading} />
    </NonLobbyCategoryWrapper>
  );
};

export default NonLobbyCategory;
