import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import iconSearchClose from "@/assets/t30/images/home/icon-search-close.svg";
import iconSearchButton from "@/assets/t30/images/home/icon-search-button.svg";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import TextField from "@/components/UI/TextField";

export const CATEGORY_HEADER_HEIGHT = "50px";

const SearchBarContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.white};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
`;

const ButtonContainer = styled.div`
  width: ${CATEGORY_HEADER_HEIGHT};
  height: ${CATEGORY_HEADER_HEIGHT};
  background: ${({ theme }) => theme.main};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type Props = {
  isOpen: boolean;
  toggleSearch: () => void;
};

const SearchBar = ({ isOpen, toggleSearch }: Props) => {
  const [searchString, setSearchString] = useState("");

  const { searchString: x, handleChangeSearch } = useHomeGameContext();

  if (!isOpen) return null;

  const closeSearch = () => {
    setSearchString("");
    handleChangeSearch("");
    toggleSearch();
  };

  const handleSearchChange = (e: ChangeEvent<any>) => {
    setSearchString(e.target.value);
  };

  const submitSearch = () => {
    handleChangeSearch(searchString);
  };

  return (
    <SearchBarContainer>
      <ButtonContainer onClick={closeSearch}>
        <Icon iconUrl={iconSearchClose} width={"28px"} height={"28px"} />
      </ButtonContainer>
      <TextField
        fullWidth
        value={searchString}
        onChange={handleSearchChange}
        sx={{
          "& fieldset": { border: "none" },
        }}
      />
      <ButtonContainer
        onClick={submitSearch}
        style={{
          marginLeft: "auto",
          background: theme.primary,
        }}
      >
        <Icon iconUrl={iconSearchButton} width={"28px"} height={"28px"} />
      </ButtonContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
