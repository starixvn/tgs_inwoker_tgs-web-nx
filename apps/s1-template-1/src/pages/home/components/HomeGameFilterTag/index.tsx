import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import { CommonSearchWrapper, FilterTagWrapper } from "./style";
import { usePagination } from "../../../../../../../libs/core/features/src/feature/game/hooks/usePagination";

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
    handleChangePageIndex
  } = useHomeGameContext();

  const handleChangeProvider = (event: MultiSelectChangeEvent) => {
    handleChangeActiveProviderFilterTag(event.target.value);
    handleChangePageIndex(1);
  }

  const handleChangeOrderBy = (event: DropdownChangeEvent) => {
    handleChangeActiveFilterTag(event.target.value);
    handleChangePageIndex(1);
  }

  return (
    <FilterTagWrapper>
      <CommonSearchWrapper>
        <MultiSelect
          filter
          onChange={handleChangeProvider}
          value={activeProviderFilterTag}
          options={providerFilterTagList}
          optionLabel="name"
          optionValue="gpCode"
          placeholder={i18n.t("web.home.Section1GameProviders")}
          maxSelectedLabels={2}
          className="multi-select"
        ></MultiSelect>
        <Dropdown
          onChange={handleChangeOrderBy}
          value={activeFilterTag}
          options={filterTagList}
          optionLabel="name"
          optionValue="tagType"
          placeholder={i18n.t("web.home.Section1GameProviders")}
        ></Dropdown>
      </CommonSearchWrapper>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
