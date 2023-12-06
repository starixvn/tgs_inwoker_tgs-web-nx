import React from "react";
import styled from "styled-components";
import { useProfileMenu } from "@tgs-web-nx/core/hooks";
import ProfileRowInMobile from "@/pages/profile/components/ProfileMenu/ProfileRowInMobile";

const ProfileCard = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.gray30};
  padding: 20px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 42px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileMenuMobile = () => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } = useProfileMenu();

  return (
    <>
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
