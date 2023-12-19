import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useProfileMenu } from "@tgs-web-nx/core/hooks";
import ProfileDivision from "@/pages/profile/components/ProfileMenu/ProfileDivision";
import iconAccount from "@/assets/t23/images/badge/icon-account.svg";
import ProfileRowInDesktop from "@/pages/profile/components/ProfileMenu/ProfileRowInDesktop";
import AccountPaper from "@/components/project/AccountPaper";

const ProfileMenuDesktop = () => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } = useProfileMenu();

  return (
    <AccountPaper pageName={i18n.t("deposit.details.account")} iconUrl={iconAccount}>
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["name"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileDivision />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["phone"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileDivision />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["email"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileDivision />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["birth"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileDivision />
      <ProfileRowInDesktop
        key={profileItemDictionary["qq"].key}
        profileItem={profileItemDictionary["qq"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileDivision />
      <ProfileRowInDesktop
        key={profileItemDictionary["wechat"].key}
        profileItem={profileItemDictionary["wechat"]}
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
      <ProfileDivision />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["password"]}
        handleClick={handleClickProfileItem}
      />
    </AccountPaper>
  );
};

export default React.memo(ProfileMenuDesktop);
