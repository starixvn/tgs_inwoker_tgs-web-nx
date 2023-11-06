import React from "react";
import styled from "styled-components";
import { useProfileMenu } from "@/core/hooks/account/useProfileMenu";
import ProfileRowInMobile from "@/components/pages/profile/components/ProfileMenu/ProfileRowInMobile";

const ProfileCard = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.gray95};
  border-radius: 5px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 42px;
  margin-bottom: 15px;

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
