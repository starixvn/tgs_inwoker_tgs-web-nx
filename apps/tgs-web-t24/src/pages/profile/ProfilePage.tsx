import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import {
  profilePageDictionary,
  ProfilePathEnum,
} from "@/core/components/Profile/profilePageDictionary";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { ValueOf } from "@/core/types/valueOf";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const ProfilePageContainer = styled.div`
  padding: 0 22px 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

type Props = {};
const ProfilePage = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  const ProfilePageComponent = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !ProfilePageComponent) {
    return (
      <ProfilePageContainer>
        {isDesktopSize && <UserWalletInfo />}
        <ProfileMenu />
      </ProfilePageContainer>
    );
  }

  const isDialogOpen = !!ProfilePageComponent;

  const handleCloseDialog = () => {
    history.push("/profile");
  };

  return (
    <ProfilePageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize ? <ProfileMenu /> : <ProfilePageComponent />}

      {isDesktopSize && (
        <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
          <ProfilePageComponent />
        </ProfileDialog>
      )}
    </ProfilePageContainer>
  );
};

export default React.memo(ProfilePage);
