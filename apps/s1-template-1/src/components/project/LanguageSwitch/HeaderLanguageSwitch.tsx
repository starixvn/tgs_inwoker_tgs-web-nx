import { imageMap } from "@/components/project/LanguageSwitch";
import { theme } from "@/theme";
import { MenuItem as MuiMenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps, SvgIcon, SvgIconProps } from "@mui/material";
import { media } from "@tgs-web-nx/constants";
import { useGeneralStore } from "@tgs-web-nx/core";
import { BrandLanguage } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React, { useState } from "react";
import styled from "styled-components";

const StyledSelect = styled(MuiSelect)`
  position: relative;
  height: 3.6rem;
  border-radius: 0.8rem !important;
  font-size: 1.3rem;
  line-height: 3.6rem;
  min-width: 6rem;
  background: ${({ theme }) => theme.languageButtonBackground};
  border-bottom: 0.2rem solid ${({ theme }) => theme.languageButtonBottomBorderColor};
  transition: all 0.1s ease-in-out;

  &:hover {
    border-bottom-width: 0.4rem;
    transition: all 0.2s ease-in-out;
    box-shadow: ${({ theme }) => theme.languageButtonActiveShadow};
  }

  &:after {
    content: "";
    position: absolute;
    right: 2.4rem;
    display: flex;
    justify-content: center;
    height: 2.8rem;
    width: 0.1rem;
    background: ${({ theme }) => theme.languageLineColor};
  }

  .MuiSelect-select {
    position: relative;
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    left: -0.6rem;
    height: 100% !important;
  }

  .NameContainer-rajv0b-3 {
    display: none;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiSvgIcon-root {
    position: relative;
    right: 0.8rem;

    color: ${({ theme }) => theme.dropDownIconColor};
  }
`;

const StyledMenuItem = styled(MuiMenuItem)`
  & > img {
    margin-right: 0.8rem;
  }
`;

const FlagContainer = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameContainer = styled.div`
  font-size: 1.3rem;

  ${media.lg} {
    font-size: 1.4rem;
  }
`;

const HeaderLanguageSwitch = (props: SelectProps) => {
  const { general } = useGeneralStore();
  const languageList = general.brandLanguage;
  const [currentLanguage, setCurrentLanguage] = useState<BrandLanguage>({
    culturecode: i18n.language,
  });

  const handleChange = (event: SelectChangeEvent<any>, child?: any) => {
    const selectedLanguage = languageList.find(
      (languageItem) => languageItem.culturecode === event.target.value,
    );

    if (!selectedLanguage) return;

    setCurrentLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage.culturecode);
    window.location.reload();
  };

  const culturecode = currentLanguage?.culturecode || "";

  if (languageList.length < 2) return null;
  return (
    <StyledSelect
      {...props}
      type={"string"}
      value={culturecode}
      onChange={handleChange}
      displayEmpty={true}
      IconComponent={ArrowIcon}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 232,
            width: 214,
            background: theme.dropDownBackground,
            padding: "0.8rem",
            borderRadius: "1rem",
            ".MuiList-root": {
              padding: "0",
            },
            "& .MuiMenuItem-root": {
              padding: "1rem 1.2rem",
              color: theme.gray,
              borderRadius: "1rem",
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              background: `${theme.dropDownItemSelectedBackground} !important`,
              color: theme.text,
              "&:hover": {
                background: `${theme.dropDownItemSelectedBackground} !important`,
              },
            },
          },
        },
      }}
    >
      {languageList.length > 1 &&
        languageList.map((languageItem) => {
          const { culturecode } = languageItem;
          return (
            <StyledMenuItem key={culturecode} value={culturecode}>
              <FlagContainer>
                <img src={imageMap[culturecode] || ""} alt={culturecode} />
              </FlagContainer>
              <NameContainer>{i18n.t("lang." + culturecode)}</NameContainer>
            </StyledMenuItem>
          );
        })}
    </StyledSelect>
  );
};

const ArrowIcon: React.FC = (props: SvgIconProps) => {
  return (
    <SvgIcon sx={{ height: "10px", width: "10px" }} viewBox="0 0 11 10">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.50025 6.34278L8.08573 3.75729C8.47626 3.36677 9.03028 3.28762 9.32317 3.58052C9.61607 3.87341 9.53692 4.42743 9.1464 4.81795L6.31797 7.64638C6.07468 7.88967 5.76793 8.01211 5.5004 7.99904C5.2328 8.01222 4.92592 7.88977 4.68254 7.64639L1.85411 4.81797C1.46359 4.42744 1.38444 3.87342 1.67734 3.58053C1.97023 3.28764 2.52425 3.36678 2.91478 3.75731L5.50025 6.34278Z"
        fill="#A7B5CA"
      />
    </SvgIcon>
  );
};
export default React.memo(HeaderLanguageSwitch);
