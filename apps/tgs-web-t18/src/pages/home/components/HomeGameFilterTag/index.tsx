import styled from "styled-components";
import {
  FilterTag,
  filterTagAll,
  FilterTagTypeEnum,
  useAuth,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import CommonTag from "./CommonTag";
import Tag from "./ProviderTag";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t30/images/home/search.svg";
import hotIcon from "@/assets/t30/images/home/filter/hot.svg";
import newIcon from "@/assets/t30/images/home/filter/new.svg";
import activedHotIcon from "@/assets/t30/images/home/filter/actived-hot.svg";
import activedNewIcon from "@/assets/t30/images/home/filter/actived-new.svg";
import recommendIcon from "@/assets/t30/images/home/filter/recommend.svg";
import activedRecommendIcon from "@/assets/t30/images/home/filter/actived-recommend.svg";
import favoriteIcon from "@/assets/t30/images/home/filter/favorite.svg";
import activedFavoriteIcon from "@/assets/t30/images/home/filter/actived-favorite.svg";

const FilterTagWrapper = styled.div`
  width: 100%;
  max-width: 338px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme["515c"]};
`;

const CommonSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  gap: 12px;
`;

const CommonTagContainer = styled.div`
  width: 228px;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: start;
  overflow: visible;
`;

const ProviderTagContainer = styled.div``;

const ProviderTagContent = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
`;

export const SearchInputWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.grey00};
`;

const AllText = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  width: calc((100% - 10px * 2) / 3);
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  align-items: center;
  justify-content: center;
  color: #999999;
  background: #2c2c2c;
  border-bottom: 3px solid #ffffff1a;
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
  } = useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();

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

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

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

  const handleClearFilter = () => {
    handleChangeActiveProviderFilterTag({
      name: FilterTagTypeEnum.ALL,
      tagType: FilterTagTypeEnum.ALL,
    });
    handleChangeActiveFilterTag(filterTagAll);
  };

  return (
    <FilterTagWrapper>
      <SearchInputWrapper>
        <SearchInput
          placeholder={i18n.t("slot.search")}
          imageUrl={searchIcon}
          handleChange={handleChangeSearch}
          value={searchString}
        />
      </SearchInputWrapper>

      <CommonSearchWrapper>
        <Button
          onClick={handleClearFilter}
          sx={{
            background: "#2c2c2c",
            color: "white",
            marginLeft: "auto",
            fontSize: "12px",
            padding: "4px 10px",
          }}
        >
          CLEAR FILTER
        </Button>

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
      </CommonSearchWrapper>

      <ProviderTagContainer>
        <ProviderTagContent>
          {providerFilterTagList.map((filterTag) => {
            const matchedProvider = navPopupCategoryList.find(
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
        </ProviderTagContent>
      </ProviderTagContainer>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
