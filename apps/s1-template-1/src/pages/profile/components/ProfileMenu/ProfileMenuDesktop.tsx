import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import ProfileRowInDesktop from "@/pages/profile/components/ProfileMenu/ProfileRowInDesktop";
import { useProfileMenu } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";
import styled from "styled-components";

const ProfileSettingsWrapper = styled.div`
  background: ${({ theme }) => theme.accountInfoBackgroundColor};
  border-radius: 1.2rem;
  padding: 2.4rem;
`
const ProfileMenuDesktop = () => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } = useProfileMenu();

  return (
    <ProfileSettingsWrapper>
      <LabelLargeContainer>{i18n.t("common.profileSettings")}</LabelLargeContainer>
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["name"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["phone"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["email"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["birth"]}
        handleClick={handleClickProfileItem}
      />
      <>
        {customMessagingList.map((messagingItem) => {
          return (
            <ProfileRowInDesktop
              key={messagingItem.key}
              profileItem={messagingItem}
              handleClick={handleClickProfileItem}
            />
          );
        })}
      </>
      </ProfileSettingsWrapper>
  );
};

export default React.memo(ProfileMenuDesktop);
