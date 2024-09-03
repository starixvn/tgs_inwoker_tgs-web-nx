import { imageMap } from "@/components/project/LanguageSwitch";
import { theme } from "@/theme";
import { MenuItem as MuiMenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps } from "@mui/material";
import { useGeneralStore } from "@tgs-web-nx/core";
import { BrandLanguage } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React, { useState } from "react";
import styled from "styled-components";

const StyledSelect = styled(MuiSelect)`
  position: relative;
  width: 4.4rem;
  height: 2.8rem;
  padding: 0;
  background: ${({ theme }) => theme.changeLanguage};
  font-size: 1.3rem !important;
  border-radius: 7px !important;

  .MuiSelect-select {
    padding: 0 !important;
    display: flex;
    justify-content: center;
  }

  .NameContainer-rajv0b-3 {
    display: none;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiSvgIcon-root {
    color: #fff;
    right: 0;
  }
`;

const StyledMenuItem = styled(MuiMenuItem)`
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
      MenuProps={{
        PaperProps: {
          sx: {
            background: theme.languageDropDownBackground,

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
