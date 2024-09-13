import activedFavoriteIcon from "@/assets/t28/images/home/actived-favorite.svg";
import activedHotIcon from "@/assets/t28/images/home/actived-hot.svg";
import activedNewIcon from "@/assets/t28/images/home/actived-new.svg";
import activedRecommendIcon from "@/assets/t28/images/home/actived-recommend.svg";
import favoriteIcon from "@/assets/t28/images/home/favorite.svg";
import hotIcon from "@/assets/t28/images/home/hot.svg";
import newIcon from "@/assets/t28/images/home/new.svg";
import recommendIcon from "@/assets/t28/images/home/recommend.svg";
import { Select } from "@/components/UI/Select";
import { media } from "@/theme/breakpoints";
import MenuItem from "@mui/material/MenuItem";
import { providerStatus } from "@tgs-web-nx/constants";
import {
  FilterTag,
  filterTagAll,
  FilterTagTypeEnum,
  useAuth,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//active
const FilterTagWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.2rem;

  ${media.sm} {
    position: absolute;
    top: 0;
    right: 0;
    justify-content: flex-end;
  }
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 10px;

  ${media.sm} {
    width: 410px;
    height: 100%;
  }
`;

const CommonSearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;

  .MuiInputBase-root {
    min-width: initial;
  }

  ${media.sm} {
    display: flex;
    width: initial;

    .MuiInputBase-root {
      min-width: 20rem;
    }
  }
`;

const HomeGameFilterTag = () => {
  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
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
      name: i18n.t("common.new"),
      tagType: FilterTagTypeEnum.NEW,
      iconUrl: newIcon,
      activedUrl: activedNewIcon,
    },
    {
      name: i18n.t("common.favorite"),
      tagType: FilterTagTypeEnum.FAVORITE,
      iconUrl: favoriteIcon,
      activedUrl: activedFavoriteIcon,
    },
    {
      name: i18n.t("common.hot"),
      tagType: FilterTagTypeEnum.HOT,
      iconUrl: hotIcon,
      activedUrl: activedHotIcon,
    },
    {
      name: i18n.t("common.recommend"),
      tagType: FilterTagTypeEnum.RECOMMEND,
      iconUrl: recommendIcon,
      activedUrl: activedRecommendIcon,
    },
  ];

  const validFilterTagList: FilterTag[] = filterTagList.filter(
    (tag): tag is FilterTag => tag !== null,
  );

  const handleSelectProvider = (providerName: string) => {
    const newFilterTag = providerFilterTagList.find(
      (tag: FilterTag) => tag.name === providerName,
    ) as FilterTag;
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  const sortList = ["Hot", "A-Z", "Z-A", "New"];

  return (
    <FilterTagWrapper>
      <CommonSearchWrapper>
        <Select
          onChange={(e) => handleSelectProvider(`${e.target.value}`)}
          value={activeProviderFilterTag.name}
          sx={{
            minWidth: "20rem",
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
                disabled={status === providerStatus.Maintenance}
              >
                {filterTag.name}
              </MenuItem>
            );
          })}
        </Select>
        <Select
          onChange={(e) => {}}
          value={"Hot"}
          sx={{
            minWidth: "20rem",
          }}
        >
          {sortList.map((value, index) => {
            return (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </CommonSearchWrapper>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
