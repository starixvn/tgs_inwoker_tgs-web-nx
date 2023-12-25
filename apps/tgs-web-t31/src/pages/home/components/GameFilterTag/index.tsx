import React, { useState } from "react";
import styled from "styled-components";
import {
  FilterTag,
  FilterTagTypeEnum,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { MenuItem, Select } from "@mui/material";
import { providerStatus } from "@tgs-web-nx/constants";
import Tag from "./Tag";
import { gameTagList } from "@/constants/gameTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const TagContainer = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* border: 1px solid ${({ theme }) => theme.blue40}; */
  align-self: stretch;

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

const GameFilterTag = () => {
  const {
    activeFilterTag,
    handleChangeActiveFilterTag,
    filterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    providerFilterTagList,
  } = useHomeGameContext();
  const [prevFilterTag, setPrevFilterTag] = useState<FilterTag | null>(activeFilterTag);
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const handleFilterClick = (filterTag: FilterTag) => {
    setPrevFilterTag(filterTag);
    if (filterTag.tagType === FilterTagTypeEnum.PROVIDER) {
      if (filterTag.gpCode === prevFilterTag?.gpCode) {
        handleChangeActiveProviderFilterTag(allTag);
        handleChangeActiveFilterTag(allTag);
        setPrevFilterTag(allTag);
      } else {
        handleChangeActiveProviderFilterTag(filterTag);
        handleChangeActiveFilterTag(allTag);
      }
    } else {
      if (filterTag.tagType === prevFilterTag?.tagType) {
        handleChangeActiveFilterTag(allTag);
        // handleChangeActiveProviderFilterTag(allTag);
        setPrevFilterTag(allTag);
      } else {
        handleChangeActiveFilterTag(filterTag);
        // handleChangeActiveProviderFilterTag(allTag);
      }
    }
  };

  const handleSelectProvider = (providerName: string) => {
    const newFilterTag: any = providerFilterTagList.find(
      (tag: FilterTag) => tag.name === providerName,
    );
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  return (
    <TagContainer>
      {filterTagList.map((filterTag) => {
        const { name, tagType } = filterTag;

        const isActive =
          filterTag.tagType !== FilterTagTypeEnum.PROVIDER && tagType === activeFilterTag.tagType;

        const tagCmp = gameTagList.find((tag) => tag.text === name);

        if (filterTag.tagType === FilterTagTypeEnum.ALL) {
          return null;
        }

        return (
          <Tag
            key={name}
            text={name}
            isActive={isActive}
            isShowIcon={gameTagList.some((tag) => tag.text === name)}
            onClick={() => handleFilterClick(filterTag)}
          >
            {tagCmp &&
              tagCmp.iconComponent &&
              React.createElement(tagCmp.iconComponent, {
                $color: isActive ? theme.accountLableText : theme.white50,
              })}
          </Tag>
        );
      })}
      <Select
        onChange={(e) => handleSelectProvider(e.target.value)}
        value={activeProviderFilterTag.name}
        sx={{
          width: "150px",
          backgroundColor: theme.black30,
          color: theme.text,
          height: "44px",
          padding: "0 12px",
          borderRadius: "4px",
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
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
              sx={{ color: "black" }}
              disabled={status === providerStatus.Maintenance}
            >
              {filterTag.name}
            </MenuItem>
          );
        })}
      </Select>
    </TagContainer>
  );
};

export default GameFilterTag;
