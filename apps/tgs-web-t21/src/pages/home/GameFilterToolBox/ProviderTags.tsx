import React from "react";
import styled from "styled-components";
import {
  FilterTag,
  FilterTagTypeEnum,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { MenuItem as MuiMenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import Tag from "../components/HomeGameFilterTag/ProviderTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const ProviderTagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* padding: 0px 6px 0px 14px; */
  /* border-radius: 100px; */
  /* border: 1px solid ${({ theme }) => theme.blue40}; */
  align-self: stretch;

  &::-webkit-scrollbar {
    display: none;
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
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  // const handleChange = (e: SelectChangeEvent<any>) => {
  //   const selectedTagName = e.target.value;
  //   const selectedFilterTag = providerFilterTagList.find(
  //     (filterTag) => filterTag.name === selectedTagName,
  //   ) || {
  //     tagType: FilterTagTypeEnum.ALL,
  //     name: "",
  //   };
  //   handleChangeActiveProviderFilterTag(selectedFilterTag);
  // };

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  return (
    <ProviderTagsContainer>
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
      {/* <StyledSelect
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
      </StyledSelect> */}
    </ProviderTagsContainer>
  );
};

export default ProviderTags;
