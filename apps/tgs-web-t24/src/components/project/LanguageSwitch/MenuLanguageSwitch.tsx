import React, { useState } from "react";
import {
  FormControlProps,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import styled from "styled-components";
import { BrandLanguage } from "@tgs-web-nx/types";
import i18n from "@/core/utils/i18n";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { theme } from "@/theme";
import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { imageMap } from "@/components/project/LanguageSwitch/index";

const StyledSelect = styled(MuiSelect)`
  border-radius: 12px !important;
  border: ${({ theme }) => ` 1px solid ${theme.mainBackground}`};
  height: 56px;
  width: 250px;
  overflow: visible;
  background: ${({ theme }) => theme.mainDarkBackground};
  &:hover {
    border: 0;
  }

  .MuiOutlinedInput-input {
    padding: 10px 30px !important;
  }

  & .MuiSelect-select {
    display: flex;
    align-items: center;

    & > img {
      margin-right: 10px;
    }
  }

  & .MuiSvgIcon-root {
    color: ${({ theme }) => theme.white};
  }
`;
const StyledMenuItem = styled(MuiMenuItem)`
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

const MenuLanguageSwitch = (props: SelectProps) => {
  const { general } = useGeneralStore();
  const { isMenuOpen } = useHeader();
  const { isDesktopSize } = useRwd();

  const isShrink = isDesktopSize && !isMenuOpen;

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

  if (isShrink) return null;
  if (languageList.length < 2) return null;
  return (
    <StyledSelect
      {...props}
      value={culturecode}
      onChange={handleChange}
      MenuProps={{
        PaperProps: {
          sx: {
            background: theme.mainLightBackground,

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

              {!isShrink && <NameContainer>{i18n.t("lang." + culturecode)}</NameContainer>}
            </StyledMenuItem>
          );
        })}
    </StyledSelect>
  );
};

export default React.memo(MenuLanguageSwitch);
