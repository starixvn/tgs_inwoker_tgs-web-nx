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

export const imageMap: { [key in string]: string } = {
  "zh-CN": import.meta.env.BASE_URL + `assets/images/language/zh-CN.png`,
  "zh-TW": import.meta.env.BASE_URL + `assets/images/language/zh-TW.png`,
  "en-US": import.meta.env.BASE_URL + `assets/images/language/en-US.png`,
  "th-TH": import.meta.env.BASE_URL + `assets/images/language/th-TH.png`,
  "vi-VN": import.meta.env.BASE_URL + `assets/images/language/vi-VN.png`,
  "id-ID": import.meta.env.BASE_URL + `assets/images/language/id-ID.png`,
};

const StyledSelect = styled(MuiSelect)`
  //width: 140px;
  //margin-right: 10px;
  overflow: visible;
  background: ${({ theme }) => theme.gray95};
  border: 1px solid ${({ theme }) => theme.gray80};
  font-weight: 400 !important;
  font-size: 0.937rem !important;

  .MuiOutlinedInput-input {
    padding: 12px !important;
  }
  & .MuiSelect-select {
    display: flex;
    align-items: center;

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
  width: 24px;
  height: 24px;
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
            background: theme.gray80,

            "& .MuiMenuItem-root": {
              padding: 2,
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

export default React.memo(LanguageSwitch);
