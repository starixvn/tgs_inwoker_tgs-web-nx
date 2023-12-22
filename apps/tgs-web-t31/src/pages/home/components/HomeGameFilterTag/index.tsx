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
import { useHistory } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import { providerStatus } from "@tgs-web-nx/constants";
import CommonTag from "./CommonTag";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t29/images/home/search.svg";
import { media } from "@/theme/breakpoints";
import hotIcon from "@/assets/t31/images/home/hot.svg";
import newIcon from "@/assets/t31/images/home/new.svg";
import favoriteIcon from "@/assets/t31/images/home/favorite.svg";
import recommendIcon from "@/assets/t31/images/home/recommend.svg";

import activedHotIcon from "@/assets/t31/images/home/actived-hot.svg";
import activedNewIcon from "@/assets/t31/images/home/actived-new.svg";
import activedRecommendIcon from "@/assets/t31/images/home/actived-recommend.svg";
import activedFavoriteIcon from "@/assets/t31/images/home/actived-favorite.svg";
import { theme } from "@/theme";

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
  gap: 12px;
  display: flex;
  align-items: center;
  height: 37px;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 37px;

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

  const handleSelectProvider = (providerName: string) => {
    const newFilterTag: any = providerFilterTagList.find(
      (tag: FilterTag) => tag.name === providerName,
    );
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  return (
    <FilterTagWrapper>
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
        <Select
          onChange={(e) => handleSelectProvider(e.target.value)}
          value={activeProviderFilterTag.name}
          sx={{
            width: "200px",
            backgroundColor: theme.white,
            color: theme.black,
            height: "44px",
            padding: "0 12px",
            borderRadius: "4px",
          }}
        >
          {providerFilterTagList.map((filterTag) => {
            const matchedProvider = navPopupCategoryList.find(
              (provider) => provider.code === filterTag.gpCode,
            );
            const status = matchedProvider ? matchedProvider.status : -1;

            return (
              <MenuItem
                key={filterTag.name}
                value={filterTag.name}
                sx={{ color: "black" }}
                disabled={status === providerStatus.Maintenance}
              >
                {filterTag.name}
              </MenuItem>
            );
          })}
        </Select>
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
