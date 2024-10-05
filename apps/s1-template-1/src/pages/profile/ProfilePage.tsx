import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import { profilePageDictionary } from "@/components/account/Profile/profilePageDictionary";
import MenuTabs from "@/components/project/MenuTabs";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { PageContainer } from "@/components/styled-component/PageContainer";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import { media } from "@tgs-web-nx/constants";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import { useProfileMenu, useRwd } from "@tgs-web-nx/core/hooks";
import { ValueOf } from "@tgs-web-nx/types";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ProfileRowInDesktop from "./components/ProfileMenu/ProfileRowInDesktop";

const AccountContainer = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.paddingBottomContent};
  ${media.md} {
    max-width: 108.8rem;
    margin: auto;
    padding-bottom: 0;
  }
`;

const InfoWrapper = styled.div`
  ${media.sm} {
    display: flex;
    flex-direction:column;
  }
  ${media.md} {
    display: grid;
    grid-template-columns: 29rem 1fr;
    grid-column-gap: 1.6rem;
  }
  ${media.lg} {
    grid-template-columns: 35.5rem 1fr;
  }
`;

export const PasswordContainer = styled.div`
  margin: 1rem 0;
  > div {
    border-bottom: none;
   }
`;

const ProfilePage = () => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;
  const { profileItemDictionary, handleClickProfileItem } = useProfileMenu();

  const ProfilePageComponent = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !ProfilePageComponent) {
    return (
      <PageContainer>
        <AccountContainer>
          {isDesktopSize && <MenuTabs />}
          <InfoWrapper>              
            <div>
              <UserWalletInfo /> 
              {isDesktopSize && <PasswordContainer>
                <ProfileRowInDesktop
                  profileItem={profileItemDictionary["password"]}
                  handleClick={handleClickProfileItem}
                />
              </PasswordContainer>}  
            </div>
                
            <ProfileMenu />
          </InfoWrapper>
          
        </AccountContainer>
       
      </PageContainer>
    );
  }

  const isDialogOpen = !!ProfilePageComponent;

  const handleCloseDialog = () => {
    history.push("/profile");
  };

  return (
    <PageContainer>
      <AccountContainer>
      {isDesktopSize && <MenuTabs />}
      
      <InfoWrapper>
        <div>
          <UserWalletInfo /> 
          {isDesktopSize && <PasswordContainer>
            <ProfileRowInDesktop
              profileItem={profileItemDictionary["password"]}
              handleClick={handleClickProfileItem}
            />
          </PasswordContainer>}  
        </div>
        {/* {isDesktopSize ? (
          <ProfileMenu />
        ) : (
          <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
        )}

        {isDesktopSize && (
          <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
            <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
          </ProfileDialog>
        )} */}
        <ProfileMenu />
        <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
            <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
          </ProfileDialog>
          </InfoWrapper>
      </AccountContainer>
      
    </PageContainer>
  );
};

export default React.memo(ProfilePage);
