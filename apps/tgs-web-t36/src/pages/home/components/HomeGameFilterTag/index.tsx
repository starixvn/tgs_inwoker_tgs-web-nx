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
import CommonTag from "./CommonTag";
import ProviderTag from "./ProviderTag";
import SearchInput from "@/pages/home/components/HomeGameFilterTag/SearchInput";
import searchIcon from "@/assets/t36/images/home/search.svg";
import { media } from "@/theme/breakpoints";
import hotIcon from "@/assets/t36/images/home/hot.svg";
import newIcon from "@/assets/t36/images/home/new.svg";
import activedHotIcon from "@/assets/t36/images/home/actived-hot.svg";
import activedNewIcon from "@/assets/t36/images/home/actived-new.svg";
import recommendIcon from "@/assets/t36/images/home/recommend.svg";
import activedRecommendIcon from "@/assets/t36/images/home/actived-recommend.svg";
import favoriteIcon from "@/assets/t36/images/home/favorite.svg";
import activedFavoriteIcon from "@/assets/t36/images/home/actived-favorite.svg";

const FilterTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const CommonTagContainer = styled.div`
  padding: 0px 14px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  height: 36px;
`;

const ProviderTagContainer = styled.div`
  flex-shrink: 0; 
  margin-bottom: 20px;
  width: 100%;
  height: 110px;
  line-height: 110px;
  padding: 0px 4px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.grayGradient};

  ${media.sm} {
    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background: ${(props) => props.theme.mainBackground};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

const CommonSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  const filterTagList: FilterTag[] = [
    {
      name: "All",
      tagType: FilterTagTypeEnum.ALL
    },
    {
      name: "New",
      tagType: FilterTagTypeEnum.NEW,
      iconUrl: newIcon,
      activedUrl: activedNewIcon,
    },
    {
      name: "Favorite",
      tagType: FilterTagTypeEnum.FAVORITE,
      iconUrl: favoriteIcon,
      activedUrl: activedFavoriteIcon,
    },
    {
      name: "Hot",
      tagType: FilterTagTypeEnum.HOT,
      iconUrl: hotIcon,
      activedUrl: activedHotIcon,
    },
    {
      name: "Recommend",
      tagType: FilterTagTypeEnum.RECOMMEND,
      iconUrl: recommendIcon,
      activedUrl: activedRecommendIcon,
    },
  ];

  const validFilterTagList: FilterTag[] = filterTagList.filter((tag): tag is FilterTag => tag !== null);

  return (
    <FilterTagWrapper>
      <ProviderTagContainer>
        {providerFilterTagList.map((filterTag) => {
          const matchedProvider = navPopupCategoryList.find(provider => provider.code === filterTag.gpCode);
          const status = matchedProvider ? matchedProvider.status : -1;

          return (
            <ProviderTag
              key={filterTag.name}
              text={filterTag.name}
              gpCode={filterTag.gpCode}
              isActive={filterTag.gpCode === activeProviderFilterTag.gpCode}
              onClick={() => onChangeProviderFilterTag(filterTag)}
              status={status}
            />
          );
        })}
      </ProviderTagContainer>

      <CommonSearchWrapper>
        <CommonTagContainer>
          {validFilterTagList.map((filterTag) => {
            return (
              <CommonTag
                key={filterTag.name}
                text={filterTag.name}
                isActive={filterTag.tagType === activeFilterTag.tagType}
                onClick={() => onChangeCommonFilterTag(filterTag)}
              />
            );
          })}
        </CommonTagContainer>

        <SearchInput
          placeholder={i18n.t("slot.search")}
          imageUrl={searchIcon}
          handleChange={handleChangeSearch}
          value={searchString}
        />

      </CommonSearchWrapper>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
