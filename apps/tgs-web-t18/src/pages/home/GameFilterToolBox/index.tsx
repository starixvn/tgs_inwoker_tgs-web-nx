import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t21/images/home/search.svg";
import ProviderTags from "@/pages/home/GameFilterToolBox/ProviderTags";
import FilterTags from "@/pages/home/GameFilterToolBox/FilterTags";
import { media } from "@/theme/breakpoints";

const GameFilterToolBoxContainer = styled.div`
  ${media.sm} {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
`;

const GameFilterToolBox = () => {
  const { isDesktopSize } = useRwd();
  const { searchString, handleChangeSearch } = useHomeGameContext();

  if (isDesktopSize) {
    return (
      <GameFilterToolBoxContainer>
        <ProviderTags />

        <FilterTags />
        <SearchInput
          placeholder={i18n.t("slot.search")}
          imageUrl={searchIcon}
          handleChange={handleChangeSearch}
          value={searchString}
        />
      </GameFilterToolBoxContainer>
    );
  }

  return (
    <GameFilterToolBoxContainer>
      <FilterTags />

      <Row>
        <ProviderTags />
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
