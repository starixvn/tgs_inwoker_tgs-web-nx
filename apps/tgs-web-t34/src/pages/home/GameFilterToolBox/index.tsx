import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t34/images/home/search.svg";
import ProviderTags from "@/pages/home/GameFilterToolBox/ProviderTags";
import FilterTags from "@/pages/home/GameFilterToolBox/FilterTags";

const GameFilterToolBoxContainer = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
`;

export const SearchInputWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey00};
`;

const GameFilterToolBox = () => {
  const { searchString, handleChangeSearch } = useHomeGameContext();

  return (
    <GameFilterToolBoxContainer>
      <ProviderTags />

      <Row>
        <FilterTags />
        <SearchInput
          placeholder={i18n.t("slot.search")}
          imageUrl={searchIcon}
          handleChange={handleChangeSearch}
          value={searchString}
        />
      </Row>
    </GameFilterToolBoxContainer>
  );
};

export default GameFilterToolBox;
