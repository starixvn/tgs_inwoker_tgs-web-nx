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
  OrderTypeEnum,
  useAuth,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Dropdown} from 'primereact/dropdown';

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
  const {
    providerFilterTagList,
    filterTagList,
    activeProviderFilterTag,
    handleChangeActiveFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    searchString,
    handleChangeSearch,
  } = useHomeGameContext();

  return (
    <FilterTagWrapper>
      <CommonSearchWrapper>
        <MultiSelect
          filter 
          onChange={(e: MultiSelectChangeEvent) => handleChangeActiveProviderFilterTag(e.target.value)}
          value={activeProviderFilterTag}
          options={providerFilterTagList}
          optionLabel="name"
          optionValue="gpCode"
          placeholder={i18n.t("web.home.Section1GameProviders")}
          maxSelectedLabels={2}
          // className="w-full md:w-20rem" 
        >
        </MultiSelect>
        <Dropdown 
          onChange={(e) => handleChangeActiveFilterTag(e.target.value)}
          value={activeFilterTag}
          options={filterTagList}
          optionLabel="name"
          optionValue="tagType"
          placeholder={i18n.t("web.home.Section1GameProviders")}
        >
        </Dropdown>
      </CommonSearchWrapper>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
