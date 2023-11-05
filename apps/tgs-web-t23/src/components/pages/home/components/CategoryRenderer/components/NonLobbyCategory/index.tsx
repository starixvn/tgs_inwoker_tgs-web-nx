import searchIcon from "@/assets/t23/images/home/search.svg";
import GameCard from "@/components/pages/home/components/GameCard";
import GameFilterTag from "@/components/pages/home/components/GameFilterTag";
import SearchInput from "@/components/pages/home/components/SearchInput";
import config from "@/config/config";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import Common from "@/core/utils/Common";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import Tag from "@/components/pages/home/components/GameFilterTag/Tag";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { useGetNonLobbyCategoryList } from "@/core/feature/game/useGetNonLobbyCategoryList";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import Loading from "@/components/UI/Loading";

const TagCategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 10px;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};
`;

const TagCategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-shrink: 0;
  width: 100%;
`;

const CategoryLabel = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  width: 150px;
  height: 40px;
`;

const CategoryTitle = styled.div`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 14px;
  padding: 10px 0px;
`;

type Props = any;

const NonLobbyCategory = ({}: Props) => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, favoriteList } = useHomeGameContext();
  const title = gameTypeList.find((gameTypeItem) => gameTypeItem.gameType === activeGameType)?.text;

  const { gameList, isLoading } = useGetNonLobbyCategoryList();

  // if (!filteredMatchGames) {
  //   return <div>No data</div>;
  // }
  return (
    <>
      <CategoryLabel>
        <CategoryTitle>{title}</CategoryTitle>
        {/*<SearchInputWrapper>*/}
        {/*  <SearchInput*/}
        {/*    placeholder={i18n.t("slot.search")}*/}
        {/*    imageUrl={searchIcon}*/}
        {/*    handleChange={handleSearch}*/}
        {/*    value={searchString}*/}
        {/*  />*/}
        {/*</SearchInputWrapper>*/}
      </CategoryLabel>

      <GameFilterTag />

      <TagCategoryWrapper>
        <TagCategoryContent>
          {!!gameList.length &&
            gameList.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${
                  config.sourceUrl
                }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                  gameItem.code
                }.jpg`}
              />
            ))}
          {!gameList.length && !isLoading && <div>No data</div>}
        </TagCategoryContent>
      </TagCategoryWrapper>

      <Loading show={isLoading} />
    </>
  );
};

export default NonLobbyCategory;
