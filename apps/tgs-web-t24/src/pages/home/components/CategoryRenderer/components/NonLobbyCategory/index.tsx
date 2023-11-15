import styled from "styled-components";
import { useHistory } from "react-router";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import CategoryLabel from "@/pages/home/components/CategoryLabel";
import SearchInput from "@/pages/home/components/SearchInput";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import back from "@/assets/t24/images/home/back.svg";
import searchIcon from "@/assets/t24/images/home/searchIcon.svg";
import Loading from "@/components/UI/Loading";
import { useGameTypeList } from "@/hooks/home/useGameTypeList";
import GameCard from "@/pages/home/components/GameCard";
import { media } from "@/theme/breakpoints";
import { GameTypeEnum } from "@/constants/GameTypeEnum";

const CategoryContentWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    background-color: transparent;
    padding: 32px 0px;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  gap: 12px 16.5px;
  align-self: stretch;

  ${media.sm} {
    gap: 24px;
  }
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

const NonLobbyCategory = () => {
  const history = useHistory();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, searchString, handleChangeSearch, handleChangeGameType } =
    useHomeGameContext();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const categoryTitle = useGameTypeList().find((item) => item.gameType === activeGameType)?.text;
  const hasMappingData = !!gameList.length;

  return (
    <>
      {isMobileSize && (
        <>
          <CategoryLabel
            imageUrl={back}
            text={categoryTitle || ""}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          ></CategoryLabel>

          <SearchInputWrapper>
            <SearchInput
              placeholder={i18n.t("slot.search")}
              imageUrl={searchIcon}
              handleChange={handleChangeSearch}
              value={searchString}
            />
          </SearchInputWrapper>

          <GameFilterTag />
        </>
      )}
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
    </>
  );
};

export default NonLobbyCategory;
