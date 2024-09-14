import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import { CommonSearchWrapper, FilterTagWrapper } from "./style";

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
          onChange={(e: MultiSelectChangeEvent) =>
            handleChangeActiveProviderFilterTag(e.target.value)
          }
          value={activeProviderFilterTag}
          options={providerFilterTagList}
          optionLabel="name"
          optionValue="gpCode"
          placeholder={i18n.t("web.home.Section1GameProviders")}
          maxSelectedLabels={2}
          className="multi-select"
        ></MultiSelect>
        <Dropdown
          onChange={(e) => handleChangeActiveFilterTag(e.target.value)}
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
