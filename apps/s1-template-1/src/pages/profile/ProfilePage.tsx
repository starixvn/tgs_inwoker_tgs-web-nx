import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import { profilePageDictionary } from "@/components/account/Profile/profilePageDictionary";
import MenuTabs from "@/components/project/MenuTabs";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { PageContainer } from "@/components/styled-component/PageContainer";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import { media } from "@tgs-web-nx/constants";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ValueOf } from "@tgs-web-nx/types";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const AccountContainer = styled.div`
  width: 100%;
  ${media.md} {
    max-width: 108.8rem;
    margin: auto;
  }
`;

const InfoWrapper = styled.div`
  ${media.sm} {
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-column-gap: 1.6rem;
  }
  ${media.lg} {
    display: grid;
    grid-template-columns: 35.5rem 1fr;
  }
`;

const ProfilePage = () => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  const ProfilePageComponent = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !ProfilePageComponent) {
    return (
      <PageContainer>
        <AccountContainer>
          {isDesktopSize && <MenuTabs />}
          <InfoWrapper>
            <UserWalletInfo />          
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
        <UserWalletInfo />
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
