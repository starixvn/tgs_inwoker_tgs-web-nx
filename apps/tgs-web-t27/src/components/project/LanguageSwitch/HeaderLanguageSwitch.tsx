import React, { useState } from "react";
import {
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import styled from "styled-components";
import { BrandLanguage } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { imageMap } from "@/components/project/LanguageSwitch/index";
import { theme } from "@/theme";

const StyledSelect = styled(MuiSelect)`
  min-width: 130px;
  overflow: visible;
  font-weight: 400 !important;
  font-size: 0.812rem !important;

  .MuiOutlinedInput-input {
    padding: 0 12px !important;
    border-radius: 0;
  }

  & .MuiSelect-select {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.white} !important;

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

const FlagContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameContainer = styled.div`
  font-weight: 700;
  font-size: 1rem;
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
    console.log("HeaderLanguageSwitch cause reload");
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
      MenuProps={{
        PaperProps: {
          sx: {
            background: theme.mainBackground,

            "& .MuiMenuItem-root": {
              padding: 2,
              color: theme.g2,
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
