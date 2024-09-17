import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useEffect, useState } from "react";

import { CommonSearchWrapper, FilterTagWrapper } from "./style";

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
      <g clip-path="url(#clip0_928_9674)">
        <path
          d="M5.74377 13.6036C5.60059 13.7476 5.40523 13.8279 5.20231 13.8279C4.99938 13.8279 4.80403 13.7476 4.66085 13.6036L0.336574 9.27858C-0.112191 8.82982 -0.112191 8.10212 0.336574 7.65419L0.878037 7.11259C1.32694 6.66383 2.0538 6.66383 2.50257 7.11259L5.20231 9.81247L12.4974 2.51724C12.9463 2.06847 13.6739 2.06847 14.1219 2.51724L14.6634 3.05884C15.1122 3.50761 15.1122 4.23517 14.6634 4.68323L5.74377 13.6036Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_928_9674">
          <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const HomeGameFilterTag = (props) => {
  const {
    providerFilterTagList,
    filterTagList,
    activeProviderFilterTag,
    handleChangeActiveFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    searchString,
    handleChangeSearch,
    handleChangePageIndex,
  } = useHomeGameContext();
  const [selectedProviderNumbers, setSelectedProviderNumbers] = useState(0);

  const handleChangeProvider = (event: MultiSelectChangeEvent) => {
    setSelectedProviderNumbers(event.value.length);
    handleChangeActiveProviderFilterTag(event.target.value);
    handleChangePageIndex(1);
  };

  const handleChangeOrderBy = (event: DropdownChangeEvent) => {
    handleChangeActiveFilterTag(event.target.value);
    handleChangePageIndex(1);
  };

  return (
    <FilterTagWrapper>
      <CommonSearchWrapper>
        {!props.isHideProviderDropdown && (
          <MultiSelect
            filter
            onChange={handleChangeProvider}
            value={activeProviderFilterTag}
            options={providerFilterTagList}
            optionLabel="name"
            optionValue="gpCode"
            placeholder={i18n.t("common.allProviders")}
            maxSelectedLabels={1}
            className="multi-select"
            checkboxIcon={CheckIcon}
            selectedItemsLabel={`${i18n.t("common.providers")}: ${selectedProviderNumbers}`}
          ></MultiSelect>
        )}
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
