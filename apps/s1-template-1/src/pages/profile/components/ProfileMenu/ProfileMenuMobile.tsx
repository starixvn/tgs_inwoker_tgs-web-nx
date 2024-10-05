import { Select } from "@/components/UI/Select";
import { imageMap } from "@/components/project/LanguageSwitch";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  LabelLargeContainer,
} from "@/components/styled-component/ProfileForms";
import ProfileRowInMobile from "@/pages/profile/components/ProfileMenu/ProfileRowInMobile";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useProfileMenu } from "@tgs-web-nx/core/hooks";
import { BrandLanguage } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React, { useState } from "react";
import styled from "styled-components";

const ProfileCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FlagContainer = styled.div`
  margin-right: 0.8rem;
  display: flex;

  & > img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
  }
`;

const NameContainer = styled.div`
  font-size: 1.2rem;
`;

export const PasswordContainer = styled.div`
  > div {
    border-bottom: none;
  }
`;

const ProfileSettings = styled.div`
  background: ${({ theme }) => theme.accountInfoBackgroundColor};
  border-radius: 1.2rem;
  margin: 2.4rem 0 25rem;
  padding: 1.2rem;
`;

const LabelTitle = styled(LabelLargeContainer)`
  margin-bottom: 1.2rem;
  height: 3.6rem;
`;

const ProfileMenuMobile = () => {
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

  const { profileItemDictionary, handleClickProfileItem, customMessagingList } = useProfileMenu();
  console.log("profileItemDictionary", profileItemDictionary);
  return (
    <ProfileSettings>
      <LabelTitle>Profile Settings</LabelTitle>
        <ProfileRowInMobile
          profileItem={profileItemDictionary["name"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["email"]}
          handleClick={handleClickProfileItem}
        />

        <ProfileRowInMobile
          profileItem={profileItemDictionary["phone"]}
          handleClick={handleClickProfileItem}
        />

        <ProfileRowInMobile
          profileItem={profileItemDictionary["birth"]}
          handleClick={handleClickProfileItem}
        />
        {customMessagingList.map((messagingItem) => {
          return (
            <ProfileRowInMobile
              key={messagingItem.key}
              profileItem={messagingItem}
              handleClick={handleClickProfileItem}
            />
          );
        })}
      <ItemContainer style={{ marginBottom: "1.2rem" }}>
        <LabelContainer>Languages</LabelContainer>
        <FormControl variant="outlined">
          <Select id="customSelect" value={culturecode} onChange={handleChange} type={"string"}>
            {languageList.map((languageItem) => {
              const { culturecode } = languageItem;
              return (
                <MenuItem key={culturecode} value={culturecode}>
                  <FlagContainer>
                    <img src={imageMap[culturecode] || ""} alt={culturecode} />
                  </FlagContainer>
                  <NameContainer>{i18n.t("lang." + culturecode)}</NameContainer>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ItemContainer>
      <PasswordContainer>
        <ProfileRowInMobile
          profileItem={profileItemDictionary["password"]}
          handleClick={handleClickProfileItem}
        />
      </PasswordContainer>
    </ProfileSettings>
  );
};

export default React.memo(ProfileMenuMobile);
