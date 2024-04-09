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
import CommonTag from "./CommonTag";
import Tag from "./ProviderTag";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t29/images/home/search.svg";
import { media } from "@/theme/breakpoints";
import hotIcon from "@/assets/t29/images/home/hot.svg";
import newIcon from "@/assets/t29/images/home/new.svg";
import activedHotIcon from "@/assets/t29/images/home/actived-hot.svg";
import activedNewIcon from "@/assets/t29/images/home/actived-new.svg";
import recommendIcon from "@/assets/t29/images/home/recommend.svg";
import activedRecommendIcon from "@/assets/t29/images/home/actived-recommend.svg";
import favoriteIcon from "@/assets/t29/images/home/favorite.svg";
import activedFavoriteIcon from "@/assets/t29/images/home/actived-favorite.svg";

const FilterTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CommonTagContainer = styled.div`
  padding: 0px 14px;
  border-radius: 100px;
  gap: 12px;
  display: flex;
  align-items: center;
  height: 37px;
  border: 1px solid ${({ theme }) => theme.blue40};
`;

const ProviderTagContainer = styled.div``;

const ProviderTagContent = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 37px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.blue40};

  ${media.sm} {
    width: 300px;
    height: 100%;
    margin-left: 8px;
  }
`;

const CommonSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AllText = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  width: 100px;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.gray70};
  border-bottom: ${({ $isActive, theme }) => ($isActive ? `3px solid ${theme.blue60}` : "none")};
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.white : "none")};
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const HomeGameFilterTag = () => {
  const { isLogin } = useAuth();
  const history = useHistory();
  const {
    providerFilterTagList,
    handleChangeActiveFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    activeProviderFilterTag,
    searchString,
    handleChangeSearch,
    providerList,
  } = useHomeGameContext();

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

  const filterTagList: FilterTag[] = [
    {
      name: "new",
      tagType: FilterTagTypeEnum.NEW,
      iconUrl: newIcon,
      activedUrl: activedNewIcon,
    },
    {
      name: "favorite",
      tagType: FilterTagTypeEnum.FAVORITE,
      iconUrl: favoriteIcon,
      activedUrl: activedFavoriteIcon,
    },
    {
      name: "hot",
      tagType: FilterTagTypeEnum.HOT,
      iconUrl: hotIcon,
      activedUrl: activedHotIcon,
    },
    {
      name: "recommend",
      tagType: FilterTagTypeEnum.RECOMMEND,
      iconUrl: recommendIcon,
      activedUrl: activedRecommendIcon,
    },
  ];

  const validFilterTagList: FilterTag[] = filterTagList.filter(
    (tag): tag is FilterTag => tag !== null,
  );

  return (
    <FilterTagWrapper>
      <ProviderTagContainer>
        <ProviderTagContent>
          <AllText
            onClick={() =>
              onChangeProviderFilterTag({
                name: FilterTagTypeEnum.ALL,
                tagType: FilterTagTypeEnum.ALL,
              })
            }
            $isActive={activeProviderFilterTag.tagType === FilterTagTypeEnum.ALL}
          >
            ALL
          </AllText>
          <div>
            {providerFilterTagList.map((filterTag) => {
              const matchedProvider = providerList.find(
                (provider) => provider.code === filterTag.gpCode,
              );
              const status = matchedProvider ? matchedProvider.status : -1;

              return (
                <Tag
                  key={filterTag.name}
                  text={filterTag.name}
                  gpCode={filterTag.gpCode}
                  isActive={filterTag.gpCode === activeProviderFilterTag.gpCode}
                  onClick={() => onChangeProviderFilterTag(filterTag)}
                  status={status}
                />
              );
            })}
          </div>
        </ProviderTagContent>
      </ProviderTagContainer>

      <CommonSearchWrapper>
        <CommonTagContainer>
          {validFilterTagList.map((filterTag) => {
            return (
              <CommonTag
                key={filterTag.name}
                text={filterTag.name}
                iconUrl={filterTag.iconUrl}
                activedUrl={filterTag.activedUrl}
                isActive={filterTag.tagType === activeFilterTag.tagType}
                onClick={() => onChangeCommonFilterTag(filterTag)}
              />
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
