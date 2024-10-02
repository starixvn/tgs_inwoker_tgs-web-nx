import AccountPaper from "@/components/project/AccountPaper";
import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import ProfileRowInDesktop from "@/pages/profile/components/ProfileMenu/ProfileRowInDesktop";
import { useProfileMenu } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";

const ProfileMenuDesktop = () => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } = useProfileMenu();

  return (
    <AccountPaper pageName={i18n.t("deposit.details.account")} iconUrl={""}>
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
    </AccountPaper>
  );
};

export default React.memo(ProfileMenuDesktop);
