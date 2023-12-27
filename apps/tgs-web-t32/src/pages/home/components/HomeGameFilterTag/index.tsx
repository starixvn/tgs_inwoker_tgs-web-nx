import styled from "styled-components";
import {
  FilterTag,
  FilterTagTypeEnum,
  filterTagAll,
  useAuth,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useAccountStore } from "@tgs-web-nx/core";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import React from "react";
import CommonTag from "./CommonTag";
import ProviderTag from "./ProviderTag";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t32/images/home/search.svg";
import { media } from "@/theme/breakpoints";
import hotIcon from "@/assets/t32/images/home/hot.svg";
import newIcon from "@/assets/t32/images/home/new.svg";
import activedHotIcon from "@/assets/t32/images/home/actived-hot.svg";
import activedNewIcon from "@/assets/t32/images/home/actived-new.svg";
import recommendIcon from "@/assets/t32/images/home/recommend.svg";
import activedRecommendIcon from "@/assets/t32/images/home/actived-recommend.svg";
import favoriteIcon from "@/assets/t32/images/home/favorite.svg";
import activedFavoriteIcon from "@/assets/t32/images/home/actived-favorite.svg";
import { gameTagList } from "@/constants/gameTag";
import { theme } from "@/theme";

const FilterTagWrapper = styled.div`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 12px;

`;

const ProviderTagContainer = styled.div`
  width: 52%;
  height: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  align-self: stretch;

  ${media.sm} {
    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(4, 150, 207, 0.16);
      background: ${(props) => props.theme.mainBackground};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(4, 150, 207, 0.16);
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

const CommonTagContainer = styled.div`
  width: calc(100% - 180px);
  height: 100%;
  display: flex;
  padding-bottom: 10px;
  gap: 12px;
`;

const SearchInputWrapper = styled.div`
  width: 180px;
  height: 100%;
  margin-left: 12px;
  padding-bottom: 10px;
`;

const CommonSearchWrapper = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
`;

const HomeGameFilterTag = () => {
  const { isLogin } = useAuth();
  const history = useHistory();
  const {
    filterTagList,
    providerFilterTagList,
    handleChangeActiveFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    activeProviderFilterTag,
    searchString,
    handleChangeSearch,
  } = useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const onChangeCommonFilterTag = (newFilterTag: FilterTag) => {
    if (!isLogin && newFilterTag.tagType === FilterTagTypeEnum.FAVORITE) {
      history.push("/login");
    }

    if (newFilterTag.tagType === activeFilterTag.tagType) {
      handleChangeActiveFilterTag(filterTagAll);
      return;
    }
    handleChangeActiveFilterTag(newFilterTag);
  };

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  return (
    <FilterTagWrapper>
      <ProviderTagContainer>
        {providerFilterTagList.map((filterTag: FilterTag) => {
          const { name, gpCode } = filterTag;

          const matchedProvider = navPopupCategoryList.find(
            (provider) => provider.code === filterTag.gpCode,
          );
          const status = matchedProvider ? matchedProvider.status : -1;

          const isActive =
            filterTag.tagType === FilterTagTypeEnum.ALL ||
            (filterTag.tagType === FilterTagTypeEnum.PROVIDER &&
              gpCode === activeProviderFilterTag.gpCode);

          const tagCmp = gameTagList.find((tag) => tag.text === name);

          return (
            <ProviderTag
              key={name}
              text={name}
              isActive={gpCode === activeProviderFilterTag.gpCode}
              isShowIcon={gameTagList.some((tag) => tag.text === name)}
              onClick={() => onChangeProviderFilterTag(filterTag)}
            // status={status}
            >
              {tagCmp &&
                tagCmp.iconComponent &&
                React.createElement(tagCmp.iconComponent, {
                  $color: isActive ? theme.primary : theme.text,
                })}
            </ProviderTag>
          );
        })}
      </ProviderTagContainer>

      <CommonSearchWrapper>
        <CommonTagContainer>
          {filterTagList.map((filterTag) => {
            const { name, tagType } = filterTag;
            const isActive =
              filterTag.tagType !== FilterTagTypeEnum.PROVIDER && tagType === activeFilterTag.tagType;
            const tagCmp = gameTagList.find((tag) => tag.text === name);
            if (filterTag.tagType === FilterTagTypeEnum.ALL) {
              return null;
            }

            return (
              <CommonTag
                key={filterTag.name}
                text={filterTag.name}
                isActive={filterTag.tagType === activeFilterTag.tagType}
                isShowIcon={gameTagList.some((tag) => tag.text === name)}
                onClick={() => onChangeCommonFilterTag(filterTag)}
              >
                {tagCmp &&
                  tagCmp.iconComponent &&
                  React.createElement(tagCmp.iconComponent, {
                    $color: isActive ? theme.primary : theme.text,
                  })}
              </CommonTag>
            );
          })}
        </CommonTagContainer>

        <SearchInputWrapper>
          <SearchInput
            placeholder={i18n.t("slot.search")}
            imageUrl={searchIcon}
            handleChange={handleChangeSearch}
            value={searchString}
          />
        </SearchInputWrapper>
      </CommonSearchWrapper>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
