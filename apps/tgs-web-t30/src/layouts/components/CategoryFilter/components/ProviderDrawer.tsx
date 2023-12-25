import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import FilterDrawer from "./FilterDrawer";
import {
  FilterItem,
  FilterItemContainer,
} from "@/layouts/components/CategoryFilter/components/FilterItem";
import FilterItemHeader from "@/layouts/components/CategoryFilter/components/FilterItemHeader";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  drawerType: "provider" | "category";
};

const ProviderDrawerContainer = styled.div``;

const ProviderDrawer = ({ isOpen, onClose, drawerType }: Props) => {
  const { activeProviderFilterTag, handleChangeActiveProviderFilterTag, providerFilterTagList } =
    useHomeGameContext();

  return (
    <ProviderDrawerContainer>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <FilterItemHeader drawerType={drawerType} isOpen={isOpen} onClick={onClose} />

        <FilterItemContainer>
          {providerFilterTagList.map((filterTag, index) => {
            return (
              <FilterItem
                key={index}
                $isActive={filterTag.gpCode === activeProviderFilterTag.gpCode}
                onClick={() => handleChangeActiveProviderFilterTag(filterTag)}
              >
                {filterTag.name}
              </FilterItem>
            );
          })}
        </FilterItemContainer>
      </FilterDrawer>
    </ProviderDrawerContainer>
  );
};

export default React.memo(ProviderDrawer);
