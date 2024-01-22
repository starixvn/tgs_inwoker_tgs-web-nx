import React from "react";
import styled from "styled-components";
import { FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { MenuItem as MuiMenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const ProviderTagsContainer = styled.div`
  ${media.sm} {
  }
`;

type ProviderTagProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const StyledSelect = styled(MuiSelect)`
  width: 240px;
  //margin-right: 10px;
  overflow: visible;
  //background: #00000040;
  font-weight: 400 !important;
  font-size: 0.937rem !important;
  border: 1px solid ${({ theme }) => theme.grey06};

  border-radius: 1px;

  .MuiOutlinedInput-input {
    padding: 12px !important;
  }
  & .MuiSelect-select {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text} !important;

    & > img {
      margin-right: 10px;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiSvgIcon-root {
    color: ${({ theme }) => theme.white};
  }
`;

const StyledMenuItem = styled(MuiMenuItem)`
  //border-radius: 8px;

  & > img {
    margin-right: 10px;
  }
`;

const ProviderTags = () => {
  const { activeProviderFilterTag, handleChangeActiveProviderFilterTag, providerFilterTagList } =
    useHomeGameContext();

  const handleChange = (e: SelectChangeEvent<any>) => {
    const selectedTagName = e.target.value;
    const selectedFilterTag = providerFilterTagList.find(
      (filterTag) => filterTag.name === selectedTagName,
    ) || {
      tagType: FilterTagTypeEnum.ALL,
      name: "",
    };
    handleChangeActiveProviderFilterTag(selectedFilterTag);
  };

  return (
    <ProviderTagsContainer>
      <StyledSelect
        type={"string"}
        value={activeProviderFilterTag.name || "All"}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              background: theme.mainBackground,

              "& .MuiMenuItem-root": {
                padding: 2,
                color: theme.text,
              },
            },
          },
        }}
      >
        {providerFilterTagList.map((providerFilterTag, index) => {
          return (
            <StyledMenuItem key={index} value={providerFilterTag.name}>
              {providerFilterTag.name}
            </StyledMenuItem>
          );
        })}
      </StyledSelect>
    </ProviderTagsContainer>
  );
};

export default ProviderTags;
