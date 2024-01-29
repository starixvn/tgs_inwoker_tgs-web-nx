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
import Chip from "./Chip";
import Tag from "./ProviderTag";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t22/images/home/search.svg";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TagContainer = styled.div`
  padding: 10px 10px 0;
  display: flex;
  gap: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.labelText};
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar-thumb {
    visibility: hidden;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    
  }

  &:hover{
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
`;


export const SearchInputWrapper = styled.div`
  padding: 4px;
  width: 100%;
  border-radius: 6px;
  box-shadow: 1px 2px 8px 0 #9A8075;

  ${media.sm} {
    width: 300px;
    height: 100%;
    margin-left: 8px;
  }
`;

const SearchContainer = styled.div`
  margin-top: 25px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({theme})=>theme.gray02};
  width: 100%;
`;

const AllText = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $isActive }) => ($isActive ? theme.primaryGradient : "none")};
  border-radius: 6px;
  min-width: 100px;
  font-size: 14px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
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
      return;
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
      name: "New",
      tagType: FilterTagTypeEnum.NEW,
    },
    {
      name: "Hot",
      tagType: FilterTagTypeEnum.HOT,
    },
    {
      name: "Recommend",
      tagType: FilterTagTypeEnum.RECOMMEND,
    },
    {
      name: "Favorite",
      tagType: FilterTagTypeEnum.FAVORITE,
    },
  ];


  const validFilterTagList: FilterTag[] = filterTagList.filter(
    (tag) => tag !== null,
  );

  return (
    <Wrapper>
      <TagContainer>
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
      </TagContainer>

      <SearchContainer>
        <CategoryContainer>
          {validFilterTagList.map((filterTag) => {
            return (
              <Chip
                key={filterTag.name}
                text={filterTag.name}
                isActive={filterTag.tagType === activeFilterTag.tagType}
                onClick={() => onChangeCommonFilterTag(filterTag)}
              />
            );
          })}
        </CategoryContainer>

        <SearchInput
          placeholder={i18n.t("slot.search")}
          imageUrl={searchIcon}
          handleChange={handleChangeSearch}
          value={searchString}
        />
      </SearchContainer>
    </Wrapper>
  );
};

export default HomeGameFilterTag;
