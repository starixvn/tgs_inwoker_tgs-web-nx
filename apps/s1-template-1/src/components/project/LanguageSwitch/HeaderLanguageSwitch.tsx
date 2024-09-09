import { imageMap } from "@/components/project/LanguageSwitch";
import { theme } from "@/theme";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { MenuItem as MuiMenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps } from "@mui/material";
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
    left: 3.6rem;
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
    color: ${({ theme }) => theme.dropDownIconColor};
    right: 0.6rem;
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
  margin-right: 0.8rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameContainer = styled.div`
  font-size: 1.3rem;
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
      IconComponent={ExpandMoreRoundedIcon}
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
              color: theme.text,
              borderRadius: "1rem",
            },
            "& .Mui-selected": {
              background: `${theme.dropDownItemSelectedBackground} !important`,
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

export default React.memo(HeaderLanguageSwitch);
