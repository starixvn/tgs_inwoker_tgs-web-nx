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
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";

const StyledSelect = styled(MuiSelect)`
  border: ${({ theme }) => ` 1px solid ${theme.white}`};
  height: 30px;
  overflow: visible;
  background: ${({ theme }) => theme.mainDarkBackground};
  &:hover {
    border: 0;
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
            background: theme.accountLableText,
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
              {!isShrink && <NameContainer>{i18n.t("lang." + culturecode)}</NameContainer>}
            </StyledMenuItem>
          );
        })}
    </StyledSelect>
  );
};

export default React.memo(MenuLanguageSwitch);
