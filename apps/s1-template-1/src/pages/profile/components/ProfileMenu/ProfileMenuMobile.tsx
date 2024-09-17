import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import ProfileRowInMobile from "@/pages/profile/components/ProfileMenu/ProfileRowInMobile";
import { useProfileMenu } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const ProfileCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileTitle = styled.div`

`;

const ProfileMenuMobile = () => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } = useProfileMenu();
  console.log("profileItemDictionary", profileItemDictionary);
  return (
    <>
      <LabelLargeContainer>Profile Settings</LabelLargeContainer>
      <ProfileCard>
        <ProfileRowInMobile
          profileItem={profileItemDictionary["name"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["phone"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["email"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["birth"]}
          handleClick={handleClickProfileItem}
        />
      </ProfileCard>

      <ProfileCard>
        <ProfileRowInMobile
          key={profileItemDictionary["qq"].key}
          profileItem={profileItemDictionary["qq"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          key={profileItemDictionary["wechat"].key}
          profileItem={profileItemDictionary["wechat"]}
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
      </ProfileCard>

      <ProfileCard>
        <ProfileRowInMobile
          profileItem={profileItemDictionary["password"]}
          handleClick={handleClickProfileItem}
        />
      </ProfileCard>
    </>
  );
};

export default React.memo(ProfileMenuMobile);
