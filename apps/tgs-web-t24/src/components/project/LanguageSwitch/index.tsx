import React, { useState } from "react";
import {
  FormControl as MuiFormControl,
  FormControlProps,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { BrandLanguage } from "@/core/types/stores/general";

const imageMap: { [key in string]: string } = {
  "zh-CN": import.meta.env.BASE_URL + `assets/images/language/zh-CN.png`,
  "zh-TW": import.meta.env.BASE_URL + `assets/images/language/zh-TW.png`,
  "en-US": import.meta.env.BASE_URL + `assets/images/language/en-US.png`,
  "th-TH": import.meta.env.BASE_URL + `assets/images/language/th-TH.png`,
  "vi-VN": import.meta.env.BASE_URL + `assets/images/language/vi-VN.png`,
  "id-ID": import.meta.env.BASE_URL + `assets/images/language/id-ID.png`,
};

const StyledFormControl = styled(MuiFormControl)`
  border-radius: 10px;
  width: 140px;
  margin-right: 10px;
  overflow: visible;
  background: ${({ theme }) => theme.mainLightBackground};

  & label {
    color: ${({ theme }) => theme.white};
  }

  & input {
    color: ${({ theme }) => theme.white};
  }

  & .MuiSelect-root {
    overflow: visible;
  }

  .MuiOutlinedInput-input {
    padding: 12px !important;
  }
`;

const StyledSelect = styled(MuiSelect)`
  border-radius: 100px;
  overflow: visible;

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

const LanguageSwitch = (props: FormControlProps) => {
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
    <StyledFormControl {...props} variant="outlined">
      <StyledSelect
        type={"string"}
        value={culturecode}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              // background: (theme: typeof muiTheme) => {
              //   //@ts-ignore
              //   return theme.palette.mainBackground;
              // },

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
                {i18n.t("lang." + culturecode)}
              </StyledMenuItem>
            );
          })}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default React.memo(LanguageSwitch);
