import { useRwd } from "@/core/hooks/tools/useRwd";
import styled from "styled-components";
import { useGetHomeCategoryList } from "@/core/feature/game/useGetHomeCategoryList";

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

const HomeCategory = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { hotGameList, newGameList, recommendGameList } = useGetHomeCategoryList();

  const showCategoryAmount = (tag: string, isLobbyType: boolean) => {
    if (isMobileSize) {
      if (isLobbyType) {
        return 3;
      } else {
        if (tag === "Hot") {
          return 9;
        }
      }
      return 6;
    }
    if (isDesktopSize) {
      return 6;
    }
  };
  return <h1>YOYO</h1>;

  return (
    <HomeCategoryContainer>
      {/*{Object.values(lobbyCategoryList).map((category) => {*/}
      {/*  const { key, iconUrl, text, gameType } = category;*/}

      {/*  if ([GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME].includes(gameType)) {*/}
      {/*    //  slots, fishing, and egame (with games)*/}
      {/*    return (*/}
      {/*      <HomeNonLobbyCategory*/}
      {/*        key={key}*/}
      {/*        iconUrl={iconUrl}*/}
      {/*        text={text}*/}
      {/*        gameType={gameType}*/}
      {/*        gameTag={text}*/}
      {/*        showDataLength={showCategoryAmount(text, false)!}*/}
      {/*        handleViewAllClick={() => {*/}
      {/*          handleGameTypeClick(gameType);*/}
      {/*        }}*/}
      {/*        gameTypeName={*/}
      {/*          gameTypeList.find((gameTypeItem) => gameTypeItem.gameType === gameType)?.key || ""*/}
      {/*        }*/}
      {/*        groupBy_gameType={groupByGameTypeList}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  } else {*/}
      {/*    //  others*/}
      {/*    return (*/}
      {/*      <LobbyCategory*/}
      {/*        key={key}*/}
      {/*        iconUrl={iconUrl}*/}
      {/*        text={text}*/}
      {/*        gameType={gameType}*/}
      {/*        showDataLength={showCategoryAmount(text, true)!}*/}
      {/*        handleViewAllClick={() => {*/}
      {/*          handleGameTypeClick(gameType);*/}
      {/*        }}*/}
      {/*        gameTypeName={*/}
      {/*          gameTypeList.find((gameTypeItem) => gameTypeItem.gameType === gameType)?.key || ""*/}
      {/*        }*/}
      {/*      />*/}
      {/*    );*/}
      {/*  }*/}
      {/*})}*/}
    </HomeCategoryContainer>
  );
};

export default HomeCategory;
