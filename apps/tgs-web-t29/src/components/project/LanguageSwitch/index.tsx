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
import { theme } from "@/theme";
import { useGetCountryFlagImg } from "@tgs-web-nx/core/hooks";

const StyledSelect = styled(MuiSelect)`
  //width: 140px;
  //margin-right: 10px;
  height: 48px;
  overflow: visible;
  background: ${({ theme }) => theme.white};
  font-weight: 400 !important;
  font-size: 0.937rem !important;
  border: 1px solid ${({ theme }) => theme.gray10};
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
    color: ${({ theme }) => theme.gray30};
  }
`;

const StyledMenuItem = styled(MuiMenuItem)`
  //border-radius: 8px;

  & > img {
    margin-right: 10px;
  }
`;

const FlagContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameContainer = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

const LanguageSwitch = (props: SelectProps) => {
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
    console.log("LanguageSwitch cause reload");
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
              color: theme.text,
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
                <img src={useGetCountryFlagImg(culturecode) || ""} alt={culturecode} />
              </FlagContainer>
              <NameContainer>{i18n.t("lang." + culturecode)}</NameContainer>
            </StyledMenuItem>
          );
        })}
    </StyledSelect>
  );
};

export default React.memo(LanguageSwitch);
