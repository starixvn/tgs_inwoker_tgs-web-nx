import React from "react";
import styled from "styled-components";
import { FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import FilterDrawer from "@/layouts/components/CategoryFilter/components/FilterDrawer";
import {
  FilterItem,
  FilterItemContainer,
} from "@/layouts/components/CategoryFilter/components/FilterItem";
import iconLike from "@/assets/t30/images/home/icon-like.svg";
import Icon from "@/components/project/Icon";
import FilterItemHeader from "@/layouts/components/CategoryFilter/components/FilterItemHeader";

const CategoryDrawerContainer = styled.div``;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  drawerType: "provider" | "category";
};

const CategoryDrawer = ({ isOpen, onClose, drawerType }: Props) => {
  const { activeFilterTag, handleChangeActiveFilterTag, filterTagList } = useHomeGameContext();

  return (
    <CategoryDrawerContainer>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <FilterItemHeader drawerType={drawerType} isOpen={isOpen} onClick={onClose} />

        <FilterItemContainer>
          {filterTagList.map((filterTag, index) => {
            if (filterTag.tagType === FilterTagTypeEnum.FAVORITE) return null;

            return (
              <FilterItem
                key={index}
                $isActive={filterTag.tagType === activeFilterTag.tagType}
                onClick={() => handleChangeActiveFilterTag(filterTag)}
              >
                {filterTag.name}
              </FilterItem>
            );
          })}

          <FilterItem
            $isActive={activeFilterTag.tagType === FilterTagTypeEnum.FAVORITE}
            onClick={() =>
              handleChangeActiveFilterTag({
                name: "FUCK",
                tagType: FilterTagTypeEnum.FAVORITE,
              })
            }
            style={{ width: "100%" }}
          >
            <Icon iconUrl={iconLike} width={"20px"} height={"20px"} />
            LIKE
          </FilterItem>
        </FilterItemContainer>
      </FilterDrawer>
    </CategoryDrawerContainer>
  );
};

export default CategoryDrawer;
